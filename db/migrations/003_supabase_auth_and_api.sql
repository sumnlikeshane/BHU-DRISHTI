BEGIN;

DO $$
BEGIN
  CREATE TYPE public.app_role AS ENUM (
    'programme_admin',
    'state_reviewer',
    'district_reviewer',
    'field_officer',
    'analyst'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

CREATE TABLE IF NOT EXISTS public.profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  role public.app_role NOT NULL DEFAULT 'field_officer',
  admin_unit_id uuid REFERENCES geo.admin_units(admin_unit_id),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (full_name IS NULL OR char_length(full_name) BETWEEN 1 AND 160)
);

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION ops.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id,
    NULLIF(trim(COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')), '')
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

INSERT INTO public.profiles (user_id, full_name)
SELECT
  id,
  NULLIF(trim(COALESCE(raw_user_meta_data ->> 'full_name', '')), '')
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS profiles_read_own ON public.profiles;
CREATE POLICY profiles_read_own
ON public.profiles
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

GRANT SELECT ON public.profiles TO authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.profiles FROM anon, authenticated;

INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'field-evidence',
  'field-evidence',
  false,
  15728640,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
SET
  public = false,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DO $$
DECLARE
  item record;
BEGIN
  FOR item IN
    SELECT *
    FROM (VALUES
      ('catalog', 'data_sources'),
      ('ops', 'ingestion_runs'),
      ('ops', 'source_artifacts'),
      ('geo', 'admin_units'),
      ('geo', 'hydrological_units'),
      ('geo', 'waterbodies'),
      ('programme', 'projects'),
      ('programme', 'works'),
      ('evidence', 'field_observations'),
      ('evidence', 'media_assets'),
      ('evidence', 'eo_observations'),
      ('evidence', 'metrics'),
      ('decision', 'model_runs'),
      ('decision', 'signals'),
      ('decision', 'cases'),
      ('decision', 'reviews'),
      ('decision', 'actions'),
      ('ops', 'record_lineage'),
      ('ops', 'data_quality_issues')
    ) AS tables(schema_name, table_name)
  LOOP
    EXECUTE format(
      'ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY',
      item.schema_name,
      item.table_name
    );
  END LOOP;
END
$$;

REVOKE ALL ON SCHEMA catalog, geo, programme, evidence, decision, ops, api
FROM anon, authenticated;
REVOKE ALL ON ALL TABLES IN SCHEMA catalog, geo, programme, evidence, decision, ops, api
FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.user_can_access_admin_unit(
  p_user_id uuid,
  p_admin_unit_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH RECURSIVE allowed_units AS (
    SELECT profile.admin_unit_id
    FROM public.profiles AS profile
    WHERE profile.user_id = p_user_id
      AND profile.active
      AND profile.admin_unit_id IS NOT NULL

    UNION ALL

    SELECT child.admin_unit_id
    FROM geo.admin_units AS child
    JOIN allowed_units AS parent
      ON child.parent_id = parent.admin_unit_id
    WHERE child.is_current
  )
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles AS profile
    WHERE profile.user_id = p_user_id
      AND profile.active
      AND (
        profile.role IN ('programme_admin', 'analyst')
        OR p_admin_unit_id IN (SELECT admin_unit_id FROM allowed_units)
      )
  );
$$;

CREATE OR REPLACE FUNCTION public.command_centre_snapshot(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  profile_record public.profiles%ROWTYPE;
  scope_name text;
  result jsonb;
BEGIN
  SELECT * INTO profile_record
  FROM public.profiles
  WHERE user_id = p_user_id
    AND active;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No active BHU-DRISHTI profile is assigned to this user'
      USING ERRCODE = '42501';
  END IF;

  IF profile_record.role NOT IN ('programme_admin', 'analyst')
     AND profile_record.admin_unit_id IS NULL THEN
    RAISE EXCEPTION 'This user has no administrative scope assigned'
      USING ERRCODE = '42501';
  END IF;

  SELECT name INTO scope_name
  FROM geo.admin_units
  WHERE admin_unit_id = profile_record.admin_unit_id;

  WITH accessible_cases AS (
    SELECT
      case_record.case_id,
      work.work_id,
      work.work_code,
      work.name AS work_name,
      work.activity_type,
      project.project_code,
      admin.name AS admin_unit,
      CASE WHEN work.geom IS NULL THEN NULL ELSE ST_Y(ST_PointOnSurface(work.geom)) END AS latitude,
      CASE WHEN work.geom IS NULL THEN NULL ELSE ST_X(ST_PointOnSurface(work.geom)) END AS longitude,
      case_record.queue,
      case_record.priority,
      case_record.status,
      case_record.reason_codes,
      case_record.explanation,
      case_record.due_at,
      case_record.created_at,
      (
        SELECT max(signal.confidence)
        FROM decision.signals AS signal
        WHERE signal.work_id = work.work_id
          AND (
            case_record.model_run_id IS NULL
            OR signal.model_run_id = case_record.model_run_id
          )
      ) AS confidence
    FROM decision.cases AS case_record
    JOIN programme.works AS work ON work.work_id = case_record.work_id
    JOIN programme.projects AS project ON project.project_id = work.project_id
    LEFT JOIN geo.admin_units AS admin
      ON admin.admin_unit_id = work.primary_admin_unit_id
    WHERE public.user_can_access_admin_unit(
      p_user_id,
      work.primary_admin_unit_id
    )
  ),
  summary AS (
    SELECT
      count(*)::integer AS total,
      count(*) FILTER (WHERE status IN ('open', 'assigned', 'in_review'))::integer AS open,
      count(*) FILTER (
        WHERE priority = 'critical'
          AND status IN ('open', 'assigned', 'in_review')
      )::integer AS critical,
      count(*) FILTER (
        WHERE queue = 'field_inspection'
          AND status IN ('open', 'assigned', 'in_review')
      )::integer AS field_inspection,
      count(*) FILTER (
        WHERE queue = 'recollect_evidence'
          AND status IN ('open', 'assigned', 'in_review')
      )::integer AS evidence_gaps
    FROM accessible_cases
  )
  SELECT jsonb_build_object(
    'generatedAt', now(),
    'profile', jsonb_build_object(
      'fullName', profile_record.full_name,
      'role', profile_record.role,
      'scope', scope_name
    ),
    'summary', jsonb_build_object(
      'total', summary.total,
      'open', summary.open,
      'critical', summary.critical,
      'fieldInspection', summary.field_inspection,
      'evidenceGaps', summary.evidence_gaps
    ),
    'cases', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'caseId', item.case_id,
          'workId', item.work_id,
          'workCode', item.work_code,
          'workName', item.work_name,
          'activityType', item.activity_type,
          'projectCode', item.project_code,
          'adminUnit', item.admin_unit,
          'latitude', item.latitude,
          'longitude', item.longitude,
          'queue', item.queue,
          'priority', item.priority,
          'status', item.status,
          'reasonCodes', item.reason_codes,
          'explanation', item.explanation,
          'confidence', item.confidence,
          'dueAt', item.due_at,
          'createdAt', item.created_at
        )
        ORDER BY
          CASE item.priority
            WHEN 'critical' THEN 1
            WHEN 'high' THEN 2
            WHEN 'medium' THEN 3
            ELSE 4
          END,
          item.created_at DESC
      )
      FROM accessible_cases AS item
    ), '[]'::jsonb)
  ) INTO result
  FROM summary;

  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.review_case(
  p_user_id uuid,
  p_case_id uuid,
  p_outcome text,
  p_notes text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  case_record decision.cases%ROWTYPE;
  work_admin_unit_id uuid;
  next_status text;
BEGIN
  IF p_outcome NOT IN (
    'confirmed',
    'rejected',
    'needs_more_evidence',
    'inspection_required',
    'resolved'
  ) THEN
    RAISE EXCEPTION 'Unsupported review outcome' USING ERRCODE = '22023';
  END IF;

  IF p_notes IS NOT NULL AND char_length(p_notes) > 4000 THEN
    RAISE EXCEPTION 'Review notes cannot exceed 4000 characters'
      USING ERRCODE = '22023';
  END IF;

  SELECT * INTO case_record
  FROM decision.cases
  WHERE case_id = p_case_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Review case not found' USING ERRCODE = 'P0002';
  END IF;

  IF case_record.status IN ('resolved', 'dismissed') THEN
    RAISE EXCEPTION 'Closed cases cannot be reviewed without an explicit reopen workflow'
      USING ERRCODE = '22023';
  END IF;

  SELECT primary_admin_unit_id INTO work_admin_unit_id
  FROM programme.works
  WHERE work_id = case_record.work_id;

  IF NOT public.user_can_access_admin_unit(p_user_id, work_admin_unit_id) THEN
    RAISE EXCEPTION 'This user cannot review the requested case'
      USING ERRCODE = '42501';
  END IF;

  next_status := CASE p_outcome
    WHEN 'resolved' THEN 'resolved'
    WHEN 'rejected' THEN 'dismissed'
    ELSE 'in_review'
  END;

  INSERT INTO decision.reviews (case_id, reviewer_ref, outcome, notes)
  VALUES (p_case_id, p_user_id::text, p_outcome, NULLIF(trim(p_notes), ''));

  UPDATE decision.cases
  SET
    status = next_status,
    resolved_at = CASE
      WHEN next_status IN ('resolved', 'dismissed') THEN now()
      ELSE NULL
    END
  WHERE case_id = p_case_id;

  RETURN jsonb_build_object(
    'success', true,
    'caseId', p_case_id,
    'status', next_status
  );
END;
$$;

CREATE OR REPLACE FUNCTION ops.prevent_review_mutation()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  RAISE EXCEPTION 'Review audit records are immutable'
    USING ERRCODE = '55000';
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS prevent_review_mutation ON decision.reviews;
CREATE TRIGGER prevent_review_mutation
BEFORE UPDATE OR DELETE ON decision.reviews
FOR EACH ROW EXECUTE FUNCTION ops.prevent_review_mutation();

REVOKE ALL ON FUNCTION public.user_can_access_admin_unit(uuid, uuid)
FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.command_centre_snapshot(uuid)
FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.review_case(uuid, uuid, text, text)
FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.user_can_access_admin_unit(uuid, uuid)
TO service_role;
GRANT EXECUTE ON FUNCTION public.command_centre_snapshot(uuid)
TO service_role;
GRANT EXECUTE ON FUNCTION public.review_case(uuid, uuid, text, text)
TO service_role;

COMMENT ON TABLE public.profiles IS
  'Invitation-only BHU-DRISHTI role and administrative scope for each Supabase Auth user.';
COMMENT ON FUNCTION public.command_centre_snapshot(uuid) IS
  'Server-only, scope-filtered command-centre read model.';
COMMENT ON FUNCTION public.review_case(uuid, uuid, text, text) IS
  'Server-only reviewed case transition with immutable reviewer attribution.';

COMMIT;
