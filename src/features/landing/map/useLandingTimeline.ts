import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'

import {
  resolveStoryChapter,
  MAP_PROGRESS_EVENT,
  STORY_CHAPTER_LABELS,
  STORY_MOTION,
  STORY_TIMELINE_OWNER,
  type StoryProgressRef,
} from './storyProgress'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface LandingTimelineOptions {
  root: RefObject<HTMLElement | null>
  stage: RefObject<HTMLDivElement | null>
  progress: StoryProgressRef
}

const STORY_MEDIA_QUERY =
  '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

function dispatchChapter(label: string, index: number) {
  window.dispatchEvent(
    new CustomEvent('bhu-story-chapter', { detail: { label, index } }),
  )
}

export function useLandingTimeline({
  root,
  stage,
  progress,
}: LandingTimelineOptions) {
  useGSAP(
    () => {
      if (!root.current || !stage.current) return

      const media = gsap.matchMedia()
      media.add(STORY_MEDIA_QUERY, () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
          return
        if (!root.current || !stage.current) return

        const panels = gsap.utils.toArray<HTMLElement>('.story-chapter')
        const progressFill = root.current.querySelector<HTMLElement>(
          '.story-progress__fill',
        )
        const progressText = root.current.querySelector<HTMLElement>(
          '.story-progress__count',
        )
        let activeIndex = -1

        gsap.set(panels, {
          autoAlpha: 0,
          y: 20,
          yPercent: -50,
          pointerEvents: 'none',
        })
        gsap.set(panels[0], {
          autoAlpha: 1,
          y: 0,
          yPercent: -50,
          pointerEvents: 'auto',
        })

        const sync = () => {
          const resolved = resolveStoryChapter(progress.current.value)
          root.current?.style.setProperty(
            '--story-progress',
            String(resolved.progress),
          )
          document.documentElement.style.setProperty(
            '--header-progress',
            String(Math.min(1, resolved.progress * 4)),
          )
          if (progressFill) {
            progressFill.style.transform = `scaleX(${resolved.progress})`
          }
          if (progressText) {
            progressText.textContent = `${String(resolved.index + 1).padStart(2, '0')} / 07`
          }
          if (resolved.index !== activeIndex) {
            activeIndex = resolved.index
            root.current?.setAttribute('data-active-chapter', resolved.label)
            panels.forEach((panel, index) => {
              panel.setAttribute('aria-hidden', String(index !== activeIndex))
              panel.style.pointerEvents =
                index === activeIndex ? 'auto' : 'none'
            })
            dispatchChapter(resolved.label, resolved.index)
          }
          window.dispatchEvent(
            new CustomEvent(MAP_PROGRESS_EVENT, {
              detail: { value: resolved.progress },
            }),
          )
        }

        const timeline = gsap.timeline({
          id: STORY_TIMELINE_OWNER,
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: STORY_TIMELINE_OWNER,
            trigger: root.current,
            pin: stage.current,
            start: 'top top',
            end: () =>
              `+=${Math.round(
                window.innerHeight *
                  (window.innerWidth < 1100
                    ? STORY_MOTION.compactScrollLength
                    : STORY_MOTION.desktopScrollLength),
              )}`,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: sync,
          },
        })

        STORY_CHAPTER_LABELS.forEach((label, index) => {
          timeline.addLabel(label, index)
          if (index > 0) {
            const transitionStart = index - STORY_MOTION.chapterCrossfade
            timeline.to(
              panels[index - 1],
              {
                autoAlpha: 0,
                y: -14,
                duration: STORY_MOTION.chapterCrossfade,
              },
              transitionStart,
            )
            timeline.fromTo(
              panels[index],
              { autoAlpha: 0, y: 16 },
              {
                autoAlpha: 1,
                y: 0,
                duration: STORY_MOTION.chapterCrossfade,
              },
              transitionStart,
            )
          }
        })

        timeline.fromTo(
          progress.current,
          { value: 0 },
          {
            value: 1,
            duration: STORY_CHAPTER_LABELS.length - 1,
            onUpdate: sync,
          },
          0,
        )

        const refresh = () => ScrollTrigger.refresh(true)
        const refreshOnFrame = () => requestAnimationFrame(refresh)
        window.addEventListener('orientationchange', refreshOnFrame)
        window.addEventListener('load', refreshOnFrame)
        window.addEventListener('bhu-map-assets-ready', refreshOnFrame)
        void document.fonts?.ready.then(refreshOnFrame)
        sync()

        return () => {
          window.removeEventListener('orientationchange', refreshOnFrame)
          window.removeEventListener('load', refreshOnFrame)
          window.removeEventListener('bhu-map-assets-ready', refreshOnFrame)
          document.documentElement.style.removeProperty('--header-progress')
          progress.current.value = 0
          timeline.scrollTrigger?.kill()
          timeline.kill()
        }
      })

      return () => media.revert()
    },
    { scope: root, dependencies: [], revertOnUpdate: true },
  )
}
