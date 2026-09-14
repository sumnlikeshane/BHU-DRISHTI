BEGIN;

-- This seed is deliberately and visibly synthetic. It exists so the authenticated
-- command centre has a coherent end-to-end scenario before authorised programme
-- data is available.
INSERT INTO geo.admin_units (
  admin_unit_id,
  level,
  official_code,
  name,
  parent_id,
  source_id,
  source_record_key,
  source_version,
  geom,
  properties
)
VALUES
  (
    '10000000-0000-4000-8000-000000000001',
    'state_ut',
    'MH-DEMO',
    'Maharashtra',
    NULL,
    'soi_abdb',
    'demo-maharashtra',
    'illustrative-v1',
    ST_Multi(ST_GeomFromText(
      'POLYGON((72.6 15.6,80.9 15.6,80.9 22.1,72.6 22.1,72.6 15.6))',
      4326
    )),
    '{"classification":"illustrative_demo","not_authoritative":true}'::jsonb
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'district',
    'MH-NSK-DEMO',
    'Nashik',
    '10000000-0000-4000-8000-000000000001',
    'soi_abdb',
    'demo-nashik',
    'illustrative-v1',
    ST_Multi(ST_GeomFromText(
      'POLYGON((73.2 19.6,74.2 19.6,74.2 20.6,73.2 20.6,73.2 19.6))',
      4326
    )),
    '{"classification":"illustrative_demo","not_authoritative":true}'::jsonb
  )
ON CONFLICT (admin_unit_id) DO NOTHING;

INSERT INTO programme.projects (
  project_id,
  project_code,
  name,
  status,
  sanction_year,
  primary_admin_unit_id,
  source_id,
  source_record_key,
  geom,
  properties
)
VALUES (
  '20000000-0000-4000-8000-000000000001',
  'MH-NSK-WDC-DEMO-01',
  'Nashik watershed demonstration project',
  'active',
  '2025-26',
  '10000000-0000-4000-8000-000000000002',
  'wdc_pmksy_public_reports',
  'demo-project-nashik-01',
  ST_Multi(ST_GeomFromText(
    'POLYGON((73.45 19.85,73.95 19.85,73.95 20.35,73.45 20.35,73.45 19.85))',
    4326
  )),
  '{"classification":"illustrative_demo"}'::jsonb
)
ON CONFLICT (project_id) DO NOTHING;

INSERT INTO programme.works (
  work_id,
  project_id,
  work_code,
  activity_type,
  name,
  status,
  primary_admin_unit_id,
  location_precision,
  geom,
  source_id,
  source_record_key,
  properties
)
VALUES
  (
    '30000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    'MH-NSK-0427',
    'check_dam',
    'Peth check dam 0427',
    'maintenance_due',
    '10000000-0000-4000-8000-000000000002',
    'gps',
    ST_SetSRID(ST_Point(73.61, 20.26), 4326),
    'wdc_pmksy_public_reports',
    'demo-work-0427',
    '{"classification":"illustrative_demo"}'::jsonb
  ),
  (
    '30000000-0000-4000-8000-000000000002',
    '20000000-0000-4000-8000-000000000001',
    'MH-NSK-0188',
    'farm_pond',
    'Dindori farm pond 0188',
    'completed',
    '10000000-0000-4000-8000-000000000002',
    'gps',
    ST_SetSRID(ST_Point(73.83, 20.20), 4326),
    'wdc_pmksy_public_reports',
    'demo-work-0188',
    '{"classification":"illustrative_demo"}'::jsonb
  ),
  (
    '30000000-0000-4000-8000-000000000003',
    '20000000-0000-4000-8000-000000000001',
    'MH-NSK-0314',
    'drainage_treatment',
    'Igatpuri drainage treatment 0314',
    'completed',
    '10000000-0000-4000-8000-000000000002',
    'gps',
    ST_SetSRID(ST_Point(73.56, 19.70), 4326),
    'wdc_pmksy_public_reports',
    'demo-work-0314',
    '{"classification":"illustrative_demo"}'::jsonb
  ),
  (
    '30000000-0000-4000-8000-000000000004',
    '20000000-0000-4000-8000-000000000001',
    'MH-NSK-0521',
    'check_dam',
    'Sinnar check dam 0521',
    'completed',
    '10000000-0000-4000-8000-000000000002',
    'gps',
    ST_SetSRID(ST_Point(74.00, 19.84), 4326),
    'wdc_pmksy_public_reports',
    'demo-work-0521',
    '{"classification":"illustrative_demo"}'::jsonb
  )
