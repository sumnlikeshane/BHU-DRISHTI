import { describe, expect, it } from 'vitest'

import { MAP_FOCUS_STYLE } from './sceneConfig'

describe('Nashik focus styling', () => {
  it('keeps the Maharashtra district layer crisp and coherent', () => {
    expect(MAP_FOCUS_STYLE.districtSubduedOpacity).toBeGreaterThanOrEqual(0.85)
    expect(MAP_FOCUS_STYLE.districtOpacity).toBeGreaterThanOrEqual(0.95)
    expect(MAP_FOCUS_STYLE.districtOutlineOpacity).toBeGreaterThanOrEqual(0.9)
    expect(MAP_FOCUS_STYLE.nashikOutlineOpacity).toBe(1)
  })

  it('separates state, district, selected district, and outline depths', () => {
    expect(MAP_FOCUS_STYLE.districtLayerGap).toBeGreaterThan(0.1)
    expect(MAP_FOCUS_STYLE.nashikLift).toBeGreaterThan(
      MAP_FOCUS_STYLE.outlineLift,
    )
    expect(MAP_FOCUS_STYLE.outlineLift).toBeGreaterThan(0)
  })
})
