import { SectionIntro } from '../components/SectionIntro'
import { landingStory } from '../content/landingStory'

export function WorkflowSection() {
  return (
    <section className="editorial-section compact-process workflow-section">
      <SectionIntro content={landingStory.workflow} />
      <ol className="workflow-rail">
        {landingStory.workflow.steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <i aria-hidden="true" />
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </section>
  )
}
