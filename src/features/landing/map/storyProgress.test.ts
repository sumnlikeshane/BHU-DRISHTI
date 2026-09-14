import { describe, expect, it } from 'vitest'

import { landingStory } from '../content/landingStory'
import {
  resolveStoryChapter,
  STORY_CHAPTER_BOUNDARIES,
  STORY_CHAPTER_LABELS,
  STORY_TIMELINE_OWNER,
} from './storyProgress'

describe('map story progress', () => {
  it('keeps the approved chapter labels in exact timeline order', () => {
    expect(STORY_CHAPTER_LABELS).toEqual([
      'india-intro',
      'evidence-scale',
      'triage-question',
      'maharashtra-focus',
      'nashik-focus',
      'priority-site',
      'solution-handoff',
    ])
    expect(STORY_TIMELINE_OWNER).toBe('bhu-drishti-map-story')
    expect(landingStory.mapChapters.map((chapter) => chapter.label)).toEqual(
      STORY_CHAPTER_LABELS,
    )
  })

  it('resolves every boundary to the chapter that starts there', () => {
    STORY_CHAPTER_BOUNDARIES.forEach((boundary, index) => {
      expect(resolveStoryChapter(boundary)).toMatchObject({
        index,
        label: STORY_CHAPTER_LABELS[index],
      })
    })
  })

  it('is deterministic in forward and reverse traversal', () => {
    const samples = [0, 0.08, 0.18, 0.34, 0.51, 0.69, 0.84, 1]
    const forward = samples.map((value) => resolveStoryChapter(value).label)
    const reverse = [...samples]
      .reverse()
      .map((value) => resolveStoryChapter(value).label)
      .reverse()
    expect(reverse).toEqual(forward)
    expect(resolveStoryChapter(-5).label).toBe('india-intro')
    expect(resolveStoryChapter(5).label).toBe('solution-handoff')
  })
})
