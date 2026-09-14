import { geoMercator, geoPath } from 'd3-geo'
import { ShapeUtils, Vector2 } from 'three'
import { feature, merge } from 'topojson-client'

export const SOURCE_COMMIT = '273a91960b2317c8431e562942293de959e2bd68'
export const SOURCE_URL = 'https://github.com/udit-001/india-maps-data.git'
export const ACQUISITION_DATE = '2026-09-08'
export const EXPECTED_REGION_COUNT = 36

const NAME_OVERRIDES = new Map([
  ['orissa', 'Odisha'],
  ['uttaranchal', 'Uttarakhand'],
  ['nct of delhi', 'Delhi'],
  ['andaman & nicobar islands', 'Andaman and Nicobar Islands'],
  [
    'dadra & nagar haveli and daman & diu',
    'Dadra and Nagar Haveli and Daman and Diu',
  ],
])

export function normalizeName(value) {
  const clean = String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
  const override = NAME_OVERRIDES.get(clean.toLowerCase())
  if (override) return override
  return clean.replace(/\b\w/g, (character) => character.toUpperCase())
}

export function stableId(value) {
  return normalizeName(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function toMultiPolygon(geometry) {
  if (geometry.type === 'Polygon') {
    return { type: 'MultiPolygon', coordinates: [geometry.coordinates] }
  }
  if (geometry.type === 'MultiPolygon') return geometry
  throw new Error(`Unsupported geometry type: ${geometry.type}`)
}

export function projectGeometry(geometry, projection, precision = 3) {
  const scale = 10 ** precision
  const round = (value) => Math.round(value * scale) / scale
  const projectRing = (ring) =>
    ring.map((coordinate) => {
      const projected = projection(coordinate)
      if (!projected) throw new Error(`Projection failed for ${coordinate}`)
      return [round(projected[0]), round(projected[1])]
    })

  const multiPolygon = toMultiPolygon(geometry)
  return {
    type: 'MultiPolygon',
    coordinates: multiPolygon.coordinates.map((polygon) =>
      polygon.map(projectRing),
    ),
  }
}

export function geometryBounds(geometry) {
  const points = geometry.coordinates.flat(2)
  return points.reduce(
    (bounds, point) => [
      [Math.min(bounds[0][0], point[0]), Math.min(bounds[0][1], point[1])],
      [Math.max(bounds[1][0], point[0]), Math.max(bounds[1][1], point[1])],
    ],
    [
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
      [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    ],
  )
}

export function geometryCentroid(geometry) {
  const path = geoPath()
  return path.centroid(geometry)
}

function geometryCollection(topology, objectName = 'districts') {
  const collection = topology.objects?.[objectName]
  if (!collection || collection.type !== 'GeometryCollection') {
    throw new Error(`Expected TopoJSON GeometryCollection '${objectName}'`)
  }
  return collection
}

export function groupDistrictsByState(topology) {
  const groups = new Map()
  const seen = new Set()
  for (const district of geometryCollection(topology).geometries) {
    const stateName = normalizeName(district.properties?.st_nm)
    if (!stateName) throw new Error('District is missing st_nm')
    const districtKey = [
      district.properties?.st_code,
      district.properties?.dt_code,
      district.properties?.district,
    ].join(':')
    if (seen.has(districtKey)) continue
    seen.add(districtKey)
    const group = groups.get(stateName) ?? []
    group.push(district)
    groups.set(stateName, group)
  }
  return groups
}

export function mergeStates(topology) {
  return [...groupDistrictsByState(topology)]
    .map(([name, districts]) => ({
      type: 'Feature',
      properties: {
        id: stableId(name),
        name,
        sourceName: districts[0].properties?.st_nm ?? name,
        sourceCode: String(districts[0].properties?.st_code ?? ''),
        districtCount: districts.length,
      },
      geometry: merge(topology, districts),
    }))
    .sort((a, b) => a.properties.id.localeCompare(b.properties.id))
}

export function extractDistricts(topology) {
  const collection = geometryCollection(topology)
  const collectionFeature = feature(topology, collection)
  const features = collectionFeature.features ?? [collectionFeature]

  return features
    .map((district) => {
      const name = normalizeName(district.properties?.district)
      return {
        type: 'Feature',
        properties: {
          id: stableId(name),
          name,
          sourceName: district.properties?.district ?? name,
          sourceCode: String(district.properties?.dt_code ?? ''),
          sourceState: normalizeName(district.properties?.st_nm),
        },
        geometry: toMultiPolygon(district.geometry),
      }
    })
    .sort((a, b) => a.properties.id.localeCompare(b.properties.id))
}

export function createProjection(states) {
  const collection = { type: 'FeatureCollection', features: states }
  return geoMercator()
    .reflectY(true)
    .fitExtent(
      [
        [-48, -48],
        [48, 48],
      ],
      collection,
    )
}

export function createRenderFeature(sourceFeature, projection) {
  const geometry = projectGeometry(sourceFeature.geometry, projection)
  const bounds = geometryBounds(geometry)
  const centroid = geometryCentroid(geometry).map(
    (coordinate) => Math.round(coordinate * 1000) / 1000,
  )
  return {
    ...sourceFeature.properties,
    geometry,
    bounds,
    centroid,
  }
}

export function projectionMetadata(projection) {
  return {
    type: 'd3-geo/geoMercator',
    scale: projection.scale(),
    translate: projection.translate(),
    reflectY: true,
    precision: 3,
    targetExtent: [
      [-48, -48],
      [48, 48],
    ],
  }
}

export function countParts(geometry) {
  const polygons = geometry.coordinates.length
  const rings = geometry.coordinates.reduce(
    (total, polygon) => total + polygon.length,
    0,
  )
  const holes = geometry.coordinates.reduce(
    (total, polygon) => total + Math.max(0, polygon.length - 1),
    0,
  )
  return { polygons, rings, holes }
}

function appendTypedArray(parts, typedArray, byteOffset) {
  const bytes = Buffer.from(
    typedArray.buffer,
    typedArray.byteOffset,
    typedArray.byteLength,
  )
  parts.push(bytes)
  return {
    byteOffset,
    count: typedArray.length,
  }
}

function withoutClosingPoint(ring) {
  if (ring.length < 2) return ring
  const first = ring[0]
  const last = ring[ring.length - 1]
  return first[0] === last[0] && first[1] === last[1] ? ring.slice(0, -1) : ring
}

export function triangulateGeometry(geometry) {
  const coordinates = []
  const triangles = []
  const rings = []

  for (const polygon of geometry.coordinates) {
    const normalized = polygon.map((ring) =>
      withoutClosingPoint(ring).map(([x, y]) => new Vector2(x, y)),
    )
    const contour = normalized[0] ?? []
    const holes = normalized.slice(1)
    if (!ShapeUtils.isClockWise(contour)) contour.reverse()
    holes.forEach((hole) => {
      if (ShapeUtils.isClockWise(hole)) hole.reverse()
    })

    const polygonOffset = coordinates.length / 2
    const flattened = contour.concat(...holes)
    flattened.forEach(({ x, y }) => coordinates.push(x, y))

    let ringOffset = polygonOffset
    ;[contour, ...holes].forEach((ring) => {
      rings.push({ start: ringOffset, count: ring.length })
      ringOffset += ring.length
    })
    ShapeUtils.triangulateShape(contour, holes).forEach((face) => {
      triangles.push(
        face[0] + polygonOffset,
        face[1] + polygonOffset,
        face[2] + polygonOffset,
      )
    })
  }

  return { coordinates, rings, triangles }
}

export function createGeometryBundle(regions, depth, outlineLift = 0.025) {
  const parts = []
  let byteOffset = 0
  let sourceCoordinateCount = 0
  const bundledRegions = regions.map((region) => {
    const triangulated = triangulateGeometry(region.geometry)
    const coordinates = Float32Array.from(triangulated.coordinates)
    const triangles = Uint32Array.from(triangulated.triangles)
    sourceCoordinateCount += region.geometry.coordinates.flat(2).length

    const position = appendTypedArray(parts, coordinates, byteOffset)
    byteOffset += coordinates.byteLength
    const triangleIndex = appendTypedArray(parts, triangles, byteOffset)
    byteOffset += triangles.byteLength

    const { geometry: _geometry, ...metadata } = region
    return {
      ...metadata,
      renderGeometry: {
        position,
        triangleIndex,
        rings: triangulated.rings,
        depth,
        outlineElevation: depth + outlineLift,
      },
    }
  })

  return {
    buffer: Buffer.concat(parts),
    regions: bundledRegions,
    sourceCoordinateCount,
  }
}

function pathForGeometry(geometry, bounds, padding) {
  const [[minX, minY], [maxX, maxY]] = bounds
  const height = maxY - minY
  const coordinate = ([x, y]) =>
    `${(x - minX + padding).toFixed(2)},${(height - (y - minY) + padding).toFixed(2)}`

  return geometry.coordinates
    .map((polygon) =>
      polygon.map((ring) => `M${ring.map(coordinate).join('L')}Z`).join(''),
    )
    .join('')
}

export function createFallbackSvg(states, districts, bounds) {
  const padding = 3
  const [[minX, minY], [maxX, maxY]] = bounds
  const width = maxX - minX + padding * 2
  const height = maxY - minY + padding * 2
  const statePaths = states
    .map(
      (state) =>
        `  <path class="state${state.id === 'maharashtra' ? ' maharashtra' : ''}" data-region-id="${state.id}" d="${pathForGeometry(state.geometry, bounds, padding)}" />`,
    )
    .join('\n')
  // District paths are intentionally omitted: the neutral poster never displays
  // them, and keeping invisible paths roughly doubled the critical image bytes.
  void districts

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(2)} ${height.toFixed(2)}" role="img" aria-labelledby="title description">
  <title id="title">Prototype map of India overview</title>
  <desc id="description">Illustrative administrative geometry for the BHU-DRISHTI interface prototype. Not an officially verified political map.</desc>
  <style>
    .state { fill: #88a992; stroke: #f2f6f3; stroke-width: .24; stroke-linejoin: round; fill-rule: evenodd; }
  </style>
${statePaths}
</svg>
`
}
