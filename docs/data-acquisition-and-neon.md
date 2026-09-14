# Pan-India data acquisition and Supabase plan

Status: implementation baseline, 13 September 2026.

## Non-negotiable scope

BHU-DRISHTI is a **Pan-India** system. Maharashtra and Nashik remain an
illustrative landing-page story only. No database table, source adapter, API, or
model may assume Maharashtra-specific codes, names, seasons, activity types, or
administrative levels.

Every ingestion run must declare its geographic coverage. A national dashboard
must distinguish `available`, `stale`, `partial`, `restricted`, and `missing`
coverage instead of silently displaying missing states/UTs as zero.

## Recommended storage architecture

Use Supabase Postgres with PostGIS as the system of record for structured data:

- administrative and hydrological geometries;
- programme projects, works, and work locations;
- field-observation metadata and quality flags;
- satellite/rainfall/terrain/soil summary statistics;
- model versions, explainable signals, review queues, actions, and lineage.

Use a private S3-compatible object store for large or original objects:

- field photographs and thumbnails;
- satellite rasters and derived Cloud-Optimized GeoTIFFs;
- shapefile/GeoJSON/NetCDF source snapshots;
- model artifacts and bulk exports.

Postgres stores each object's URI, checksum, size, source, licence snapshot, and
retention metadata. It should not store full images or national rasters in
`bytea` columns. The browser must call a backend API; it must never receive a
database owner connection string or unrestricted object-store credentials.

The initial PostGIS schema is in
[`db/migrations/001_initial_schema.sql`](../db/migrations/001_initial_schema.sql).
The source registry seed is in
[`db/migrations/002_seed_data_sources.sql`](../db/migrations/002_seed_data_sources.sql).

## Automation classification

- **Full**: a documented machine interface exists. Once credentials are supplied,
  the connector can run unattended and retry safely.
- **Assisted**: download URLs or public exports can be automated, but the provider
  has not promised a stable production API. The connector needs monitoring and
  retained source snapshots.
- **Manual**: a person must register, accept terms, select data, submit a form,
  complete an OTP/CAPTCHA, sign an MoU, or download the files.
- **Restricted**: the data owner must approve and deliver operational data or API
  access. Public webpage visibility is not authorization for production reuse.

## Sources and APIs

