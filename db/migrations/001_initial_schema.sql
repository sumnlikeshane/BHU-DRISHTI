BEGIN;

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS catalog;
CREATE SCHEMA IF NOT EXISTS geo;
CREATE SCHEMA IF NOT EXISTS programme;
CREATE SCHEMA IF NOT EXISTS evidence;
CREATE SCHEMA IF NOT EXISTS decision;
CREATE SCHEMA IF NOT EXISTS ops;
CREATE SCHEMA IF NOT EXISTS api;

CREATE OR REPLACE FUNCTION ops.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS catalog.data_sources (
  source_id text PRIMARY KEY,
  name text NOT NULL,
  publisher text NOT NULL,
  homepage_url text NOT NULL,
  documentation_url text,
  access_method text NOT NULL CHECK (access_method IN (
    'rest_api', 'stac_api', 'ogc_service', 'direct_download',
    'portal_download', 'restricted_transfer', 'field_capture'
  )),
  automation_level text NOT NULL CHECK (automation_level IN (
    'full', 'assisted', 'manual', 'restricted'
  )),
  coverage_scope text NOT NULL DEFAULT 'india',
  spatial_resolution text,
  temporal_resolution text,
  licence_name text,
  attribution_required boolean NOT NULL DEFAULT true,
  auth_env_keys text[] NOT NULL DEFAULT '{}',
  enabled boolean NOT NULL DEFAULT false,
  source_config jsonb NOT NULL DEFAULT '{}'::jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS set_data_sources_updated_at ON catalog.data_sources;
CREATE TRIGGER set_data_sources_updated_at
BEFORE UPDATE ON catalog.data_sources
FOR EACH ROW EXECUTE FUNCTION ops.set_updated_at();

CREATE TABLE IF NOT EXISTS ops.ingestion_runs (
  ingestion_run_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  pipeline_version text NOT NULL,
  status text NOT NULL CHECK (status IN (
    'queued', 'running', 'succeeded', 'partially_succeeded', 'failed', 'cancelled'
  )),
  requested_scope jsonb NOT NULL DEFAULT '{}'::jsonb,
  source_as_of timestamptz,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  rows_read bigint NOT NULL DEFAULT 0 CHECK (rows_read >= 0),
  rows_inserted bigint NOT NULL DEFAULT 0 CHECK (rows_inserted >= 0),
  rows_updated bigint NOT NULL DEFAULT 0 CHECK (rows_updated >= 0),
  rows_rejected bigint NOT NULL DEFAULT 0 CHECK (rows_rejected >= 0),
  error_summary text,
  run_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  CHECK (finished_at IS NULL OR finished_at >= started_at)
);

CREATE INDEX IF NOT EXISTS ingestion_runs_source_started_idx
  ON ops.ingestion_runs (source_id, started_at DESC);

CREATE TABLE IF NOT EXISTS ops.source_artifacts (
  artifact_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ingestion_run_id uuid REFERENCES ops.ingestion_runs(ingestion_run_id),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  artifact_uri text NOT NULL,
  media_type text,
  byte_size bigint CHECK (byte_size IS NULL OR byte_size >= 0),
  sha256 text CHECK (sha256 IS NULL OR sha256 ~ '^[0-9a-f]{64}$'),
  source_url text,
  source_as_of timestamptz,
  licence_snapshot text,
  retained_until date,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_id, artifact_uri)
);

CREATE TABLE IF NOT EXISTS geo.admin_units (
  admin_unit_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level text NOT NULL CHECK (level IN (
    'country', 'state_ut', 'district', 'subdistrict', 'block',
    'gram_panchayat', 'village'
  )),
  official_code text,
  lgd_code text,
  census_code text,
  name text NOT NULL,
  name_local text,
  parent_id uuid REFERENCES geo.admin_units(admin_unit_id),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  source_record_key text NOT NULL,
  source_version text NOT NULL DEFAULT 'unversioned',
  valid_from date,
  valid_to date,
  is_current boolean NOT NULL DEFAULT true,
  geom geometry(MultiPolygon, 4326) NOT NULL,
  properties jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from),
  UNIQUE (source_id, source_record_key, source_version)
);

CREATE UNIQUE INDEX IF NOT EXISTS admin_units_current_official_code_idx
  ON geo.admin_units (level, official_code)
  WHERE is_current AND official_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS admin_units_parent_idx ON geo.admin_units (parent_id);
CREATE INDEX IF NOT EXISTS admin_units_lgd_idx ON geo.admin_units (lgd_code);
CREATE INDEX IF NOT EXISTS admin_units_geom_idx ON geo.admin_units USING gist (geom);

