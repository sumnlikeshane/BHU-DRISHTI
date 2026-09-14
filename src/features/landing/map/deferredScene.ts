export const DEFERRED_SCENE_THRESHOLDS = {
  nationalMarkers: 0.08,
  maharashtraDistricts: 0.4,
  siteMarkers: 0.7,
} as const

export interface DeferredSceneLayers {
  nationalMarkers: boolean
  maharashtraDistricts: boolean
  siteMarkers: boolean
}

export const INITIAL_DEFERRED_SCENE_LAYERS: DeferredSceneLayers = {
  nationalMarkers: false,
  maharashtraDistricts: false,
  siteMarkers: false,
}

export function resolveDeferredSceneLayers(
  progress: number,
  mounted: DeferredSceneLayers = INITIAL_DEFERRED_SCENE_LAYERS,
): DeferredSceneLayers {
  return {
    nationalMarkers:
      mounted.nationalMarkers ||
      progress >= DEFERRED_SCENE_THRESHOLDS.nationalMarkers,
    maharashtraDistricts:
      mounted.maharashtraDistricts ||
      progress >= DEFERRED_SCENE_THRESHOLDS.maharashtraDistricts,
    siteMarkers:
      mounted.siteMarkers || progress >= DEFERRED_SCENE_THRESHOLDS.siteMarkers,
  }
}
