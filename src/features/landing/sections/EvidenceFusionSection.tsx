import { EvidenceFlow } from '../components/EvidenceFlow'
import { SectionIntro } from '../components/SectionIntro'
import {
  landingStory,
  metricClassificationLabels,
  nationalProgrammeMetrics,
  type ClassifiedMetric,
} from '../content/landingStory'
import { demoScenario } from '../data/demoScenario'

const prioritisationScale: readonly ClassifiedMetric[] = [
  nationalProgrammeMetrics.find((metric) => metric.id === 'water-structures')!,
  demoScenario.state.metrics[1],
  demoScenario.state.metrics[2],
  demoScenario.district.metrics[1],
]

export function EvidenceFusionSection() {
  return (
    <>
      <section className="editorial-section fusion-section" id="how-it-works">
        <SectionIntro content={landingStory.fusion} />
        <EvidenceFlow />
      </section>

      <section className="editorial-section visual-led-split explain-section">
        <SectionIntro content={landingStory.explainability} />
        <div className="explanation-compare">
          <div className="mystery-score" aria-label="Insufficient bare score">
            <span>{demoScenario.site.bareScore.value}</span>
            <small>
              {demoScenario.site.bareScore.label} · insufficient context ·{' '}
              {
                metricClassificationLabels[
                  demoScenario.site.bareScore.classification
                ]
              }
            </small>
          </div>
          <article>
            <p className="micro-label">
              Explainable finding · Illustrative demo
            </p>
            <h3>{demoScenario.site.possibleIssue}</h3>
            <ol className="reasoning-trace">
              <li>
                <span>Observation</span>
                <strong>Possible visible siltation cue</strong>
              </li>
              <li>
                <span>Context</span>
                <strong>
                  Lower greenness + open-water signals · Illustrative demo
                </strong>
              </li>
              <li>
                <span>Limit</span>
                <strong>
                  Rainfall may contribute; internal condition is unknown
                </strong>
              </li>
              <li>
                <span>Action</span>
                <strong>Field inspection recommended</strong>
              </li>
            </ol>
          </article>
        </div>
      </section>

      <section className="editorial-section compact-process human-section">
        <SectionIntro content={landingStory.humanLoop} />
        <ol className="decision-routing" aria-label="Human decision routing">
          <li>
            <span className="route-symbol">↺</span>
            <div>
              <small>Invalid or stale evidence</small>
              <strong>Recollect</strong>
            </div>
            <span aria-hidden="true">→</span>
          </li>
          <li>
            <span className="route-symbol">?</span>
            <div>
              <small>Conflicting signals</small>
              <strong>Analyst review</strong>
            </div>
            <span aria-hidden="true">→</span>
          </li>
          <li>
            <span className="route-symbol">!</span>
            <div>
              <small>Plausible high consequence</small>
              <strong>Field inspection</strong>
            </div>
            <span aria-hidden="true">→</span>
          </li>
        </ol>
        <p className="authority-note">
          Routing policy is explicit; officials and engineers retain decision
          authority at every route.
        </p>
      </section>

      <section className="editorial-section centred-narrative scale-section">
        <SectionIntro content={landingStory.scale} />
        <div
          className="priority-queue-model"
          aria-label="Illustrative evidence to queue model"
        >
          {prioritisationScale.map((metric, index) => {
            const content = (
              <>
                {metric.value} {metric.label} ·{' '}
                {metricClassificationLabels[metric.classification]}
              </>
            )
            return (
              <div
                className={
                  index === prioritisationScale.length - 1
                    ? 'queue-stage queue-stage--selected'
                    : 'queue-stage'
                }
                key={metric.id}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{content}</strong>
                <i aria-hidden="true" />
              </div>
            )
          })}
        </div>
        <p className="demo-disclosure">{demoScenario.disclosure}</p>
      </section>
    </>
  )
}