DROP TRIGGER IF EXISTS set_admin_units_updated_at ON geo.admin_units;
CREATE TRIGGER set_admin_units_updated_at
BEFORE UPDATE ON geo.admin_units
FOR EACH ROW EXECUTE FUNCTION ops.set_updated_at();

CREATE TABLE IF NOT EXISTS geo.hydrological_units (
  hydrological_unit_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level text NOT NULL CHECK (level IN (
    'basin', 'sub_basin', 'watershed', 'micro_watershed', 'catchment'
  )),
  official_code text,
  name text,
  parent_id uuid REFERENCES geo.hydrological_units(hydrological_unit_id),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  source_record_key text NOT NULL,
  source_version text NOT NULL DEFAULT 'unversioned',
  area_ha numeric CHECK (area_ha IS NULL OR area_ha >= 0),
  geom geometry(MultiPolygon, 4326) NOT NULL,
  properties jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_id, source_record_key, source_version)
);

CREATE INDEX IF NOT EXISTS hydrological_units_parent_idx
  ON geo.hydrological_units (parent_id);
CREATE INDEX IF NOT EXISTS hydrological_units_code_idx
  ON geo.hydrological_units (level, official_code);
CREATE INDEX IF NOT EXISTS hydrological_units_geom_idx
  ON geo.hydrological_units USING gist (geom);

DROP TRIGGER IF EXISTS set_hydrological_units_updated_at ON geo.hydrological_units;
CREATE TRIGGER set_hydrological_units_updated_at
BEFORE UPDATE ON geo.hydrological_units
FOR EACH ROW EXECUTE FUNCTION ops.set_updated_at();

CREATE TABLE IF NOT EXISTS geo.waterbodies (
  waterbody_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  waterbody_type text,
  permanence text CHECK (permanence IS NULL OR permanence IN (
    'perennial', 'seasonal', 'intermittent', 'unknown'
  )),
  admin_unit_id uuid REFERENCES geo.admin_units(admin_unit_id),
  hydrological_unit_id uuid REFERENCES geo.hydrological_units(hydrological_unit_id),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  source_record_key text NOT NULL,
  source_version text NOT NULL DEFAULT 'unversioned',
  observed_at date,
  area_ha numeric CHECK (area_ha IS NULL OR area_ha >= 0),
  geom geometry(MultiPolygon, 4326) NOT NULL,
  properties jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_id, source_record_key, source_version)
);

CREATE INDEX IF NOT EXISTS waterbodies_admin_idx ON geo.waterbodies (admin_unit_id);
CREATE INDEX IF NOT EXISTS waterbodies_hydro_idx
  ON geo.waterbodies (hydrological_unit_id);
CREATE INDEX IF NOT EXISTS waterbodies_geom_idx ON geo.waterbodies USING gist (geom);

CREATE TABLE IF NOT EXISTS programme.projects (
  project_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_code text NOT NULL DEFAULT 'WDC-PMKSY-2.0',
  project_code text NOT NULL,
  name text,
  status text NOT NULL DEFAULT 'unknown' CHECK (status IN (
    'proposed', 'sanctioned', 'active', 'completed', 'closed', 'cancelled', 'unknown'
  )),
  sanction_year text,
  start_date date,
  planned_end_date date,
  actual_end_date date,
  sanctioned_area_ha numeric CHECK (sanctioned_area_ha IS NULL OR sanctioned_area_ha >= 0),
  sanctioned_cost_inr numeric CHECK (sanctioned_cost_inr IS NULL OR sanctioned_cost_inr >= 0),
  primary_admin_unit_id uuid REFERENCES geo.admin_units(admin_unit_id),
  hydrological_unit_id uuid REFERENCES geo.hydrological_units(hydrological_unit_id),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  source_record_key text NOT NULL,
  geom geometry(MultiPolygon, 4326),
  properties jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (scheme_code, project_code),
  UNIQUE (source_id, source_record_key)
);

CREATE INDEX IF NOT EXISTS projects_admin_idx
  ON programme.projects (primary_admin_unit_id);
CREATE INDEX IF NOT EXISTS projects_hydro_idx
  ON programme.projects (hydrological_unit_id);
CREATE INDEX IF NOT EXISTS projects_geom_idx
  ON programme.projects USING gist (geom);

DROP TRIGGER IF EXISTS set_projects_updated_at ON programme.projects;
CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON programme.projects
FOR EACH ROW EXECUTE FUNCTION ops.set_updated_at();

