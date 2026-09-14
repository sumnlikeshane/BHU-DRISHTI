import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

import { describe, expect, it } from 'vitest'

import {
  EXPECTED_REGION_COUNT,
  createFallbackSvg,
  createGeometryBundle,
  geometryBounds,
  groupDistrictsByState,
  mergeStates,
  projectGeometry,
  stableId,
  triangulateGeometry,
} from './map-pipeline.mjs'

const readJson = async (path) =>
  JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'))

describe('map preprocessing', () => {
  it('produces the expected stable state and UT output', async () => {
    const topology = await readJson('./source/india.topo.json')
    const groups = groupDistrictsByState(topology)
    const states = mergeStates(topology)

    expect(groups.size).toBe(EXPECTED_REGION_COUNT)
    expect(states).toHaveLength(EXPECTED_REGION_COUNT)
    expect(states.map((state) => state.properties.id)).toEqual(
      expect.arrayContaining([
        'andaman-and-nicobar-islands',
        'dadra-and-nagar-haveli-and-daman-and-diu',
        'lakshadweep',
        'maharashtra',
      ]),
    )
    expect(new Set(states.map((state) => state.properties.id)).size).toBe(
      EXPECTED_REGION_COUNT,
    )
    expect(states.every((state) => state.geometry.coordinates.length > 0)).toBe(
      true,
    )
  })

  it('converts Polygon and MultiPolygon to one render schema', () => {
    const identity = ([x, y]) => [x, y]
    const polygon = projectGeometry(
      {
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [4, 0],
            [4, 4],
            [0, 0],
          ],
        ],
      },
      identity,
    )
    const multiPolygon = projectGeometry(
      {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [0, 0],
              [1, 0],
              [0, 1],
              [0, 0],
            ],
          ],
          [
            [
              [10, 10],
              [11, 10],
              [10, 11],
              [10, 10],
            ],
          ],
        ],
      },
      identity,
    )

    expect(polygon.type).toBe('MultiPolygon')
    expect(polygon.coordinates).toHaveLength(1)
    expect(multiPolygon.coordinates).toHaveLength(2)
  })

  it('preserves holes and disconnected island parts', () => {
    const identity = ([x, y]) => [x, y]
    const geometry = projectGeometry(
      {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [0, 0],
              [8, 0],
              [8, 8],
              [0, 0],
            ],
            [
              [2, 2],
              [3, 2],
              [2, 3],
              [2, 2],
            ],
          ],
          [
            [
              [20, 20],
              [21, 20],
              [20, 21],
              [20, 20],
            ],
          ],
        ],
      },
      identity,
    )

    expect(geometry.coordinates).toHaveLength(2)
    expect(geometry.coordinates[0]).toHaveLength(2)
    expect(geometry.coordinates[1]).toHaveLength(1)
    const triangulated = triangulateGeometry(geometry)
    expect(triangulated.rings).toHaveLength(3)
    expect(triangulated.coordinates).toHaveLength(18)
    expect(triangulated.triangles.length).toBeGreaterThan(0)
  })

  it('uses deterministic name IDs and projected bounds', async () => {
    const national = await readJson(
      '../../public/data/maps/india-states.render.json',
    )
    expect(stableId('Dadra & Nagar Haveli and Daman & Diu')).toBe(
      'dadra-and-nagar-haveli-and-daman-and-diu',
    )
    expect(national.metadata.bounds).toEqual([
      [-42.354, -48],
      [42.354, 48],
    ])
    expect(national.metadata.sourceCoordinateCount).toBeGreaterThan(5_000)
  })

  it('finds Maharashtra and Nashik by stable ID', async () => {
    const national = await readJson(
      '../../public/data/maps/india-states.render.json',
    )
    const maharashtra = await readJson(
      '../../public/data/maps/maharashtra-districts.render.json',
    )

    expect(
      national.regions.find((region) => region.id === 'maharashtra'),
    ).toMatchObject({ sourceCode: '27' })
    expect(
      maharashtra.districts.find((district) => district.id === 'nashik'),
    ).toMatchObject({ sourceCode: '516', sourceState: 'Maharashtra' })
  })

  it('keeps the non-interactive poster nationally neutral', () => {
    const geometry = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [0, 0],
            [2, 0],
            [0, 2],
            [0, 0],
          ],
        ],
      ],
    }
    const poster = createFallbackSvg(
      [{ id: 'maharashtra', geometry }],
      [{ id: 'nashik', geometry }],
      [
        [0, 0],
        [2, 2],
      ],
    )

    expect(poster).toContain('Prototype map of India overview')
    expect(poster).not.toContain('data-district-id')
    expect(poster).not.toContain('.maharashtra {')
    expect(poster).not.toContain('.nashik {')
  })

  it('builds deterministic compact buffers with render metadata', async () => {
    const topology = await readJson('./source/india.topo.json')
    const stateFeatures = mergeStates(topology)
    const projection = ([x, y]) => [x, y]
    const regions = stateFeatures.slice(0, 2).map((state) => ({
      ...state.properties,
      geometry: projectGeometry(state.geometry, projection),
      bounds: [
        [0, 0],
        [1, 1],
      ],
      centroid: [0.5, 0.5],
    }))
    const first = createGeometryBundle(regions, 1.8)
    const second = createGeometryBundle(regions, 1.8)
    const digest = (buffer) => createHash('sha256').update(buffer).digest('hex')

    expect(digest(first.buffer)).toBe(digest(second.buffer))
    expect(first.regions).toHaveLength(2)
    expect(first.regions[0]).not.toHaveProperty('geometry')
    expect(first.regions[0].renderGeometry).toMatchObject({
      depth: 1.8,
      position: { byteOffset: 0 },
    })
    expect(first.regions[0].renderGeometry.triangleIndex.count).toBeGreaterThan(
      0,
    )
  })

  it('matches checked-in buffers to their manifests and keeps ranges in bounds', async () => {
    for (const [manifestPath, bufferPath, collection] of [
      [
        '../../public/data/maps/india-states.render.json',
        '../../public/data/maps/india-states.geometry.bin',
        'regions',
      ],
      [
        '../../public/data/maps/maharashtra-districts.render.json',
        '../../public/data/maps/maharashtra-districts.geometry.bin',
        'districts',
      ],
    ]) {
      const manifest = await readJson(manifestPath)
      const buffer = await readFile(new URL(bufferPath, import.meta.url))
      expect(buffer.byteLength).toBe(manifest.metadata.bufferBytes)
      expect(createHash('sha256').update(buffer).digest('hex')).toBe(
        manifest.metadata.bufferSha256,
      )
      manifest[collection].forEach((region) => {
        const geometry = region.renderGeometry
        expect(
          geometry.position.byteOffset + geometry.position.count * 4,
        ).toBeLessThanOrEqual(buffer.byteLength)
        expect(
          geometry.triangleIndex.byteOffset + geometry.triangleIndex.count * 4,
        ).toBeLessThanOrEqual(buffer.byteLength)
        expect(geometry.rings.length).toBeGreaterThan(0)
      })
    }
  })
})
