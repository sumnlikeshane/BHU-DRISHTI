# Landing map startup measurements

Measured on 2026-09-08 with Node 26.0.0 and Vite 8.2.2. Times are local
development measurements and are intended for before/after comparison, not as
device-independent budgets.

## Runtime geometry

Run `npm run maps:benchmark` to repeat this comparison. It measures 15 warm
runs after two warmups and reports the median.

| Work                       |                              Before |                    After |
| -------------------------- | ----------------------------------: | -----------------------: |
| Opening geometry           | 16.70 ms (36 states + 35 districts) | 0.61 ms (36 states only) |
| Deferred district geometry |                      Included above | 0.57 ms at progress 0.40 |

The browser no longer runs Three.js `ExtrudeGeometry` or Earcut triangulation
for every region. The build pipeline preserves every projected coordinate,
normalizes ring winding, precomputes lid triangle indices, and stores Float32
coordinates plus Uint32 triangle indices in deterministic buffers. Runtime work
is a linear typed-array expansion into indexed lids, flat side walls, and indexed
outlines.

No boundary simplification was introduced. The projection still rounds to the
existing 0.001 map-unit precision, all polygon rings and holes are represented,
and the generated manifest records 5,253 national source coordinates. Pipeline
tests verify stable IDs, islands, holes, buffer hashes, descriptor bounds,
Maharashtra, and Nashik.

Exact duplicate source rows are removed before state merging. This prevents the
duplicate Chandigarh and Lakshadweep polygons from cancelling into empty
geometries while leaving distinct districts with reused source codes intact.

## Geometry and poster transfer

| Asset requested for opening |                   Before |                                                    After |
| --------------------------- | -----------------------: | -------------------------------------------------------: |
| National metadata/geometry  |            31,220 B gzip |           3,319 B metadata gzip + 45,500 B packed buffer |
| Maharashtra districts       | 42,569 B gzip at startup | Deferred: 2,954 B metadata gzip + 67,219 B packed buffer |
| Neutral SVG poster          |         about 164 KB raw |                                             65,494 B raw |

Initial geometry transfer falls from 73,789 B to 48,819 B gzip-equivalent
because districts are no longer requested during the India chapter. Total
packed geometry transfer is larger than the old highly-compressible coordinate
JSON, but removes synchronous triangulation and contains the precomputed render
topology. The poster is about 60% smaller because its permanently hidden
district paths were removed; the visible national outline is unchanged.

The uncompressed `.bin` files remain as a compatibility fallback. Browsers with
`DecompressionStream` request the checked-in `.pack` files. The `.pack` suffix
prevents static hosts from adding `Content-Encoding` and causing an accidental
double decompression.

## Production build

| Output               |                         Before |                          After |
| -------------------- | -----------------------------: | -----------------------------: |
| Main JS              | 354.27 KB raw / 119.60 KB gzip | 354.64 KB raw / 119.74 KB gzip |
| IndiaScene JS        | 874.50 KB raw / 233.64 KB gzip | 877.73 KB raw / 234.61 KB gzip |
| Vite build phase     |                         201 ms |                         200 ms |
| Full `npm run build` |                         2.21 s |                         1.80 s |

The scene JavaScript remains dominated by Three.js and React Three Fiber. The
startup improvement comes from an immediate poster, lower opening geometry
transfer, elimination of redundant context probing, deferred layers, and much
less synchronous geometry work rather than disguising the vendor cost through
chunk renaming. React Strict Mode remains enabled.

## Cold development loading

Measurements below used a fresh Vite process and an empty `node_modules/.vite`
cache. Requests were made sequentially to isolate server transform latency from
browser scheduling.

| Milestone                              | No warmup | With targeted warmup |
| -------------------------------------- | --------: | -------------------: |
| Dev server ready                       |    208 ms |               252 ms |
| `/` response                           |  99.65 ms |             22.41 ms |
| `main.tsx`                             |  37.52 ms |              1.06 ms |
| `App.tsx`                              |  96.92 ms |              0.85 ms |
| `IndiaScene.tsx`                       |   2.45 ms |              0.70 ms |
| React Three Fiber optimized dependency |  30.60 ms |             19.27 ms |

The measured reduction supports the two-file `server.warmup.clientFiles`
configuration in `vite.config.ts`. No additional `optimizeDeps` list was added;
Vite already discovers and prebundles Three.js and React Three Fiber.

## Development performance marks

Development builds emit these one-time marks:

- `bhu-map:app-start`
- `bhu-map:scene-module-loaded`
- `bhu-map:renderer-created`
- `bhu-map:map-data-available`
- `bhu-map:national-geometry-ready`
- `bhu-map:first-webgl-frame-painted`
- `bhu-map:district-geometry-ready`

Inspect a cold run with:

```js
performance
  .getEntriesByType('mark')
  .filter(({ name }) => name.startsWith('bhu-map:'))
  .map(({ name, startTime }) => ({ name, startTime }))
```

The poster is preloaded and remains visible through scene-module loading, asset
fetching, renderer creation, geometry hydration, and the first completed WebGL
frame. District data begins loading at story progress 0.40, before its 0.48
reveal; site markers mount at 0.70, before their 0.76 reveal. Mounted layers are
never discarded when the user scrolls backward.
