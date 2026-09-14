import { afterEach, describe, expect, it, vi } from 'vitest'

import { scheduleFirstFrameReady } from './firstFrameReady'
import { MAP_PERFORMANCE_MARKS } from './performance'

describe('first WebGL frame readiness', () => {
  afterEach(() => performance.clearMarks())

  it('reports readiness only on the paint callback after a national draw', () => {
    let paint: FrameRequestCallback | undefined
    const onReady = vi.fn()

    scheduleFirstFrameReady(onReady, (callback) => {
      paint = callback
      return 1
    })

    expect(onReady).not.toHaveBeenCalled()
    expect(
      performance.getEntriesByName(MAP_PERFORMANCE_MARKS.firstGpuUpload),
    ).toHaveLength(1)
    expect(
      performance.getEntriesByName(MAP_PERFORMANCE_MARKS.firstFramePainted),
    ).toHaveLength(0)

    paint?.(performance.now())

    expect(onReady).toHaveBeenCalledOnce()
    expect(
      performance.getEntriesByName(MAP_PERFORMANCE_MARKS.firstFramePainted),
    ).toHaveLength(1)
  })
})