CREATE TABLE IF NOT EXISTS programme.works (
  work_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES programme.projects(project_id),
  work_code text NOT NULL,
  activity_head text,
  activity_type text,
  name text,
  status text NOT NULL DEFAULT 'unknown' CHECK (status IN (
    'planned', 'in_progress', 'completed', 'maintenance_due', 'cancelled', 'unknown'
  )),
  planned_start_date date,
  completion_date date,
  primary_admin_unit_id uuid REFERENCES geo.admin_units(admin_unit_id),
  hydrological_unit_id uuid REFERENCES geo.hydrological_units(hydrological_unit_id),
  location_precision text NOT NULL DEFAULT 'unknown' CHECK (location_precision IN (
    'surveyed', 'gps', 'centroid', 'approximate', 'unknown'
  )),
  geom geometry(Geometry, 4326),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  source_record_key text NOT NULL,
  properties jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_id, source_record_key)
);

CREATE INDEX IF NOT EXISTS works_project_idx ON programme.works (project_id);
CREATE INDEX IF NOT EXISTS works_admin_idx ON programme.works (primary_admin_unit_id);
CREATE INDEX IF NOT EXISTS works_hydro_idx ON programme.works (hydrological_unit_id);
CREATE INDEX IF NOT EXISTS works_status_idx ON programme.works (status);
CREATE INDEX IF NOT EXISTS works_geom_idx ON programme.works USING gist (geom);

DROP TRIGGER IF EXISTS set_works_updated_at ON programme.works;
CREATE TRIGGER set_works_updated_at
BEFORE UPDATE ON programme.works
FOR EACH ROW EXECUTE FUNCTION ops.set_updated_at();

CREATE TABLE IF NOT EXISTS evidence.field_observations (
  observation_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id uuid NOT NULL REFERENCES programme.works(work_id),
  stage text NOT NULL CHECK (stage IN (
    'pre_work', 'during_work', 'post_work', 'inspection', 'maintenance', 'unknown'
  )),
  captured_at timestamptz NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  geom geometry(Point, 4326) NOT NULL,
  gps_accuracy_m numeric CHECK (gps_accuracy_m IS NULL OR gps_accuracy_m >= 0),
  observer_ref text,
  quality_status text NOT NULL DEFAULT 'pending' CHECK (quality_status IN (
    'pending', 'usable', 'limited', 'rejected'
  )),
  quality_flags text[] NOT NULL DEFAULT '{}',
  notes text,
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  source_record_key text NOT NULL,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_id, source_record_key)
);

CREATE INDEX IF NOT EXISTS field_observations_work_time_idx
  ON evidence.field_observations (work_id, captured_at DESC);
CREATE INDEX IF NOT EXISTS field_observations_quality_idx
  ON evidence.field_observations (quality_status);
CREATE INDEX IF NOT EXISTS field_observations_geom_idx
  ON evidence.field_observations USING gist (geom);

CREATE TABLE IF NOT EXISTS evidence.media_assets (
  media_asset_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  observation_id uuid NOT NULL REFERENCES evidence.field_observations(observation_id),
  asset_role text NOT NULL DEFAULT 'field_photo' CHECK (asset_role IN (
    'field_photo', 'thumbnail', 'annotation', 'document', 'other'
  )),
  storage_uri text NOT NULL,
  mime_type text NOT NULL,
  sha256 text NOT NULL CHECK (sha256 ~ '^[0-9a-f]{64}$'),
  byte_size bigint CHECK (byte_size IS NULL OR byte_size >= 0),
  width_px integer CHECK (width_px IS NULL OR width_px > 0),
  height_px integer CHECK (height_px IS NULL OR height_px > 0),
  exif_removed boolean NOT NULL DEFAULT false,
  access_class text NOT NULL DEFAULT 'restricted' CHECK (access_class IN (
    'public', 'internal', 'restricted'
  )),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (sha256)
);

CREATE INDEX IF NOT EXISTS media_assets_observation_idx
  ON evidence.media_assets (observation_id);

CREATE TABLE IF NOT EXISTS evidence.eo_observations (
  eo_observation_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_unit_id uuid REFERENCES geo.admin_units(admin_unit_id),
  hydrological_unit_id uuid REFERENCES geo.hydrological_units(hydrological_unit_id),
  project_id uuid REFERENCES programme.projects(project_id),
  work_id uuid REFERENCES programme.works(work_id),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  collection_id text NOT NULL,
  source_item_id text NOT NULL,
  acquired_at timestamptz NOT NULL,
  processing_level text,
  spatial_resolution_m numeric CHECK (spatial_resolution_m IS NULL OR spatial_resolution_m > 0),
  cloud_cover_pct numeric CHECK (
    cloud_cover_pct IS NULL OR cloud_cover_pct BETWEEN 0 AND 100
  ),
  valid_pixel_fraction numeric CHECK (
    valid_pixel_fraction IS NULL OR valid_pixel_fraction BETWEEN 0 AND 1
  ),
  analysis_geom geometry(Geometry, 4326) NOT NULL,
  source_asset_uri text,
  mask_definition jsonb NOT NULL DEFAULT '{}'::jsonb,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  idempotency_key text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (num_nonnulls(admin_unit_id, hydrological_unit_id, project_id, work_id) = 1)
);