| Evidence needed                                            | Preferred source                                                                                                                                                                                                    | Pan-India position                                                                                            | Access                                                          | Automation                                | What to do                                                                                                                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WDC-PMKSY projects and works                               | [WDC-PMKSY public reports](https://wdcpmksy.dolr.gov.in/reports?roleId=1) and [state-wise work list](https://wdcpmksy.dolr.gov.in/wdcpmksyActivityWork)                                                             | Covers participating states/UTs; verify each report date and gaps                                             | Web reports and Excel exports; no supported public API verified | **Assisted only**                         | Use public exports for a provenance-preserving pilot. Obtain written permission and a supported bulk/API route before production.                                     |
| Drishti geo-tagged images and Srishti/Bhuvan work evidence | NRSC/ISRO and WDC-PMKSY programme owner                                                                                                                                                                             | Intended programme coverage, subject to access                                                                | No public production API verified                               | **Restricted**                            | Request service account/bulk export, field dictionary, rate limits, licence, refresh method, and approval for storing photos.                                         |
| Official administrative boundaries                         | [Survey of India ABDB](https://surveyofindia.gov.in/pages/administrative-boundary-data-base-abdb-) and [village boundary downloads](https://surveyofindia.gov.in/pages/village-boundary-data-base-of-entire-india)  | National to subdistrict; village resources are state/UT files and the published list must be audited for gaps | Portal ZIP/RAR/Shapefile downloads                              | **Manual once, then import is automatic** | Download the current entire-country ABDB plus each required village package; retain metadata, terms, date, version, and SHA-256.                                      |
| Basin, sub-basin, watershed boundaries                     | [Hydrological Boundaries on data.gov.in](https://www.data.gov.in/catalog/hydrological-boundaries)                                                                                                                   | Catalogue states India coverage                                                                               | ZIP resources; catalogue/API features                           | **Assisted**                              | Download basin/sub-basin/watershed packages. A data.gov.in API key is needed only for resources exposed through its API.                                              |
| Surface-waterbody polygons                                 | [National Water Data Portal dataset](https://www.nwdp.nwic.gov.in/en/dataset/surface-waterbodies)                                                                                                                   | State/UT resources are listed separately; completeness must be checked                                        | KML, GeoJSON, and SHP downloads                                 | **Assisted**                              | Enumerate resources, prefer GeoJSON, record duplicates/missing states, and snapshot every source URL.                                                                 |
| Daily official rainfall by district/state                  | [NWDP Rainfall Daily IMD](https://www.nwdp.nwic.gov.in/en/dataset/rainfall-daily-imd)                                                                                                                               | Described as stations across India, with district/state CSV resources                                         | CSV resources                                                   | **Assisted**                              | Download the current resource, record its update timestamp, and aggregate only at the resolution actually supplied.                                                   |
| Long historical rainfall baseline                          | [IMD 0.25° daily gridded NetCDF](https://www.imdpune.gov.in/cmpg/Griddata/Rainfall_25_NetCDF.html)                                                                                                                  | India grid                                                                                                    | Yearly files selected on a download page                        | **Assisted**                              | Download each required year, retain IMD citation/terms, and calculate 30/60/90-day totals and declared baseline anomalies.                                            |
| State/subdivision rainfall context                         | [IMD API documentation](https://mausam.imd.gov.in/imd_latest/contents/api.pdf)                                                                                                                                      | National administrative aggregates                                                                            | Documented HTTP endpoints                                       | **Full**                                  | Schedule the supported endpoints. Never use state-scale rainfall to claim a work-level impact.                                                                        |
| Automated rainfall fallback/corroboration                  | [NASA GPM IMERG V07 OPeNDAP](https://gpm1.gesdisc.eosdis.nasa.gov/opendap/GPM_L3/GPM_3IMERGHH.07/)                                                                                                                  | Global                                                                                                        | Earthdata token and OPeNDAP                                     | **Full**                                  | Subset India/AOI time windows. Label it as NASA satellite precipitation and do not silently substitute it for IMD.                                                    |
| NDVI, open-water index, cloud/valid-pixel evidence         | [Copernicus Data Space STAC](https://documentation.dataspace.copernicus.eu/APIs/STAC.html) and [Statistical API examples](https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Statistical/Examples.html) | Global, including India                                                                                       | STAC discovery; OAuth2 for Sentinel Hub processing/statistics   | **Full**                                  | Query `sentinel-2-l2a`; calculate polygon statistics with SCL/cloud/shadow/data masks and versioned formulas. Store summaries in Postgres, not full scenes.           |
| Elevation and slope                                        | [Copernicus DEM GLO-30](https://documentation.dataspace.copernicus.eu/Data/Others/CCM.html)                                                                                                                         | Global 30 m DSM                                                                                               | CDSE OData/S3/Sentinel Hub; CCM registration required           | **Full after registration**               | Download/subset once, derive slope/flow products, put rasters in object storage, and store work/watershed summaries in Postgres.                                      |
| Soil context                                               | [SoilGrids WCS](https://docs.isric.org/globaldata/soilgrids/wcs.html)                                                                                                                                               | Global 250 m                                                                                                  | OGC WCS; no key normally required                               | **Full**                                  | Request bounded subsets and store property, depth, statistic, uncertainty, product version, and CC BY 4.0 attribution.                                                |
| Bhuvan LULC and other thematic layers                      | [Bhuvan WMS/WMTS guide](https://bhuvan.nrsc.gov.in/wiki/index.php/How_to_use_WMS_services)                                                                                                                          | Layer/year/state dependent, not automatically a complete national analytical dataset                          | OGC WMS/WMTS                                                    | **Assisted for display**                  | Consume the declared layer for visualization/capabilities monitoring. Do not derive national analytics from rendered map tiles without confirmed rights and metadata. |
| Downloadable Bhuvan thematic data                          | [Bhuvan thematic dataset list](https://bhuvan.nrsc.gov.in/wiki/index.php/List_of_Vector_%28Thematic_Maps%29_datasets) / Get Data                                                                                    | Layer/release dependent                                                                                       | Account, request form, and sometimes MoU/FTP                    | **Manual**                                | Request the exact year, scale, geography, and use. Supply the approved files and terms to the importer.                                                               |

`data.gov.in` requires a registered user's key for API resources and says the
published content belongs to the contributing department under the Government
Open Data License - India. Keep source-specific attribution even when the
platform-level licence applies. See the [official help page](https://www.data.gov.in/help).

### Important limitation

The public WDC-PMKSY pages are useful for a demo and source reconnaissance, but
HTML/Excel routes found behind a portal are not equivalent to a supported API.
They may change without notice, and report outputs may contain observer personal
data. Do not ingest names, phone numbers, email addresses, or unrestricted
photos. The production connector should be based on written authorization from
the programme owner. The official help desk is listed at
[`support-wdcpmksy@nic.in`](https://wdcpmksy.dolr.gov.in/technicalsupport); Bhuvan
lists `bhuvan@nrsc.gov.in` for its services.

## What must be downloaded or requested manually

### 1. Survey of India boundaries

1. Open the [ABDB page](https://surveyofindia.gov.in/pages/administrative-boundary-data-base-abdb-).
2. Download the current entire-India state/district/subdistrict package and its
   metadata.
3. Open the [village boundary page](https://surveyofindia.gov.in/pages/village-boundary-data-base-of-entire-india)
   and download every published state/UT package required by the programme.
4. Save the untouched archives in the object-store `raw/soi/<release-date>/`
   prefix. Record the URL, retrieval time, licence/terms, version, and SHA-256.
5. Create a coverage manifest. A missing state/UT file is `missing`, not an empty
   dataset.

I can automate validation, reprojection to EPSG:4326, geometry repair,
deduplication, name/code crosswalks, PostGIS loading, and coverage reports after
the files are supplied.

### 2. Drishti/Srishti operational data

Send an access request to the WDC-PMKSY/NRSC owners asking for:

- a documented API, scheduled bulk export, or secure file-transfer route;
- project/work IDs and the full administrative/hydrological code hierarchy;
- coordinates, capture timestamps, pre/during/post stage, and quality fields;
- photo access rules, consent/personal-data handling, retention, and permitted
  derivative use;
- source update timestamps, deletions/corrections, pagination, rate limits, and a
  sandbox/test account;
- licence/attribution and permission to store derived metrics in Supabase.

Do not promise nationwide Drishti coverage until the owner returns a coverage
statement. I cannot obtain this authorization, accept its terms, or complete an
OTP/CAPTCHA on the project owner's behalf. Once access is issued, I can implement
and run the connector.

### 3. Bhuvan downloadable LULC/thematic data

1. Register on Bhuvan and open its thematic/Get Data service.
2. Select the exact theme, scale, observation year, and geography.
3. Submit the purpose/request and complete the MoU or approval flow if shown.
4. Download the approved files and the corresponding metadata/terms.
5. Place untouched files in `raw/bhuvan/<theme>/<release>/` and provide the
   manifest to the importer.

Use WMS/WMTS immediately for map display only. Treat downloadable analytical
layers as a separate licensed source.

## Database model

The schema deliberately separates facts from interpretations:

| Schema      | Purpose                                                                        |
| ----------- | ------------------------------------------------------------------------------ |
| `catalog`   | Data-source method, coverage, licence, auth keys, and enablement               |
| `geo`       | Versioned administrative units, hydrological units, and waterbodies            |
| `programme` | WDC-PMKSY projects and works; official source IDs remain intact                |
| `evidence`  | Field observations, private media references, EO scenes, and versioned metrics |
| `decision`  | Model runs, explainable signals, operational cases, human reviews, and actions |
| `ops`       | Ingestion runs, immutable artifacts, record lineage, and data-quality issues   |
| `api`       | Read models for a future backend; never direct public database access          |

Key design choices:

- UUIDs are internal keys; upstream project/work/LGD/census codes are retained
  separately and never rewritten.
- Administrative geography is recursive and versioned, so all states and UTs
  follow the same schema while boundary changes remain traceable.
- Each metric belongs to exactly one scope: admin unit, hydrological unit,
  project, or work.
- Every metric records its time window, statistic, unit, method version, quality,
  and source. “NDVI +0.12” or “rainfall -12%” without these fields is invalid.
- Field observations, derived metrics, model signals, reviews, and actions are
  separate records. AI output never overwrites source evidence.
- Image observer identifiers must be pseudonymous. Original media is private by
  default and served through short-lived signed URLs after authorization checks.
- Every ingest is idempotent and linked to an ingestion run and source snapshot.

The Supabase migration adds invitation-only Auth profiles for programme admins,
state and district reviewers, field officers, and analysts. Operational tables
have RLS enabled without direct browser policies. Authenticated Edge Functions
call server-only RPCs that enforce active profiles and recursive administrative
scope. These controls must still undergo a formal security and data-residency
review before restricted operational data is loaded.

## Supabase setup steps

1. Create a Supabase project only after confirming that the selected hosting region,
   vendor terms, backup policy, and data residency are acceptable for the data
   owner. Use a development project or branch first.
2. Copy the project URL, publishable key, secret key, JWKS URL, and direct
   Postgres connection string. Only the URL and publishable key may reach Vite.
3. Copy [`.env.example`](../.env.example) to `.env` and fill it locally. `.env` is
   already ignored by Git. Never prefix secrets with `VITE_` or send them to the
   React client.
4. Run all checked-in migrations with the direct URL:

   ```bash
   npm run db:migrate
   ```

5. Verify PostGIS and the registry:

   ```sql
   SELECT postgis_full_version();
   SELECT source_id, automation_level, enabled
   FROM catalog.data_sources
   ORDER BY source_id;
   ```

6. Create a private S3-compatible bucket with versioning, encryption, lifecycle
   rules, and separate raw/processed/media prefixes. Put only URIs and SHA-256
   values in Postgres.
7. Enable sources one at a time only after credentials, licence, and coverage are
   verified. Start with boundaries and hydrological units, then projects/works,
   observations, satellite/rainfall/soil metrics, and finally model signals.
8. Put migrations and bulk imports through a staging Supabase project or branch
   before production. Follow [the Supabase deployment guide](./supabase-setup.md)
   for Auth redirects, profile assignment, and Edge Function deployment.

## Recommended first national data build

1. Load authoritative SoI state/UT, district, and subdistrict boundaries.
2. Load OGD basin, sub-basin, and watershed boundaries; validate geometry and
   spatial joins against the SoI administrative layer.
3. Load a permission-cleared WDC-PMKSY project/work export while preserving every
   upstream identifier and report timestamp.
4. For each usable work geometry, calculate Sentinel-2 L2A NDVI and a precisely
   named open-water index over declared buffers/catchments with cloud masks.
5. Add IMD 30/60/90-day rainfall totals and anomalies; use GPM only as a clearly
   labelled fallback/corroborating product.
6. Add Copernicus DEM slope/terrain summaries and SoilGrids properties at their
   true resolution.
7. Load field photos only after operational authorization and access controls are
   complete.
8. Generate state/UT coverage and quality reports before showing national totals.

## What I can automate next

With credentials/files available, I can build and run:

- repeatable SoI/OGD/NWDP Shapefile, GeoJSON, CSV, and NetCDF importers;
- nationwide state/UT coverage manifests and stale/missing-source alerts;
- CDSE STAC discovery and Sentinel Hub polygon statistics for NDVI/open-water
  evidence, including masks and quality thresholds;
- IMD/NWDP rainfall ingestion and declared baseline anomalies;
- Copernicus DEM and SoilGrids subsetting and PostGIS summaries;
- WDC-PMKSY authorized API/export ingestion with idempotent upserts and lineage;
- object-store upload/checksum handling, scheduled jobs, retries, and audit logs;
- additional backend endpoints that query Supabase safely for the React application;
- tests for geometry validity, duplicate upstream IDs, temporal gaps, and source
  coverage.

I cannot independently create/approve external government accounts, obtain API
keys, accept licences or MoUs, pass OTP/CAPTCHA flows, authorize reuse of Drishti
photos, or invent access to a non-public API. Those are the only user/data-owner
steps; the connectors and processing can be automated after that handoff.
