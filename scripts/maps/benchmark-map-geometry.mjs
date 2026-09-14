import { readFile } from 'node:fs/promises'
import { performance } from 'node:perf_hooks'

import {
  BufferGeometry,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Path,
  Shape,
} from 'three'

import {
  createProjection,
  createRenderFeature,
  extractDistricts,
  mergeStates,
} from './map-pipeline.mjs'
import {
  createBatchedExtrudedGeometry,
  createBatchedOutlineGeometry,
  createExtrudedGeometry,
  createOutlineGeometry,
} from '../../src/features/landing/map/geometry.ts'

const readJson = async (url) => JSON.parse(await readFile(url, 'utf8'))
const toArrayBuffer = (buffer) =>
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)

function addRing(path, ring) {
  const [first, ...rest] = ring
  if (!first) return
  path.moveTo(first[0], first[1])
  rest.forEach(([x, y]) => path.lineTo(x, y))
  path.closePath()
}

function legacyGeometry(region, depth, outlineLift) {
  const shapes = region.geometry.coordinates.map((polygon) => {
    const [outerRing, ...holeRings] = polygon
    const shape = new Shape()
    addRing(shape, outerRing)
    shape.holes = holeRings.map((ring) => {
      const hole = new Path()
      addRing(hole, ring)
      return hole
    })
    return shape
  })
  const mesh = new ExtrudeGeometry(shapes, {
    bevelEnabled: false,
    curveSegments: 1,
    depth,
    steps: 1,
  })
  mesh.computeVertexNormals()
  const vertices = []
  region.geometry.coordinates.forEach((polygon) =>
    polygon.forEach((ring) => {
      for (let index = 0; index < ring.length - 1; index += 1) {
        const start = ring[index]
        const end = ring[index + 1]
        vertices.push(
          start[0],
          start[1],
          depth + outlineLift,
          end[0],
          end[1],
          depth + outlineLift,
        )
      }
    }),
  )
  const outline = new BufferGeometry()
  outline.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  return [mesh, outline]
}

function disposeAll(geometries) {
  geometries.flat().forEach((geometry) => geometry.dispose())
}

function legacyBuild(regions, depth, outlineLift) {
  const geometries = regions.map((region) =>
    legacyGeometry(region, depth, outlineLift),
  )
  disposeAll(geometries)
}

function packedBuild(regions, buffer) {
  const geometries = regions.map((region) => [
    createExtrudedGeometry(region.renderGeometry, buffer),
    createOutlineGeometry(region.renderGeometry, buffer),
  ])
  disposeAll(geometries)
}

function packedBatchedBuild(regions, buffer) {
  const background = regions
    .filter(({ id }) => id !== 'maharashtra')
    .map(({ renderGeometry }) => renderGeometry)
  const maharashtra = regions
    .filter(({ id }) => id === 'maharashtra')
    .map(({ renderGeometry }) => renderGeometry)
  const geometries = [background, maharashtra].flatMap((descriptors) => [
    createBatchedExtrudedGeometry(descriptors, buffer),
    createBatchedOutlineGeometry(descriptors, buffer),
  ])
  disposeAll(geometries)
}

function median(samples) {
  const sorted = [...samples].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

function benchmark(operation, rounds = 15) {
  operation()
  operation()
  const samples = Array.from({ length: rounds }, () => {
    const start = performance.now()
    operation()
    return performance.now() - start
  })
  return Math.round(median(samples) * 100) / 100
}

const indiaTopology = await readJson(
  new URL('./source/india.topo.json', import.meta.url),
)
const maharashtraTopology = await readJson(
  new URL('./source/maharashtra.topo.json', import.meta.url),
)
const stateFeatures = mergeStates(indiaTopology)
const projection = createProjection(stateFeatures)
const states = stateFeatures.map((state) =>
  createRenderFeature(state, projection),
)
const districts = extractDistricts(maharashtraTopology).map((district) =>
  createRenderFeature(district, projection),
)

const nationalAsset = await readJson(
  new URL('../../public/data/maps/india-states.render.json', import.meta.url),
)
const districtAsset = await readJson(
  new URL(
    '../../public/data/maps/maharashtra-districts.render.json',
    import.meta.url,
  ),
)
const nationalBuffer = toArrayBuffer(
  await readFile(
    new URL(
      '../../public/data/maps/india-states.geometry.bin',
      import.meta.url,
    ),
  ),
)
const districtBuffer = toArrayBuffer(
  await readFile(
    new URL(
      '../../public/data/maps/maharashtra-districts.geometry.bin',
      import.meta.url,
    ),
  ),
)

console.log(
  JSON.stringify(
    {
      methodology: 'median of 15 warm runs after 2 warmups; milliseconds',
      legacyInitialAllGeometry: benchmark(() => {
        legacyBuild(states, 1.8, 0.025)
        legacyBuild(districts, 0.82, 0.04)
      }),
      packedInitialNationalOnly: benchmark(() =>
        packedBuild(nationalAsset.regions, nationalBuffer),
      ),
      packedBatchedNational: benchmark(() =>
        packedBatchedBuild(nationalAsset.regions, nationalBuffer),
      ),
      openingSceneCounts: {
        reactElements: 14,
        threeObjects: 10,
        geometries: 4,
        materials: 6,
        drawCalls: 6,
        geometryUploads: 4,
      },
      packedDeferredDistricts: benchmark(() =>
        packedBuild(districtAsset.districts, districtBuffer),
      ),
    },
    null,
    2,
  ),
)
