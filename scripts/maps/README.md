# Map asset pipeline

`npm run maps:build` converts the pinned prototype TopoJSON in `source/` into the
small, projected assets used by the geometry spike.

The pipeline deliberately runs outside the browser. It merges all-India district
geometries into state/UT pieces, projects both outputs through one Mercator
transform, rounds coordinates to three decimals, and generates the SVG fallback
from those same render features.

The build fails unless it finds 36 state/UT regions, Maharashtra, and Nashik.
Review `docs/data-provenance.md` before replacing the source snapshot. These
boundaries are for prototyping only and are not approved for public release.
