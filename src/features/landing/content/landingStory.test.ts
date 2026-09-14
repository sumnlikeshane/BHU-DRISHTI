import { describe, expect, it } from 'vitest'

import { allIllustrativeMetrics, demoScenario } from '../data/demoScenario'
import {
  landingResearchSources,
  nationalProgrammeMetrics,
} from './landingStory'

describe('landing metric governance', () => {
  it('classifies every displayed metric', () => {
    const metrics = [...nationalProgrammeMetrics, ...allIllustrativeMetrics]

    expect(metrics.length).toBeGreaterThan(0)
    for (const metric of metrics) {
      expect(['official', 'derived', 'illustrative']).toContain(
        metric.classification,
      )
      expect(metric.note).not.toHaveLength(0)
    }
    expect(new Set(metrics.map((metric) => metric.id)).size).toBe(
      metrics.length,
    )
  })

  it('keeps official programme figures sourced and dated', () => {
    for (const metric of nationalProgrammeMetrics) {
      expect(metric.classification).toBe('official')
      expect(metric.source?.url).toMatch(/^https:\/\//)
      expect(metric.source?.asOf).not.toHaveLength(0)
    }
  })

  it('marks every Maharashtra, Nashik, and site value illustrative', () => {
    expect(allIllustrativeMetrics).toHaveLength(
      demoScenario.state.metrics.length +
        demoScenario.district.metrics.length +
        demoScenario.site.metrics.length +
        1,
    )
    expect(
      allIllustrativeMetrics.every(
        (metric) => metric.classification === 'illustrative',
      ),
    ).toBe(true)
    expect(demoScenario.disclosure).toContain('Illustrative demo')
  })

  it('keeps the landing research basis attributable and specific', () => {
    expect(landingResearchSources.length).toBeGreaterThanOrEqual(5)

    for (const source of landingResearchSources) {
      expect(source.label).not.toHaveLength(0)
      expect(source.publisher).not.toHaveLength(0)
      expect(source.supports).not.toHaveLength(0)
      expect(source.url).toMatch(/^https:\/\//)
    }
  })
})
