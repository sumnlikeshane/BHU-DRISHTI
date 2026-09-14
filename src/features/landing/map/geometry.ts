import { BufferAttribute, BufferGeometry } from 'three'

import type { PackedRenderGeometry } from './types'

interface GeometryTotals {
  edgeCount: number
  lidIndexCount: number
  pointCount: number
  vertexCount: number
}

function getGeometryTotals(
  descriptors: PackedRenderGeometry[],
): GeometryTotals {
  return descriptors.reduce(
    (totals, descriptor) => {
      const pointCount = descriptor.position.count / 2
      const edgeCount = descriptor.rings.reduce(
        (total, ring) => total + ring.count,
        0,
      )
      totals.pointCount += pointCount
      totals.edgeCount += edgeCount
      totals.vertexCount += pointCount * 2 + edgeCount * 4
      totals.lidIndexCount += descriptor.triangleIndex.count * 2
      return totals
    },
    { edgeCount: 0, lidIndexCount: 0, pointCount: 0, vertexCount: 0 },
  )
}

export function createExtrudedGeometry(
  descriptor: PackedRenderGeometry,
  buffer: ArrayBuffer,
) {
  return createBatchedExtrudedGeometry([descriptor], buffer)
}

export function createBatchedExtrudedGeometry(
  descriptors: PackedRenderGeometry[],
  buffer: ArrayBuffer,
) {
  const totals = getGeometryTotals(descriptors)
  const { lidIndexCount, vertexCount } = totals
  const positions = new Float32Array(vertexCount * 3)
  const normals = new Float32Array(vertexCount * 3)
  const IndexArray = vertexCount <= 65_535 ? Uint16Array : Uint32Array
  const indices = new IndexArray(lidIndexCount + totals.edgeCount * 6)

  const writeVertex = (
    targetIndex: number,
    coordinates: Float32Array,
    sourceIndex: number,
    z: number,
    normalX: number,
    normalY: number,
    normalZ: number,
  ) => {
    const targetOffset = targetIndex * 3
    const sourceOffset = sourceIndex * 2
    positions[targetOffset] = coordinates[sourceOffset]
    positions[targetOffset + 1] = coordinates[sourceOffset + 1]
    positions[targetOffset + 2] = z
    normals[targetOffset] = normalX
    normals[targetOffset + 1] = normalY
    normals[targetOffset + 2] = normalZ
  }

  let lidIndexCursor = 0
  let sideIndexCursor = lidIndexCount
  let vertexOffset = 0
  descriptors.forEach((descriptor) => {
    const coordinates = new Float32Array(
      buffer,
      descriptor.position.byteOffset,
      descriptor.position.count,
    )
    const triangles = new Uint32Array(
      buffer,
      descriptor.triangleIndex.byteOffset,
      descriptor.triangleIndex.count,
    )
    const pointCount = coordinates.length / 2

    for (let point = 0; point < pointCount; point += 1) {
      writeVertex(vertexOffset + point, coordinates, point, 0, 0, 0, -1)
      writeVertex(
        vertexOffset + point + pointCount,
        coordinates,
        point,
        descriptor.depth,
        0,
        0,
        1,
      )
    }
    for (let face = 0; face < triangles.length; face += 3) {
      const a = triangles[face] + vertexOffset
      const b = triangles[face + 1] + vertexOffset
      const c = triangles[face + 2] + vertexOffset
      indices[lidIndexCursor++] = c
      indices[lidIndexCursor++] = b
      indices[lidIndexCursor++] = a
      indices[lidIndexCursor++] = a + pointCount
      indices[lidIndexCursor++] = b + pointCount
      indices[lidIndexCursor++] = c + pointCount
    }

    let sideVertexCursor = vertexOffset + pointCount * 2
    descriptor.rings.forEach((ring) => {
      for (let index = ring.count - 1; index >= 0; index -= 1) {
        const current = ring.start + index
        const previous = ring.start + (index === 0 ? ring.count - 1 : index - 1)
        const currentOffset = current * 2
        const previousOffset = previous * 2
        const edgeX = coordinates[previousOffset] - coordinates[currentOffset]
        const edgeY =
          coordinates[previousOffset + 1] - coordinates[currentOffset + 1]
        const length = Math.hypot(edgeX, edgeY) || 1
        const normalX = edgeY / length
        const normalY = -edgeX / length
        const base = sideVertexCursor
        writeVertex(base, coordinates, current, 0, normalX, normalY, 0)
        writeVertex(base + 1, coordinates, previous, 0, normalX, normalY, 0)
        writeVertex(
          base + 2,
          coordinates,
          previous,
          descriptor.depth,
          normalX,
          normalY,
          0,
        )
        writeVertex(
          base + 3,
          coordinates,
          current,
          descriptor.depth,
          normalX,
          normalY,
          0,
        )
        indices[sideIndexCursor++] = base
        indices[sideIndexCursor++] = base + 1
        indices[sideIndexCursor++] = base + 3
        indices[sideIndexCursor++] = base + 1
        indices[sideIndexCursor++] = base + 2
        indices[sideIndexCursor++] = base + 3
        sideVertexCursor += 4
      }
    })
    vertexOffset = sideVertexCursor
  })

  const output = new BufferGeometry()
  output.setAttribute('position', new BufferAttribute(positions, 3))
  output.setAttribute('normal', new BufferAttribute(normals, 3))
  output.setIndex(new BufferAttribute(indices, 1))
  output.addGroup(0, lidIndexCount, 0)
  output.addGroup(lidIndexCount, indices.length - lidIndexCount, 1)
  return output
}

export function createOutlineGeometry(
  descriptor: PackedRenderGeometry,
  buffer: ArrayBuffer,
) {
  return createBatchedOutlineGeometry([descriptor], buffer)
}

export function createBatchedOutlineGeometry(
  descriptors: PackedRenderGeometry[],
  buffer: ArrayBuffer,
) {
  const totals = getGeometryTotals(descriptors)
  const positions = new Float32Array(totals.pointCount * 3)
  const IndexArray = totals.pointCount <= 65_535 ? Uint16Array : Uint32Array
  const indices = new IndexArray(totals.edgeCount * 2)
  let indexCursor = 0
  let pointOffset = 0
  descriptors.forEach((descriptor) => {
    const coordinates = new Float32Array(
      buffer,
      descriptor.position.byteOffset,
      descriptor.position.count,
    )
    const pointCount = coordinates.length / 2
    for (let point = 0; point < pointCount; point += 1) {
      const target = (pointOffset + point) * 3
      positions[target] = coordinates[point * 2]
      positions[target + 1] = coordinates[point * 2 + 1]
      positions[target + 2] = descriptor.outlineElevation
    }
    descriptor.rings.forEach((ring) => {
      for (let index = 0; index < ring.count; index += 1) {
        indices[indexCursor++] = pointOffset + ring.start + index
        indices[indexCursor++] =
          pointOffset + ring.start + (index + 1 === ring.count ? 0 : index + 1)
      }
    })
    pointOffset += pointCount
  })
  const output = new BufferGeometry()
  output.setAttribute('position', new BufferAttribute(positions, 3))
  output.setIndex(new BufferAttribute(indices, 1))
  return output
}
