import { MAP_PERFORMANCE_MARKS, markMapPerformance } from './performance'

type RequestFrame = (callback: FrameRequestCallback) => number

/** Called from the final national mesh's onAfterRender hook. */
export function scheduleFirstFrameReady(
  onReady: () => void,
  requestFrame: RequestFrame = requestAnimationFrame,
) {
  // Three.js invokes onAfterRender only after program selection, attribute
  // upload, and the draw call. These two marks therefore share a conservative
  // completion boundary rather than pretending browser APIs expose each step.
  markMapPerformance(MAP_PERFORMANCE_MARKS.firstGpuUpload)
  markMapPerformance(MAP_PERFORMANCE_MARKS.shadersCompiled)
  return requestFrame(() => {
    markMapPerformance(MAP_PERFORMANCE_MARKS.firstFramePainted)
    onReady()
  })
}