ON CONFLICT (work_id) DO NOTHING;

INSERT INTO decision.model_runs (
  model_run_id,
  model_name,
  model_version,
  feature_contract_version,
  status,
  scope,
  parameters,
  code_revision,
  started_at,
  finished_at
)
VALUES (
  '40000000-0000-4000-8000-000000000001',
  'illustrative-evidence-fusion',
  'demo-v1',
  'demo-v1',
  'succeeded',
  '{"district":"Nashik","classification":"illustrative_demo"}'::jsonb,
  '{"not_a_production_model":true}'::jsonb,
  'demo',
  '2026-09-01T08:00:00Z',
  '2026-09-01T08:04:00Z'
)
ON CONFLICT (model_run_id) DO NOTHING;

INSERT INTO decision.signals (
  signal_id,
  model_run_id,
  work_id,
  signal_code,
  value,
  label,
  confidence,
  evidence_summary,
  explanation
)
VALUES
  (
    '60000000-0000-4000-8000-000000000001',
    '40000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000001',
    'possible_siltation', 0.81, 'Possible siltation', 0.81,
    '{"classification":"illustrative_demo","source":"field_photo"}'::jsonb,
    'A visible cue suggests possible siltation; field inspection is required.'
  ),
  (
    '60000000-0000-4000-8000-000000000002',
    '40000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000002',
    'missing_current_photo', 1, 'Evidence gap', 0.98,
    '{"classification":"illustrative_demo","source":"record_quality"}'::jsonb,
    'The latest field observation is outside the monitoring window.'
  ),
  (
    '60000000-0000-4000-8000-000000000003',
    '40000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000003',
    'conflicting_signals', 0.64, 'Analyst review', 0.64,
    '{"classification":"illustrative_demo","source":"evidence_fusion"}'::jsonb,
    'Field and earth-observation signals do not yet agree.'
  ),
  (
    '60000000-0000-4000-8000-000000000004',
    '40000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000004',
    'routine_monitoring', 0.22, 'No current flag', 0.88,
    '{"classification":"illustrative_demo","source":"evidence_fusion"}'::jsonb,
    'Screened signals remain within the illustrative monitored baseline.'
  )
ON CONFLICT (signal_id) DO NOTHING;

INSERT INTO decision.cases (
  case_id,
  work_id,
  model_run_id,
  queue,
  priority,
  status,
  reason_codes,
  explanation,
  due_at,
  created_at
)
VALUES
  (
    '50000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000001',
    '40000000-0000-4000-8000-000000000001',
    'field_inspection', 'critical', 'open',
    ARRAY['possible_siltation', 'weak_water_signal', 'rainfall_context'],
    'Possible visible siltation and weaker water evidence despite adequate rainfall. This is an inspection candidate, not a structural diagnosis.',
    '2026-09-18T17:30:00+05:30',
    '2026-09-14T09:00:00+05:30'
  ),
  (
    '50000000-0000-4000-8000-000000000002',
    '30000000-0000-4000-8000-000000000002',
    '40000000-0000-4000-8000-000000000001',
    'recollect_evidence', 'high', 'open',
    ARRAY['missing_current_photo', 'stale_observation'],
    'Current field evidence is missing. Recollection is required before condition can be assessed.',
    '2026-09-21T17:30:00+05:30',
    '2026-09-13T11:00:00+05:30'
  ),
  (
    '50000000-0000-4000-8000-000000000003',
    '30000000-0000-4000-8000-000000000003',
    '40000000-0000-4000-8000-000000000001',
    'analyst_review', 'medium', 'assigned',
    ARRAY['conflicting_signals', 'seasonal_comparison'],
    'Field and satellite signals conflict after seasonal alignment. Analyst review is recommended.',
    '2026-09-25T17:30:00+05:30',
    '2026-09-12T14:00:00+05:30'
  ),
  (
    '50000000-0000-4000-8000-000000000004',
    '30000000-0000-4000-8000-000000000004',
    '40000000-0000-4000-8000-000000000001',
    'routine_monitoring', 'low', 'open',
    ARRAY['no_current_flag'],
    'Available evidence remains within the illustrative baseline. Continue routine monitoring.',
    NULL,
    '2026-09-11T10:00:00+05:30'
  )
ON CONFLICT (case_id) DO NOTHING;

COMMIT;
