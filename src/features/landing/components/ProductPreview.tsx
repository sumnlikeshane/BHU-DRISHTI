import { demoScenario } from '../data/demoScenario'
import { MetricList } from './MetricList'

export function ProductPreview() {
  return (
    <div className="product-frame" aria-label="Illustrative product preview">
      <header>
        <div>
          <span className="product-mark" aria-hidden="true">
            भू
          </span>
          <strong>BHU-DRISHTI workspace</strong>
        </div>
        <span className="mock-banner">Mock data · not a live system</span>
      </header>
      <div className="product-frame__body">
        <aside className="preview-context">
          <p className="micro-label">Geographic overview</p>
          <div className="preview-mini-map">
            <img
              src="/images/india-story-poster.svg"
              alt="Prototype India overview with Maharashtra and Nashik highlighted."
            />
            <span>{demoScenario.district.name}</span>
          </div>
          <strong>{demoScenario.district.name}</strong>
          <small>{demoScenario.state.name}</small>
        </aside>

        <div className="preview-queue">
          <p className="micro-label">Ranked queue · Mock data</p>
          <ol>
            {demoScenario.queue.map((item) => (
              <li
                data-selected={item.site === demoScenario.site.id}
                key={item.site}
              >
                <span>{item.rank}</span>
                <strong>{item.site}</strong>
                <small>{item.status}</small>
              </li>
            ))}
          </ol>
        </div>

        <article className="preview-evidence">
          <div className="preview-evidence__heading">
            <div>
              <p className="micro-label">Selected site · Mock data</p>
              <h3>{demoScenario.site.id}</h3>
              <small>{demoScenario.site.place}</small>
            </div>
            <span className="priority-chip">! High priority</span>
          </div>
          <p className="preview-finding">{demoScenario.site.possibleIssue}</p>
          <MetricList
            metrics={[
              demoScenario.site.metrics[0],
              demoScenario.site.metrics[5],
            ]}
            compact
          />
          <div className="preview-uncertainty">
            <span>Known limits</span>
            <p>
              Rainfall may contribute; image evidence cannot establish internal
              structural condition.
            </p>
          </div>
          <strong className="recommendation">
            {demoScenario.site.recommendation}
          </strong>
        </article>
      </div>
    </div>
  )
}
