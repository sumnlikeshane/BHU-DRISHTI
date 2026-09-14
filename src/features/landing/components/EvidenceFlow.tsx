import { landingStory } from '../content/landingStory'

function EvidenceGlyph({ index }: { index: number }) {
  if (index === 0) {
    return (
      <span className="evidence-glyph evidence-glyph--field" aria-hidden="true">
        <i />
        <b />
      </span>
    )
  }
  if (index === 1) {
    return (
      <span
        className="evidence-glyph evidence-glyph--satellite"
        aria-hidden="true"
      >
        <i />
        <b />
        <em />
      </span>
    )
  }
  if (index === 2) {
    return (
      <span className="evidence-glyph evidence-glyph--rain" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6].map((item) => (
          <i key={item} />
        ))}
      </span>
    )
  }
  return (
    <span className="evidence-glyph evidence-glyph--terrain" aria-hidden="true">
      <i />
      <b />
      <em />
    </span>
  )
}

export function EvidenceInputs() {
  return (
    <ol className="evidence-inputs">
      {landingStory.evidence.inputs.map((input, index) => (
        <li key={input.title}>
          <div className="evidence-input__topline">
            <span aria-hidden="true">{input.symbol}</span>
            <small>
              {index === 0
                ? 'Observation'
                : index === 1
                  ? 'Landscape signal'
                  : index === 2
                    ? 'Climate context'
                    : 'Physical context'}
            </small>
          </div>
          <EvidenceGlyph index={index} />
          <h3>{input.title}</h3>
          <p>{input.body}</p>
        </li>
      ))}
    </ol>
  )
}

export function EvidenceFlow() {
  return (
    <div className="evidence-flow" aria-label="Evidence fusion flow">
      <div className="fusion-sources">
        {landingStory.evidence.inputs.map((input, index) => (
          <div key={input.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <strong>{input.title}</strong>
          </div>
        ))}
      </div>
      <svg aria-hidden="true" className="fusion-lines" viewBox="0 0 180 220">
        <path d="M0 20 C82 20 72 110 180 110" />
        <path d="M0 80 C80 80 72 110 180 110" />
        <path d="M0 140 C80 140 72 110 180 110" />
        <path d="M0 200 C82 200 72 110 180 110" />
      </svg>
      <div className="fusion-node">
        <p>Evidence fusion</p>
        <span>Validate + align</span>
        <span>Compare baseline</span>
        <span>Expose contradictions</span>
      </div>
      <span className="flow-connector" aria-hidden="true">
        →
      </span>
      <div className="fusion-output">
        <p>Review case</p>
        <strong>Possible site issue</strong>
        <small>Evidence packet + inspection task · Illustrative demo</small>
        <span>Insufficient evidence remains a valid output</span>
      </div>
    </div>
  )
}
