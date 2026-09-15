import { ArcBandsBackground } from '@/components/background-gradient/arc-bands-background'
import { ArchitectureBento } from './components/ArchitectureBento'
import { CleanFooter } from './components/CleanFooter'
import { ImpactGrid } from './components/ImpactGrid'
import { LiveQueuePreview } from './components/LiveQueuePreview'
import { VerificationMatrix } from './components/VerificationMatrix'
import { VideoHero } from './components/VideoHero'

export function LandingPage() {
  return (
    <div
      className="landing-page min-h-screen bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white"
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

        {/* National Milestone Celebration Section with ArcBandsBackground */}
        <section id="celebrate" aria-label="Milestone Celebration" className="border-t border-neutral-200">
          <ArcBandsBackground className="min-h-screen p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
              <span className="uppercase tracking-wider font-semibold text-neutral-900">
                /06 · National Milestone
              </span>
              <span>PMKSY-WDC 2.0 PROTOCOL</span>
            </div>

            <div className="max-w-3xl my-auto py-12">
              <div className="font-mono text-xs text-emerald-700 uppercase tracking-widest font-semibold mb-3">
                WDC-PMKSY 2.0 Programme Milestone
              </div>
              <h1
                aria-hidden="true"
                className="font-sans text-6xl sm:text-8xl md:text-9xl font-light tracking-tight text-neutral-950 leading-none"
              >
                Celebrate
              </h1>
              <h2 className="sr-only">Celebrate Watershed Verification Success</h2>
              <p className="mt-6 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-xl">
                1,220 sanctioned projects across 52.93 lakh hectares and 1.24 lakh water-harvesting
                structures created or revived for 28.50 lakh farmers. Moving from limited manual review
                toward explainable, evidence-based prioritisation across India.
              </p>
              <div className="mt-8">
                <a
                  href="/command-centre"
                  className="group inline-flex items-center gap-1.5 font-sans text-sm font-medium text-neutral-950 hover:text-neutral-600 transition-colors"
                >
                  <span>Access Live Command Centre</span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-300/40 pt-6 font-mono text-xs text-neutral-500">
              <div>BHU-DRISHTI · DECISION SUPPORT SYSTEM</div>
              <div>SMART INDIA HACKATHON 2026 · PROBLEM SIH26015</div>
            </div>
          </ArcBandsBackground>
        </section>
      </main>

      {/* Clean Dark Studio Footer */}
      <CleanFooter />
    </div>
  )
}
