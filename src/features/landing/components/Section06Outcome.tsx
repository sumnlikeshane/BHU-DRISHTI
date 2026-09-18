import React from 'react'

export const Section06Outcome: React.FC = () => {
  return (
    <section id="outcome" className="relative py-28 px-6 sm:px-12 bg-[#FAF7F2] text-[#1F1E1B] border-t border-[#E7E2D6]">
      <div className="max-w-[92rem] mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-[#244A29] tracking-widest uppercase font-semibold mb-3">
            06 · OPERATIONAL SHIFT
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl font-light tracking-[-0.03em] uppercase text-[#1F1E1B]">
            THE OUTCOME
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#59544B] font-light leading-relaxed">
            Field surveyors capture ground reality. BHU-DRISHTI synthesizes their observations with satellite passes and precipitation history to populate an actionable review queue.
          </p>
        </div>

        {/* Parallel Comparison: Direct & Human */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pt-8 border-t border-[#D8D2C5] mb-24">
          {/* Column 1: Conventional GIS */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#787165] uppercase tracking-wider font-semibold">
              Conventional GIS Mapping
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl font-light text-[#1F1E1B]">
              Coordinate points on aerial imagery
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#59544B] font-light leading-relaxed">
              Plots photo coordinates on satellite tiles. Watershed officers must click through thousands of unranked pins without slope calculations, catchment context, or precipitation history.
            </p>
            <div className="pt-2 font-mono text-xs text-[#8C8475]">
              Result: High cognitive burden and delayed seasonal audits
            </div>
          </div>

          {/* Column 2: BHU-DRISHTI */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#244A29] uppercase tracking-wider font-semibold">
              BHU-DRISHTI Decision Support
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl font-light text-[#1F1E1B]">
              Triage queues with plain-language evidence
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#3C3831] font-light leading-relaxed">
              Synthesizes 30m DEM slope, 14-to-60 day precipitation anomalies, computer vision cues, and multi-spectral open-water NDWI into prioritized case files with clear operational next steps.
            </p>
            <div className="pt-2 font-mono text-xs text-[#244A29] font-medium">
              Result: Explainable triage in minutes under human authority
            </div>
          </div>
        </div>

        {/* Final Open Call to Action */}
        <div className="pt-16 border-t border-[#D8D2C5] max-w-3xl">
          <div className="font-mono text-xs text-[#244A29] uppercase tracking-widest font-semibold mb-3">
            WDC-PMKSY 2.0 DECISION SUPPORT
          </div>

          <h3 className="font-sans text-3xl sm:text-5xl font-light tracking-tight text-[#1F1E1B] uppercase leading-tight mb-6">
            ENTER THE COMMAND CENTRE
          </h3>

          <p className="font-sans text-base sm:text-lg text-[#59544B] font-light leading-relaxed mb-8">
            Access the live queue, inspect geotagged structure evidence packets, and test accountable watershed decision support across India&apos;s rainfed agricultural basins.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/command-centre"
              className="px-8 py-4 bg-[#244A29] hover:bg-[#1C3B20] text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-[4px] transition-all duration-200 shadow-sm flex items-center gap-2"
            >
              <span>ACCESS COMMAND CENTRE</span>
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="/login"
              className="px-8 py-4 bg-[#F2EDE2] hover:bg-[#EAE4D7] text-[#1F1E1B] font-mono text-xs uppercase tracking-widest font-medium rounded-[4px] transition-all duration-200"
            >
              OFFICER LOGIN
            </a>
          </div>

          <div className="pt-8 text-xs font-mono text-[#8C8475]">
            Smart India Hackathon 2026 · Problem Statement SIH26015
          </div>
        </div>
      </div>
    </section>
  )
}