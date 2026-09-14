import { ProductPreview } from '../components/ProductPreview'
import { SectionIntro } from '../components/SectionIntro'
import { landingResearchSources, landingStory } from '../content/landingStory'

export function ProductSection() {
  return (
    <>
      <section className="editorial-section full-width-band modes-section">
        <SectionIntro content={landingStory.product} />
        <ol className="operating-model">
          {landingStory.product.modes.map((mode, index) => (
            <li key={mode.title}>
              <div>
                <span>0{index + 1}</span>
                <i aria-hidden="true" />
              </div>
              <h3>{mode.title}</h3>
              <p>{mode.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="editorial-section preview-section"
        id="product-preview"
      >
        <SectionIntro content={landingStory.productPreview} />
        <ProductPreview />
      </section>

      <section className="editorial-section visual-led-split integration-section">
        <SectionIntro content={landingStory.integration} />
        <div
          className="integration-network"
          aria-label="Proposed integration flow"
        >
          <div className="integration-sources">
            <span>
              <small>Work-linked record</small>Geo-coded field observation
            </span>
            <span>
              <small>Authorised spatial evidence</small>Bhuvan / SRISHTI layers
            </span>
          </div>
          <div className="connector-label">
            Proposed data exchange <span aria-hidden="true">→</span>
          </div>
          <strong>
            <small>Proposed intelligence layer</small>BHU-DRISHTI
          </strong>
          <div className="connector-label">
            Explainable recommendation <span aria-hidden="true">→</span>
          </div>
          <span className="integration-output">
            <small>Accountable workflow</small>Review case + human decision
          </span>
        </div>
      </section>

      <section className="editorial-section compact-process outcomes-section">
        <SectionIntro content={landingStory.outcomes} />
        <div className="user-outcomes" role="list">
          {landingStory.outcomes.users.map((user, index) => (
            <article key={user.title} role="listitem">
              <span className="persona-symbol" aria-hidden="true">
                {['◎', '◇', '↗'][index]}
              </span>
              <div>
                <small>User level</small>
                <h3>{user.title}</h3>
              </div>
              <div>
                <small>Operational question</small>
                <p>
                  {
                    [
                      'Where are outcomes improving—or evidence missing?',
                      'Which cases need review, recollection, or inspection?',
                      'What exactly should be verified on the ground?',
                    ][index]
                  }
                </p>
              </div>
              <div>
                <small>Useful outcome</small>
                <p>{user.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="editorial-section centred-narrative output-section"
        id="impact"
      >
        <SectionIntro content={landingStory.outputOutcome} />
        <div
          className="outcome-model"
          aria-label="Output to outcome measurement model"
        >
          <strong>
            Structure output<small>What was delivered</small>
          </strong>
          <span aria-hidden="true">→</span>
          <ul>
            {[
              'Water availability',
              'Irrigation + crop intensity',
              'Land + vegetation condition',
              'Livelihood evidence',
            ].map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                {item}
              </li>
            ))}
          </ul>
          <span aria-hidden="true">→</span>
          <strong>
            Long-term impact<small>What changed, with context</small>
          </strong>
        </div>
      </section>

      <section
        className="editorial-section research-section"
        id="research-basis"
      >
        <SectionIntro content={landingStory.researchBasis} />
        <ol className="research-source-list">
          {landingResearchSources.map((source, index) => (
            <li key={source.url}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <a href={source.url} rel="noreferrer" target="_blank">
                  {source.label}
                </a>
                <small>{source.publisher}</small>
                <p>{source.supports}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
