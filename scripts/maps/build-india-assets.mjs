import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

import {
  ACQUISITION_DATE,
  countParts,
  createFallbackSvg,
  createGeometryBundle,
  createProjection,
  createRenderFeature,
  EXPECTED_REGION_COUNT,
  extractDistricts,
  geometryBounds,
  mergeStates,
  projectionMetadata,
  SOURCE_COMMIT,
  SOURCE_URL,
} from './map-pipeline.mjs'

const root = resolve(import.meta.dirname, '../..')
const source = (name) => resolve(import.meta.dirname, 'source', name)
const output = (name) => resolve(root, 'public', 'data', 'maps', name)

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'))
}

const indiaTopology = await readJson(source('india.topo.json'))
const maharashtraTopology = await readJson(source('maharashtra.topo.json'))

const stateFeatures = mergeStates(indiaTopology)
if (stateFeatures.length !== EXPECTED_REGION_COUNT) {
  throw new Error(
    `Expected ${EXPECTED_REGION_COUNT} states/UTs, found ${stateFeatures.length}`,
  )
}

const maharashtra = stateFeatures.find(
  (state) => state.properties.id === 'maharashtra',
)
if (!maharashtra)
  throw new Error('Maharashtra was not found in national topology')

const districtFeatures = extractDistricts(maharashtraTopology)
const nashik = districtFeatures.find(
  (district) => district.properties.id === 'nashik',
)
if (!nashik) throw new Error('Nashik was not found in Maharashtra topology')

const projection = createProjection(stateFeatures)
const states = stateFeatures.map((state) =>
  createRenderFeature(state, projection),
)
const districts = districtFeatures.map((district) =>
  createRenderFeature(district, projection),
)
const renderedMaharashtra = states.find((state) => state.id === 'maharashtra')
if (!renderedMaharashtra) {
  throw new Error('Maharashtra was not found after projection')
}
const nationalBounds = geometryBounds({
  type: 'MultiPolygon',
  coordinates: states.flatMap((state) => state.geometry.coordinates),
})

const commonMetadata = {
  schemaVersion: 2,
  sourceUrl: SOURCE_URL,
  sourceCommit: SOURCE_COMMIT,
  acquiredOn: ACQUISITION_DATE,
  boundaryStatus: 'prototype-unverified',
  projection: projectionMetadata(projection),
}

const nationalGeometry = createGeometryBundle(states, 1.8)
const districtGeometry = createGeometryBundle(districts, 0.82, 0.04)
const nationalGeometryGzip = gzipSync(nationalGeometry.buffer, { level: 9 })
const districtGeometryGzip = gzipSync(districtGeometry.buffer, { level: 9 })
const geometryMetadata = (file, bundle) => ({
  bufferFile: file,
  bufferBytes: bundle.buffer.byteLength,
  bufferSha256: createHash('sha256').update(bundle.buffer).digest('hex'),
  // Use a neutral extension so CDNs do not add Content-Encoding and cause the
  // browser to transparently inflate the payload before DecompressionStream.
  compressedBufferFile: `${file}.pack`,
  encoding: 'little-endian-float32-uint32',
  sourceCoordinateCount: bundle.sourceCoordinateCount,
})

const nationalAsset = {
  metadata: {
    ...commonMetadata,
    sourceFile: 'topojson/india.json',
    featureCount: states.length,
    bounds: nationalBounds,
    ...geometryMetadata('india-states.geometry.bin', nationalGeometry),
  },
  regions: nationalGeometry.regions,
}
const districtAsset = {
  metadata: {
    ...commonMetadata,
    sourceFile: 'topojson/states/maharashtra.json',
    featureCount: districts.length,
    parentRegionId: 'maharashtra',
    parentBounds: renderedMaharashtra.bounds,
    ...geometryMetadata('maharashtra-districts.geometry.bin', districtGeometry),
  },
  districts: districtGeometry.regions,
}

const nationalJson = JSON.stringify(nationalAsset)
const districtJson = JSON.stringify(districtAsset)
const posterSvg = createFallbackSvg(states, districts, nationalBounds)

await mkdir(resolve(root, 'public', 'data', 'maps'), { recursive: true })
await mkdir(resolve(root, 'public', 'images'), { recursive: true })
await writeFile(output('india-states.render.json'), nationalJson)
await writeFile(output('maharashtra-districts.render.json'), districtJson)
await writeFile(output('india-states.geometry.bin'), nationalGeometry.buffer)
await writeFile(output('india-states.geometry.bin.pack'), nationalGeometryGzip)
await writeFile(
  output('maharashtra-districts.geometry.bin'),
  districtGeometry.buffer,
)
await writeFile(
  output('maharashtra-districts.geometry.bin.pack'),
  districtGeometryGzip,
)
await writeFile(
  resolve(root, 'public', 'images', 'india-story-poster.svg'),
  posterSvg,
)

const nationalSize = (await stat(output('india-states.render.json'))).size
const districtSize = (await stat(output('maharashtra-districts.render.json')))
  .size
const nationalGeometrySize = (await stat(output('india-states.geometry.bin')))
  .size
const districtGeometrySize = (
  await stat(output('maharashtra-districts.geometry.bin'))
).size
const posterSize = (
  await stat(resolve(root, 'public', 'images', 'india-story-poster.svg'))
).size
const nationalGzipSize = gzipSync(nationalJson).length
const districtGzipSize = gzipSync(districtJson).length

if (nationalGzipSize > 200 * 1024) {
  throw new Error('National render asset exceeds 200 KiB gzip budget')
}
if (districtGzipSize > 50 * 1024) {
  throw new Error('Maharashtra render asset exceeds 50 KiB gzip budget')
}

console.log(
  JSON.stringify(
    {
      regions: states.length,
      districts: districts.length,
      maharashtra: {
        id: maharashtra.properties.id,
        ...countParts(renderedMaharashtra.geometry),
      },
      nashik: { id: nashik.properties.id },
      bounds: nationalBounds,
      files: {
        nationalBytes: nationalSize,
        nationalGzipBytes: nationalGzipSize,
        maharashtraBytes: districtSize,
        maharashtraGzipBytes: districtGzipSize,
        nationalGeometryBytes: nationalGeometrySize,
        nationalGeometryGzipBytes: nationalGeometryGzip.byteLength,
        maharashtraGeometryBytes: districtGeometrySize,
        maharashtraGeometryGzipBytes: districtGeometryGzip.byteLength,
        posterBytes: posterSize,
      },
    },
    null,
    2,
  ),
)
