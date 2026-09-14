export const STORY_TIMELINE_OWNER = 'bhu-drishti-map-story'
export const MAP_PROGRESS_EVENT = 'bhu-map-progress'

export const STORY_MOTION = {
  compactScrollLength: 4.2,
  desktopScrollLength: 5.1,
  chapterCrossfade: 0.18,
} as const

export const STORY_CHAPTER_LABELS = [
  'india-intro',
  'evidence-scale',
  'triage-question',
  'maharashtra-focus',
  'nashik-focus',
  'priority-site',
  'solution-handoff',
] as const

export type StoryChapterLabel = (typeof STORY_CHAPTER_LABELS)[number]

export const STORY_CHAPTER_BOUNDARIES = STORY_CHAPTER_LABELS.map(
  (_, index) => index / (STORY_CHAPTER_LABELS.length - 1),
)

export function clampStoryProgress(progress: number) {
  return Math.min(1, Math.max(0, progress))
}

export function resolveStoryChapter(progress: number) {
  const value = clampStoryProgress(progress)
  let activeIndex = 0

  for (let index = 1; index < STORY_CHAPTER_BOUNDARIES.length; index += 1) {
    if (value + Number.EPSILON >= STORY_CHAPTER_BOUNDARIES[index]) {
      activeIndex = index
    } else {
      break
    }
  }

  return {
    index: activeIndex,
    label: STORY_CHAPTER_LABELS[activeIndex],
    progress: value,
  }
}

export interface StoryProgressRef {
  current: { value: number }
}
