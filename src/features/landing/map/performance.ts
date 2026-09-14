export const MAP_PERFORMANCE_MARKS = {
  appStart: 'bhu-map:app-start',
  sceneImportRequested: 'bhu-map:scene-import-requested',
  sceneModuleLoaded: 'bhu-map:scene-module-loaded',
  rendererCreated: 'bhu-map:renderer-created',
  nationalMetadataRequestStart: 'bhu-map:national-metadata-request-start',
  nationalMetadataRequestEnd: 'bhu-map:national-metadata-request-end',
  nationalBufferRequestStart: 'bhu-map:national-buffer-request-start',
  nationalBufferRequestEnd: 'bhu-map:national-buffer-request-end',
  mapDataAvailable: 'bhu-map:map-data-available',
  nationalGeometryHydrationStart: 'bhu-map:national-geometry-hydration-start',
  nationalGeometryHydrationEnd: 'bhu-map:national-geometry-hydration-end',
  nationalGeometryReady: 'bhu-map:national-geometry-ready',
  firstGpuUpload: 'bhu-map:first-gpu-upload-complete',
  shadersCompiled: 'bhu-map:first-shaders-compiled',
  firstFramePainted: 'bhu-map:first-webgl-frame-painted',
  districtGeometryReady: 'bhu-map:district-geometry-ready',
} as const

export function markMapPerformance(name: string) {
  if (
    typeof performance !== 'undefined' &&
    performance.getEntriesByName(name).length === 0
  ) {
    performance.mark(name)
  }
}
