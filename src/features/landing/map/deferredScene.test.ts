import { describe, expect, it } from 'vitest'

import {
  DEFERRED_SCENE_THRESHOLDS,
  INITIAL_DEFERRED_SCENE_LAYERS,
  resolveDeferredSceneLayers,
} from './deferredScene'

describe('deferred map scene layers', () => {
  it('keeps districts and markers out of the opening India chapter', () => {
    expect(resolveDeferredSceneLayers(0)).toEqual(INITIAL_DEFERRED_SCENE_LAYERS)
  })

  it('warms each layer before its first visible progress range', () => {
    expect(DEFERRED_SCENE_THRESHOLDS.nationalMarkers).toBeLessThan(0.12)
    expect(DEFERRED_SCENE_THRESHOLDS.maharashtraDistricts).toBeLessThan(0.48)
    expect(DEFERRED_SCENE_THRESHOLDS.siteMarkers).toBeLessThan(0.76)
  })

  it('keeps constructed layers mounted while scrolling backward', () => {
    const mounted = resolveDeferredSceneLayers(1)
    expect(resolveDeferredSceneLayers(0, mounted)).toEqual(mounted)
  })
})
