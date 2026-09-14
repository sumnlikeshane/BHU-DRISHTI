import { useRef } from 'react'

import { MetricList } from '../components/MetricList'
import { StatusKey } from '../components/StatusKey'
import {
  landingStory,
  nationalProgrammeMetrics,
  type ClassifiedMetric,
} from '../content/landingStory'
import { demoScenario } from '../data/demoScenario'
import { MapExperience } from '../map/MapExperience'
import {
  STORY_CHAPTER_LABELS,
  type StoryProgressRef,
} from '../map/storyProgress'
import { useLandingTimeline } from '../map/useLandingTimeline'

type Chapter = (typeof landingStory.mapChapters)[number]

function ChapterMetrics({ content }: { content: Chapter['content'] }) {
  let metrics: readonly ClassifiedMetric[] | null = null
  if (content === 'national-metrics') metrics = nationalProgrammeMetrics
  if (content === 'state-metrics') metrics = demoScenario.state.metrics
  if (content === 'district-metrics') metrics = demoScenario.district.metrics

  if (metrics) return <MetricList metrics={metrics} compact />
  if (content === 'statuses') return <StatusKey compact />
  if (content === 'site') {
    return (
      <div className="story-site-trace">
        <strong>{demoScenario.site.possibleIssue}</strong>
        <MetricList metrics={demoScenario.site.metrics.slice(0, 1)} compact />
        <p>{demoScenario.site.recommendation}</p>
      </div>
    )
  }
  return null
}

function Breadcrumb({ items }: { items: readonly string[] }) {
  return (
    <ol className="story-breadcrumb" aria-label="Map focus">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  )
}

function ChapterPanel({ chapter, index }: { chapter: Chapter; index: number }) {
  const Heading = index === 0 ? 'h1' : 'h2'
  return (
    <article
      className="story-chapter"
      data-chapter={chapter.label}
      aria-hidden={index !== 0}
    >
      <Breadcrumb items={chapter.breadcrumb} />
      <p className="eyebrow">{chapter.eyebrow}</p>
      <Heading id={index === 0 ? 'hero-heading' : undefined}>
        {chapter.heading}
      </Heading>
      <p className="story-chapter__body">{chapter.body}</p>
      <ChapterMetrics content={chapter.content} />
      <p className="story-chapter__detail">{chapter.detail}</p>
    </article>
  )
}

function StaticStoryChapters() {
  return (
    <div className="story-static" aria-label="Static map story">
      <ol className="story-static__chapters">
        {landingStory.mapChapters.slice(1).map((chapter, index) => (
          <li key={chapter.label}>
            <span>{String(index + 2).padStart(2, '0')}</span>
            <div>
              <p className="eyebrow">{chapter.eyebrow}</p>
              <h2>{chapter.heading}</h2>
              <p>{chapter.body}</p>
              <ChapterMetrics content={chapter.content} />
            </div>
          </li>
        ))}
      </ol>
      <p className="boundary-disclosure">
        Prototype boundaries · not officially verified. Final release geometry
        requires Survey of India validation and licensing review.
      </p>
    </div>
  )
}

export function PinnedMapStory() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const progress = useRef({ value: 0 }) as StoryProgressRef

  useLandingTimeline({ root, stage, progress })

  return (
    <section
      className="hero-story"
      id="interactive-map-story"
      aria-labelledby="hero-heading"
      ref={root}
      data-active-chapter={STORY_CHAPTER_LABELS[0]}
    >
      <div className="story-stage" data-mobile-layout="map-first" ref={stage}>
        <figure className="map-figure">
          <MapExperience progress={progress} />
        </figure>

        <div className="story-copy-stack">
          {landingStory.mapChapters.map((chapter, index) => (
            <ChapterPanel chapter={chapter} index={index} key={chapter.label} />
          ))}
        </div>

        <div className="story-progress" aria-hidden="true">
          <span className="story-progress__count">01 / 07</span>
          <span className="story-progress__track">
            <span className="story-progress__fill" />
          </span>
          <span>Scroll to explore</span>
        </div>
      </div>

      <StaticStoryChapters />
    </section>
  )
}
