import { markMapPerformance } from './performance'
import type { IndiaRenderAsset, MaharashtraRenderAsset } from './types'

export interface BufferedAsset<T> {
  asset: T
  buffer: ArrayBuffer
}

interface AssetRequestMarks {
  metadataStart: string
  metadataEnd: string
  bufferStart: string
  bufferEnd: string
}

interface BufferedMapAssetRequest {
  bufferFile: string
  compressedBufferFile: string
  jsonFile: string
  marks?: AssetRequestMarks
  signal: AbortSignal
}

async function readPackedBuffer(
  response: Response,
  compressed: boolean,
): Promise<ArrayBuffer> {
  if (!compressed) return response.arrayBuffer()
  if (!response.body) throw new Error('Packed geometry response has no body')
  return new Response(
    response.body.pipeThrough(new DecompressionStream('gzip')),
  ).arrayBuffer()
}

/**
 * The manifest and geometry URLs are build-time constants, so requesting them
 * together avoids a full metadata -> buffer network round trip on cold loads.
 */
export async function fetchBufferedMapAsset<
  T extends IndiaRenderAsset | MaharashtraRenderAsset,
>({
  bufferFile,
  compressedBufferFile,
  jsonFile,
  marks,
  signal,
}: BufferedMapAssetRequest): Promise<BufferedAsset<T>> {
  const supportsGzipStreams = typeof DecompressionStream !== 'undefined'
  const selectedBufferFile = supportsGzipStreams
    ? compressedBufferFile
    : bufferFile

  if (marks) markMapPerformance(marks.metadataStart)
  const metadataPromise = fetch(`/data/maps/${jsonFile}`, { signal }).then(
    async (response) => {
      if (!response.ok) throw new Error(`${jsonFile} failed to load`)
      const asset = (await response.json()) as T
      if (marks) markMapPerformance(marks.metadataEnd)
      return asset
    },
  )

  if (marks) markMapPerformance(marks.bufferStart)
  const bufferPromise = fetch(`/data/maps/${selectedBufferFile}`, {
    signal,
  }).then(async (response) => {
    if (!response.ok) throw new Error(`${selectedBufferFile} failed to load`)
    const buffer = await readPackedBuffer(response, supportsGzipStreams)
    if (marks) markMapPerformance(marks.bufferEnd)
    return buffer
  })

  const [asset, buffer] = await Promise.all([metadataPromise, bufferPromise])
  const declaredFile = supportsGzipStreams
    ? asset.metadata.compressedBufferFile
    : asset.metadata.bufferFile
  if (declaredFile !== selectedBufferFile) {
    throw new Error(`${jsonFile} references an unexpected geometry buffer`)
  }
  if (buffer.byteLength !== asset.metadata.bufferBytes) {
    throw new Error(`${selectedBufferFile} has an invalid byte length`)
  }
  return { asset, buffer }
}
