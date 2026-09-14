import { afterEach, describe, expect, it, vi } from 'vitest'

import { fetchBufferedMapAsset } from './assetLoader'

describe('critical map asset loading', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('starts metadata and geometry requests before either response resolves', async () => {
    vi.stubGlobal('DecompressionStream', undefined)
    const pending = new Map<string, (response: Response) => void>()
    const fetchMock = vi.fn(
      (url: string) =>
        new Promise<Response>((resolve) => pending.set(url, resolve)),
    )
    vi.stubGlobal('fetch', fetchMock)

    const loading = fetchBufferedMapAsset({
      bufferFile: 'national.bin',
      compressedBufferFile: 'national.bin.pack',
      jsonFile: 'national.json',
      signal: new AbortController().signal,
    })

    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      '/data/maps/national.json',
      '/data/maps/national.bin',
    ])

    pending.get('/data/maps/national.json')?.(
      Response.json({
        metadata: {
          bufferBytes: 4,
          bufferFile: 'national.bin',
          compressedBufferFile: 'national.bin.pack',
        },
        regions: [],
      }),
    )
    pending.get('/data/maps/national.bin')?.(
      new Response(new Uint8Array([1, 2, 3, 4])),
    )

    await expect(loading).resolves.toMatchObject({
      buffer: expect.any(ArrayBuffer),
    })
  })
})