CREATE INDEX IF NOT EXISTS eo_observations_work_time_idx
  ON evidence.eo_observations (work_id, acquired_at DESC);
CREATE INDEX IF NOT EXISTS eo_observations_hydro_time_idx
  ON evidence.eo_observations (hydrological_unit_id, acquired_at DESC);
CREATE INDEX IF NOT EXISTS eo_observations_geom_idx
  ON evidence.eo_observations USING gist (analysis_geom);

CREATE TABLE IF NOT EXISTS evidence.metrics (
  metric_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_unit_id uuid REFERENCES geo.admin_units(admin_unit_id),
  hydrological_unit_id uuid REFERENCES geo.hydrological_units(hydrological_unit_id),
  project_id uuid REFERENCES programme.projects(project_id),
  work_id uuid REFERENCES programme.works(work_id),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  ingestion_run_id uuid REFERENCES ops.ingestion_runs(ingestion_run_id),
  metric_code text NOT NULL,
  metric_variant text NOT NULL DEFAULT 'default',
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  value numeric,
  unit text NOT NULL,
  statistic text NOT NULL,
  method_version text NOT NULL,
  baseline_start date,
  baseline_end date,
  uncertainty numeric CHECK (uncertainty IS NULL OR uncertainty >= 0),
  quality_status text NOT NULL DEFAULT 'pending' CHECK (quality_status IN (
    'pending', 'usable', 'limited', 'rejected'
  )),
  quality_details jsonb NOT NULL DEFAULT '{}'::jsonb,
  formula text,
  idempotency_key text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (num_nonnulls(admin_unit_id, hydrological_unit_id, project_id, work_id) = 1),
  CHECK (period_end >= period_start),
  CHECK (baseline_end IS NULL OR baseline_start IS NULL OR baseline_end >= baseline_start)
);

CREATE INDEX IF NOT EXISTS metrics_work_code_period_idx
  ON evidence.metrics (work_id, metric_code, period_end DESC);
CREATE INDEX IF NOT EXISTS metrics_hydro_code_period_idx
  ON evidence.metrics (hydrological_unit_id, metric_code, period_end DESC);
CREATE INDEX IF NOT EXISTS metrics_admin_code_period_idx
  ON evidence.metrics (admin_unit_id, metric_code, period_end DESC);

CREATE TABLE IF NOT EXISTS decision.model_runs (
  model_run_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name text NOT NULL,
  model_version text NOT NULL,
  feature_contract_version text NOT NULL,
  status text NOT NULL CHECK (status IN ('running', 'succeeded', 'failed', 'cancelled')),
  scope jsonb NOT NULL DEFAULT '{}'::jsonb,
  parameters jsonb NOT NULL DEFAULT '{}'::jsonb,
  code_revision text,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  error_summary text,
  CHECK (finished_at IS NULL OR finished_at >= started_at)
);

CREATE TABLE IF NOT EXISTS decision.signals (
  signal_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_run_id uuid NOT NULL REFERENCES decision.model_runs(model_run_id),
  work_id uuid NOT NULL REFERENCES programme.works(work_id),
  signal_code text NOT NULL,
  value numeric,
  label text,
  confidence numeric CHECK (confidence IS NULL OR confidence BETWEEN 0 AND 1),
  evidence_summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  explanation text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (model_run_id, work_id, signal_code)
);

CREATE INDEX IF NOT EXISTS signals_work_idx
  ON decision.signals (work_id, created_at DESC);

CREATE TABLE IF NOT EXISTS decision.cases (
  case_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id uuid NOT NULL REFERENCES programme.works(work_id),
  model_run_id uuid REFERENCES decision.model_runs(model_run_id),
  queue text NOT NULL CHECK (queue IN (
    'recollect_evidence', 'analyst_review', 'field_inspection', 'routine_monitoring'
  )),
  priority text NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  status text NOT NULL DEFAULT 'open' CHECK (status IN (
    'open', 'assigned', 'in_review', 'resolved', 'dismissed'
  )),
  reason_codes text[] NOT NULL DEFAULT '{}',
  explanation text NOT NULL,
  due_at timestamptz,
  assigned_to_ref text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  CHECK (resolved_at IS NULL OR resolved_at >= created_at)
);

