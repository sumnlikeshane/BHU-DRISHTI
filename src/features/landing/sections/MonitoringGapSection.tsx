import { EvidenceInputs } from '../components/EvidenceFlow'
import { EvidenceRail } from '../components/EvidenceRail'
import { SectionIntro } from '../components/SectionIntro'
import { landingStory } from '../content/landingStory'

export function MonitoringGapSection() {
  return (
    <>
      <section
        className="editorial-section editorial-split monitoring-section"
        id="about"
      >
        <SectionIntro content={landingStory.monitoringGap} />
        <ol className="question-rail" aria-label="Monitoring questions">
          <li>
            <span>01</span>
            <div>
              <strong>Is the evidence usable?</strong>
              <p>
                Verify work ID, coordinates, capture time, image quality, and
                source provenance before interpreting anything.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>What changed beyond normal variation?</strong>
              <p>
                Compare the same season and spatial unit across time, rainfall,
                and similar reference areas.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>What decision is justified?</strong>
              <p>
                Distinguish an observed cue, an inferred condition, and an
                action authorised by an official.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="editorial-section visual-led-split intelligence-section">
        <SectionIntro content={landingStory.intelligenceLayer} />
        <div
          className="intelligence-flow"
          aria-label="Proposed system relationship"
        >
          <div className="source-stack">
            <div>
              <small>Work-linked observation</small>
              <strong>Geo-coded field record</strong>
            </div>
            <div>
              <small>Spatial and temporal context</small>
              <strong>Authorised GIS + EO layers</strong>
            </div>
          </div>
          <span className="diagram-arrow" aria-hidden="true">
            →
          </span>
          <div className="intelligence-node">
            <small>Proposed layer</small>
            <strong>BHU-DRISHTI</strong>
            <span>Validate · compare · explain</span>
          </div>
          <span className="diagram-arrow" aria-hidden="true">
            →
          </span>
          <div className="decision-stack">
            <div>
              <small>Decision support</small>
              <strong>Priority + evidence packet</strong>
            </div>
            <div>
              <small>Authority</small>
              <strong>Officer / engineer review</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section full-width-band evidence-section">
        <SectionIntro content={landingStory.evidence} />
        <EvidenceInputs />
        <EvidenceRail />
      </section>
    </>
  )
}
