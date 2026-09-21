import { CinematicFooter } from './components/CinematicFooter'
import { CinematicNav } from './components/CinematicNav'
import { CinematicVideoHero } from './components/CinematicVideoHero'
import { SectionEcosystemFlow } from './components/SectionEcosystemFlow'
import { SectionValueProposition } from './components/SectionValueProposition'
import { Section01Land } from './components/Section01Land'
import { Section02Evidence } from './components/Section02Evidence'
import { Section03Reasoning } from './components/Section03Reasoning'
import { Section04Decision } from './components/Section04Decision'
import { Section05Scale } from './components/Section05Scale'
import { Section06Outcome } from './components/Section06Outcome'

export function LandingPage() {
  return (
    <div
      className="landing-page min-h-screen bg-[#FAF7F2] text-[#1F1E1B] antialiased selection:bg-[#244A29] selection:text-white"
      id="top"
    >
      <a
        className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#244A29] focus:text-[#FAF7F2] font-mono text-xs"
        href="#ecosystem"
      >
        Skip to main content
      </a>

      {/* 1. Transparent Floating Navigation */}
      <CinematicNav />

      <main id="main-content">
        {/* 2. Full-Screen Cinematic Video Hero (Lithosquare Composition) */}
        <CinematicVideoHero />

        {/* 3. Drishti -> Bhuvan -> BHU-DRISHTI Stepped Ecosystem Flow */}
        <SectionEcosystemFlow />

        {/* 4. Core Value Proposition: Redefining Watershed Verification (4 Specimen Cards) */}
        <SectionValueProposition />

        {/* 5. Section 01: The Land (Physical Landscape & Drainage) */}
        <Section01Land />

        {/* 4. Section 02: The Evidence (Multi-Layer Spatial Convergence) */}
        <Section02Evidence />

        {/* 5. Section 03: The Reasoning (Computer Vision & Contextual Synthesis) */}
        <Section03Reasoning />

        {/* 6. Section 04: The Decision (4 Operational Review States) */}
        <Section04Decision />

        {/* 7. Section 05: The Scale (WDC-PMKSY 2.0 National Footprint) */}
        <Section05Scale />

        {/* 8. Section 06: The Outcome (WHERE + WHAT -> WHY + WHAT NEXT) */}
        <Section06Outcome />
      </main>

      {/* 9. Minimal Technical Footer */}
      <CinematicFooter />
    </div>
  )
}
