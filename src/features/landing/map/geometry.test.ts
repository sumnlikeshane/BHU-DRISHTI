import { describe, expect, it } from 'vitest'

import {
  createBatchedExtrudedGeometry,
  createBatchedOutlineGeometry,
  createExtrudedGeometry,
  createOutlineGeometry,
} from './geometry'
import type { PackedRenderGeometry } from './types'

function fixture() {
  const positions = new Float32Array([0, 0, 8, 0, 0, 8])
  const triangles = new Uint32Array([0, 1, 2])
  const buffer = new ArrayBuffer(positions.byteLength + triangles.byteLength)
  new Float32Array(buffer, 0, positions.length).set(positions)
  new Uint32Array(buffer, positions.byteLength, triangles.length).set(triangles)
  const descriptor: PackedRenderGeometry = {
    position: { byteOffset: 0, count: positions.length },
    triangleIndex: {
      byteOffset: positions.byteLength,
      count: triangles.length,
    },
    rings: [{ start: 0, count: 3 }],
    depth: 1.8,
    outlineElevation: 1.825,
  }
  return { buffer, descriptor }
}

describe('packed Three.js geometry hydration', () => {
  it('builds indexed lids and flat side walls without browser triangulation', () => {
    const { buffer, descriptor } = fixture()
    const geometry = createExtrudedGeometry(descriptor, buffer)

    expect(geometry.getAttribute('position').count).toBe(18)
    expect(geometry.getAttribute('normal').count).toBe(18)
    expect(geometry.getIndex()?.count).toBe(24)
    expect(geometry.groups).toEqual([
      { start: 0, count: 6, materialIndex: 0 },
      { start: 6, count: 18, materialIndex: 1 },
    ])
  })

  it('reuses packed ring points for an indexed elevated outline', () => {
    const { buffer, descriptor } = fixture()
    const outline = createOutlineGeometry(descriptor, buffer)

    expect(outline.getAttribute('position').count).toBe(3)
    expect(outline.getIndex()?.count).toBe(6)
    expect(outline.getAttribute('position').getZ(0)).toBeCloseTo(1.825)
  })

  it('combines regions into one upload while retaining lid and side groups', () => {
    const { buffer, descriptor } = fixture()
    const geometry = createBatchedExtrudedGeometry(
      [descriptor, descriptor],
      buffer,
    )
    const outline = createBatchedOutlineGeometry(
      [descriptor, descriptor],
      buffer,
    )

    expect(geometry.getAttribute('position').count).toBe(36)
    expect(geometry.getIndex()?.count).toBe(48)
    expect(geometry.groups).toEqual([
      { start: 0, count: 12, materialIndex: 0 },
      { start: 12, count: 36, materialIndex: 1 },
    ])
    expect(Math.max(...(geometry.getIndex()?.array ?? []))).toBeLessThan(36)
    expect(outline.getAttribute('position').count).toBe(6)
    expect(outline.getIndex()?.count).toBe(12)
  })
})
