import type { NarrativeSection } from '../content/landingStory'

interface SectionIntroProps {
  content: NarrativeSection
}

export function SectionIntro({ content }: SectionIntroProps) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{content.eyebrow}</p>
      <h2>{content.heading}</h2>
      <p className="section-lede">{content.body}</p>
    </div>
  )
}
