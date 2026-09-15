import { ArchitectureBento } from './components/ArchitectureBento'
import { CleanFooter } from './components/CleanFooter'
import { ImpactGrid } from './components/ImpactGrid'
import { LiveQueuePreview } from './components/LiveQueuePreview'
import { VerificationMatrix } from './components/VerificationMatrix'
import { VideoHero } from './components/VideoHero'

export function LandingPage() {
  return (
    <div
      className="landing-page min-h-screen bg-[#06080a] text-white selection:bg-emerald-500/30 selection:text-emerald-200"
      id="top"
    >
      <a className="skip-link" href="#about">
        Skip to main content
      </a>

      <main id="main-content">
        {/* Exact Reference Hero Section with background video & pixel dither */}
        <VideoHero />

        {/* Layer 1-2-3 Architecture (Drishti -> Srishti -> BHU-DRISHTI) */}
        <ArchitectureBento />

        {/* 4 Biophysical Verification Pillars (SAR, Optical, DEM, Photo Forensics) */}
        <VerificationMatrix />

        {/* Live Case Inspection & Queue Preview */}
        <LiveQueuePreview />

        {/* Operational Impact & Scale */}
        <ImpactGrid />
      </main>

      {/* Clean Dark Studio Footer */}
      <CleanFooter />
    </div>
  )
}
