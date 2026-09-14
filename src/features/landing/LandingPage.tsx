import { SiteHeader } from './components/SiteHeader'
import { ClosingIndiaSection, SiteFooter } from './sections/ClosingIndiaSection'
import { EvidenceFusionSection } from './sections/EvidenceFusionSection'
import { ImpactSection } from './sections/ImpactSection'
import { MonitoringGapSection } from './sections/MonitoringGapSection'
import { PinnedMapStory } from './sections/PinnedMapStory'
import { ProductSection } from './sections/ProductSection'
import { WorkflowSection } from './sections/WorkflowSection'

export function LandingPage() {
  return (
    <div className="landing-page" id="top">
      <a className="skip-link" href="#static-story">
        Skip interactive map story
      </a>
      <SiteHeader />

      <main>
        <PinnedMapStory />
        <div id="static-story" tabIndex={-1}>
          <MonitoringGapSection />
          <EvidenceFusionSection />
          <ImpactSection />
          <WorkflowSection />
          <ProductSection />
          <ClosingIndiaSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
