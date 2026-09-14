/// <reference types="node" />

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(entry.name) ? [path] : []
  })
}

describe('master map timeline architecture', () => {
  const landingRoot = join(process.cwd(), 'src/features/landing')
  const sources = sourceFiles(landingRoot).map((path) => ({
    path,
    text: readFileSync(path, 'utf8'),
  }))
  const owner = sources.find(({ path }) =>
    path.endsWith('useLandingTimeline.ts'),
  )!

  it('has exactly one ScrollTrigger configuration in the landing feature', () => {
    const configurations = sources.flatMap(({ path, text }) =>
      [...text.matchAll(/scrollTrigger\s*:/g)].map(() => path),
    )
    expect(configurations).toEqual([owner.path])
    expect(owner.text).toContain('pin: stage.current')
    expect(owner.text).toContain('scrub: true')
    expect(owner.text).not.toContain('ScrollSmoother')
  })

  it('crossfades adjacent chapters without an empty interval', () => {
    expect(owner.text).toContain(
      'const transitionStart = index - STORY_MOTION.chapterCrossfade',
    )
    expect(owner.text.match(/transitionStart,/g)).toHaveLength(2)
  })

  it('owns cleanup and measurement refresh in the GSAP context', () => {
    for (const required of [
      'timeline.scrollTrigger?.kill()',
      'timeline.kill()',
      'media.revert()',
      "removeEventListener('orientationchange'",
      "removeEventListener('bhu-map-assets-ready'",
      'document.fonts?.ready',
      'invalidateOnRefresh: true',
      'ScrollTrigger.refresh(true)',
    ]) {
      expect(owner.text).toContain(required)
    }
  })

  it('guards timeline creation for reduced motion', () => {
    expect(owner.text).toContain('prefers-reduced-motion: reduce')
    expect(owner.text).toMatch(/\.matches\)\s+return/)
  })
})