CREATE INDEX IF NOT EXISTS cases_queue_priority_idx
  ON decision.cases (status, queue, priority, created_at DESC);
CREATE INDEX IF NOT EXISTS cases_work_idx ON decision.cases (work_id, created_at DESC);

DROP TRIGGER IF EXISTS set_cases_updated_at ON decision.cases;
CREATE TRIGGER set_cases_updated_at
BEFORE UPDATE ON decision.cases
FOR EACH ROW EXECUTE FUNCTION ops.set_updated_at();

CREATE TABLE IF NOT EXISTS decision.reviews (
  review_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES decision.cases(case_id),
  reviewer_ref text NOT NULL,
  outcome text NOT NULL CHECK (outcome IN (
    'confirmed', 'rejected', 'needs_more_evidence', 'inspection_required', 'resolved'
  )),
  notes text,
  reviewed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS reviews_case_idx ON decision.reviews (case_id, reviewed_at DESC);

CREATE TABLE IF NOT EXISTS decision.actions (
  action_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES decision.cases(case_id),
  action_type text NOT NULL,
  status text NOT NULL DEFAULT 'planned' CHECK (status IN (
    'planned', 'assigned', 'in_progress', 'completed', 'cancelled'
  )),
  owner_ref text,
  due_at timestamptz,
  completed_at timestamptz,
  completion_notes text,
  outcome_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS actions_case_idx ON decision.actions (case_id, status);

DROP TRIGGER IF EXISTS set_actions_updated_at ON decision.actions;
CREATE TRIGGER set_actions_updated_at
BEFORE UPDATE ON decision.actions
FOR EACH ROW EXECUTE FUNCTION ops.set_updated_at();

CREATE TABLE IF NOT EXISTS ops.record_lineage (
  lineage_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ingestion_run_id uuid NOT NULL REFERENCES ops.ingestion_runs(ingestion_run_id),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  source_record_key text NOT NULL,
  entity_schema text NOT NULL,
  entity_table text NOT NULL,
  entity_id uuid NOT NULL,
  source_updated_at timestamptz,
  payload_sha256 text CHECK (payload_sha256 IS NULL OR payload_sha256 ~ '^[0-9a-f]{64}$'),
  transformation_version text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_id, source_record_key, entity_schema, entity_table, entity_id)
);

CREATE INDEX IF NOT EXISTS record_lineage_entity_idx
  ON ops.record_lineage (entity_schema, entity_table, entity_id);

CREATE TABLE IF NOT EXISTS ops.data_quality_issues (
  issue_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ingestion_run_id uuid REFERENCES ops.ingestion_runs(ingestion_run_id),
  source_id text NOT NULL REFERENCES catalog.data_sources(source_id),
  entity_schema text,
  entity_table text,
  entity_id uuid,
  source_record_key text,
  severity text NOT NULL CHECK (severity IN ('error', 'warning', 'info')),
  rule_code text NOT NULL,
  message text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'accepted', 'fixed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE INDEX IF NOT EXISTS data_quality_open_idx
  ON ops.data_quality_issues (status, severity, source_id, created_at DESC);

CREATE OR REPLACE VIEW api.case_queue AS
SELECT
  c.case_id,
  c.queue,
  c.priority,
  c.status,
  c.reason_codes,
  c.explanation,
  c.due_at,
  c.assigned_to_ref,
  c.created_at,
  w.work_id,
  w.work_code,
  w.activity_type,
  w.geom,
  p.project_id,
  p.project_code,
  p.scheme_code,
  w.primary_admin_unit_id,
  w.hydrological_unit_id
FROM decision.cases c
JOIN programme.works w ON w.work_id = c.work_id
JOIN programme.projects p ON p.project_id = w.project_id;

COMMENT ON SCHEMA api IS
  'Read models for the application backend. Do not expose the database directly to browsers.';
COMMENT ON TABLE evidence.metrics IS
  'Versioned, quality-labelled evidence such as NDVI, open-water index, rainfall, slope, and soil statistics.';
COMMENT ON COLUMN evidence.field_observations.observer_ref IS
  'Pseudonymous operator identifier only; do not copy public-report names, phone numbers, or email addresses.';
COMMENT ON COLUMN evidence.media_assets.storage_uri IS
  'Object-storage URI. Large photos and rasters should not be stored in Postgres bytea columns.';

COMMIT;
