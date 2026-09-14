# Boundary data provenance

## Release status

The checked-in boundary data is approved **only for this geometry prototype**. It
is not an authoritative political or administrative map and must not be described
as officially verified.

Before any public, judged, government-facing, or production release, the national
outline and every state/UT boundary must be validated against current Survey of
India (SoI) material. The Government of India geospatial guidelines identify SoI
published maps or SoI digital boundary data as the standard for political maps of
India. SoI currently publishes downloadable outline maps and administrative
boundary resources:

- [Survey of India outline maps](https://surveyofindia.gov.in/pages/outline-maps-of-india)
- [Survey of India geospatial guidelines](https://onlinemaps.surveyofindia.gov.in/GeospatialGuidelines.aspx)

This is a hard release gate, not optional attribution.

## Acquired source snapshot

| Field                       | Recorded value                                                     |
| --------------------------- | ------------------------------------------------------------------ |
| Source repository           | <https://github.com/udit-001/india-maps-data.git>                  |
| Full commit SHA             | `273a91960b2317c8431e562942293de959e2bd68`                         |
| Commit timestamp            | `2026-07-14T20:55:24Z`                                             |
| Acquisition date            | `2026-09-08`                                                       |
| Retained national source    | `scripts/maps/source/india.topo.json`                              |
| National SHA-256            | `5bf4f880f507afa8a3f3578d2e9d938abc1eb16ac7aa54d2e89975e8acaaf457` |
| Retained Maharashtra source | `scripts/maps/source/maharashtra.topo.json`                        |
| Maharashtra SHA-256         | `90a0acf94a9e933ddf2eee7fdf38f77f94288f59eff632ab3ac1b9a234f4aede` |

Only the two TopoJSON inputs required for the spike were retained. The upstream
repository was cloned to a temporary review directory and its Git history,
GeoJSON duplicates, other state files, website material, and automation were not
vendored into this project.

## Inspection findings

- The all-India `districts` object contains 726 geometries grouped under 36
  distinct `st_nm` values.
- It contains 712 Polygon and 14 MultiPolygon district records.
- Maharashtra exists under stable source state code `27`.
- The retained Maharashtra topology contains 35 district geometries; Nashik
  exists under source district code `516`.
- That Maharashtra list has no `Mumbai Suburban` entry and still uses labels such
  as `Aurangabad` and `Osmanabad`. This is concrete evidence that the snapshot
  must not be treated as a current administrative register.
- The all-India `year` metadata is mixed: `2011_c` (623 records), `2012_c` (1),
  `2014_c` (2), `update2014` (29), `2015_c` (6), `2016_c` (41), `2017_c` (3),
  `2018` (7), `2019` (13), and `update2025` (1). The Maharashtra file is mostly
  `2011_c`, with one `update2014` record.

These counts validate the snapshot’s technical shape; they do not validate the
accuracy, currency, or legal status of its boundaries.

## Known licensing and provenance limitations

The upstream repository includes no licence file. Its README says the data was
not created by the repository owner, was curated from unspecified publicly
available internet sources for personal usage, and may contain
misrepresentations. It does not identify the original dataset, acquisition
method, chain of custody, redistribution rights, attribution terms, precision,
or boundary authority.

Consequences:

- Repository visibility and CDN links are not evidence of a redistribution
  licence.
- The original authorship and source accuracy cannot be audited from the
  repository.
- Mixed metadata vintages mean names and administrative boundaries may be stale.
- The generated assets inherit these limitations and are therefore marked
  `prototype-unverified`.
- Redistribution beyond this private prototype requires explicit rights review.

## Processing decisions

`npm run maps:build` performs the following deterministic steps:

1. Reads the pinned all-India and Maharashtra TopoJSON files from
   `scripts/maps/source/`.
2. Ignores the upstream prebuilt state object and groups all-India district
   geometries by normalised `st_nm`.
3. Uses shared TopoJSON arcs to merge each group into one state/UT geometry,
   removing internal district seams while retaining Polygon/MultiPolygon parts,
   holes, and islands.
4. Normalises display names and creates lowercase ASCII kebab-case stable IDs;
   source names and codes remain in the render assets.
5. Fits one reflected-Y Mercator projection to a centred `[-48, 48]` scene
   extent. The exact scale/translation is embedded in both outputs.
6. Applies the same projection to the individual Maharashtra districts.
7. Converts every feature to a uniform MultiPolygon schema and rounds projected
   coordinates to three decimals. No general-purpose line simplification is
   applied, avoiding silent loss of small islands or narrow coastal geometry.
8. Removes unused raw properties and exports minified, render-specific JSON.
9. Generates the SVG poster from the projected render geometry, including the
   same Maharashtra and Nashik shapes.
10. Fails if the snapshot does not produce 36 regions, Maharashtra, or Nashik.

Generated outputs:

- `public/data/maps/india-states.render.json`
- `public/data/maps/maharashtra-districts.render.json`
- `public/images/india-story-poster.svg`

The raw TopoJSON is never fetched or processed during a browser visit.

## Approval checklist for replacement data

- Confirm explicit reuse and redistribution terms.
- Record the authoritative publisher, dataset version, retrieval date, and file
  hashes.
- Compare the international outline and state/UT boundaries with current SoI
  material.
- Review Jammu and Kashmir, Ladakh, island groups, small UTs, names, and disputed
  boundary depiction explicitly.
- Re-run automated geometry checks and visual comparison at desktop and mobile
  sizes.
- Obtain the project owner’s boundary/content sign-off before changing the
  `boundaryStatus` value.
