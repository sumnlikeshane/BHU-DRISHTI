import { SectionIntro } from '../components/SectionIntro'
import { landingStory } from '../content/landingStory'
import { demoScenario } from '../data/demoScenario'

export function ImpactSection() {
  return (
    <section
      className="editorial-section visual-led-split impact-section"
      id="impact-analysis"
    >
      <SectionIntro content={landingStory.impact} />
      <div
        className="signal-comparison"
        aria-label="Illustrative same-season baseline and current signal comparison"
      >
        <div className="signal-comparison__legend">
          <span>Same-season baseline</span>
          <span>Current window</span>
        </div>
        <div className="signal-row">
          <div>
            <strong>NDVI</strong>
            <span className="data-label data-label--illustrative">
              Illustrative demo
            </span>
          </div>
          <div className="signal-bars">
            <i style={{ '--signal': '.48' } as React.CSSProperties}>0.48</i>
            <i style={{ '--signal': '.36' } as React.CSSProperties}>0.36</i>
          </div>
        </div>
        <div className="signal-row">
          <div>
            <strong>Open-water index</strong>
            <span className="data-label data-label--illustrative">
              McFeeters NDWI · demo
            </span>
          </div>
          <div className="signal-bars">
            <i style={{ '--signal': '.24' } as React.CSSProperties}>0.24</i>
            <i style={{ '--signal': '.14' } as React.CSSProperties}>0.14</i>
          </div>
        </div>
        <div className="rainfall-context">
          <span>Rainfall context</span>
          <strong>{demoScenario.site.metrics[5].value}</strong>
          <span className="data-label data-label--illustrative">
            Illustrative demo
          </span>
          <p>
            Rainfall may explain part of the observed signal. A credible impact
            assessment also needs repeated observations, a comparable reference
            area where feasible, and ground outcomes.
          </p>
        </div>
      </div>
    </section>
  )
}
