export type Position = [number, number]
export type LinearRing = Position[]
export type PolygonCoordinates = LinearRing[]
export type MultiPolygonCoordinates = PolygonCoordinates[]

export interface ProjectedGeometry {
  type: 'MultiPolygon'
  coordinates: MultiPolygonCoordinates
}

export interface PackedArrayRange {
  byteOffset: number
  count: number
}

export interface PackedRing {
  start: number
  count: number
}

export interface PackedRenderGeometry {
  position: PackedArrayRange
  triangleIndex: PackedArrayRange
  rings: PackedRing[]
  depth: number
  outlineElevation: number
}

export interface RenderRegion {
  id: string
  name: string
  sourceName: string
  sourceCode: string
  renderGeometry: PackedRenderGeometry
  bounds: [Position, Position]
  centroid: Position
}

export interface StateRenderRegion extends RenderRegion {
  districtCount: number
}

interface RenderAssetMetadata {
  schemaVersion: number
  sourceUrl: string
  sourceCommit: string
  acquiredOn: string
  boundaryStatus: 'prototype-unverified'
  sourceFile: string
  featureCount: number
  bounds?: [Position, Position]
  parentRegionId?: string
  parentBounds?: [Position, Position]
  bufferFile: string
  bufferBytes: number
  bufferSha256: string
  compressedBufferFile: string
  encoding: 'little-endian-float32-uint32'
  sourceCoordinateCount: number
}

export interface IndiaRenderAsset {
  metadata: RenderAssetMetadata
  regions: StateRenderRegion[]
}

export interface MaharashtraRenderAsset {
  metadata: RenderAssetMetadata
  districts: RenderRegion[]
}
