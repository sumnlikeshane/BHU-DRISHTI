import React from 'react'

export const SectionEcosystemFlow: React.FC = () => {
  return (
    <section id="ecosystem" className="relative py-28 px-6 sm:px-12 bg-[#FAF7F2] text-[#1F1E1B] overflow-hidden border-b border-[#E7E2D6]">
      <div className="max-w-[92rem] mx-auto">
        {/* Section Header with exact content from reference */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFEAE0] border border-[#DDD7CA] text-[#787165] font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold rounded-xs mb-5">
            EXISTING-SYSTEM ROLE
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-light text-[#1F1E1B] tracking-[-0.03em] leading-[1.15]">
            Hydrologists and AI working together. <br className="hidden sm:inline" />
            From data to discovery.
          </h2>

          <p className="mt-6 text-sm sm:text-base text-[#59544B] font-light leading-relaxed max-w-2xl mx-auto">
            Integrate through records, not a replacement platform. The proposed architecture consumes work-linked field observations and authorised geospatial layers, preserving their provenance to return explainable review cases.
          </p>

          <p className="mt-2 text-xs text-[#8C8475] font-mono max-w-xl mx-auto">
            The prototype demonstrates this contract; it does not claim access to or live integration with government systems.
          </p>
        </div>

        {/* 3 Stepped Cards with Connecting Curves and Data Exchange Labels */}
        <div className="relative">
          {/* Desktop SVG Connecting Bezier Curves with Flow Labels */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0" aria-hidden="true">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 450">
              {/* Curve from Card 1 (x: ~360, y: ~160) to Card 2 (x: ~440, y: ~270) */}
              <path
                d="M 360 160 C 400 160, 400 270, 440 270"
                fill="none"
                stroke="#D1CABF"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Curve from Card 2 (x: ~760, y: ~270) to Card 3 (x: ~840, y: ~160) */}
              <path
                d="M 760 270 C 800 270, 800 160, 840 160"
                fill="none"
                stroke="#D1CABF"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
            {/* Card 01: WORK-LINKED RECORD (Drishti Field Observation) */}
            <div className="relative bg-[#F3EFE6] border border-[#DDD7CA] p-8 sm:p-9 rounded-[8px] shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Faint Cartographic Contour Background Texture */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 300 300">
                  <path d="M-20,40 Q80,120 180,50 T320,110" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-20,90 Q90,170 190,100 T320,160" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-20,140 Q100,220 200,150 T320,210" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-20,190 Q110,270 210,200 T320,260" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Card Top Meta */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#787165]">
                <div className="px-2.5 py-0.5 border border-[#C9C2B3] rounded-[4px] text-[10px] font-semibold tracking-wider uppercase">
                  WORK-LINKED RECORD
                </div>
                <span className="text-[10px] text-[#8C8475]">/ 01</span>
              </div>

              {/* Title & Body */}
              <div className="relative z-10 mt-7">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-sans text-3xl sm:text-4xl font-light text-[#1F1E1B] tracking-tight">
                    Target
                  </h3>
                  <span className="font-mono text-xs text-[#8C8475] uppercase">· Ground Truth</span>
                </div>
                <p className="mt-4 font-sans text-sm text-[#59544B] font-light leading-relaxed">
                  We combine fragmented field records into a unified biophysical framework. Consumes work-linked photographs and mobile surveyor tags recorded via Drishti, preserving original identifiers, camera compass azimuth, and GPS timestamp provenance.
                </p>
              </div>

              {/* Card Bottom Tag */}
              <div className="relative z-10 mt-8 pt-4 border-t border-[#DDD7CA] flex items-center justify-between font-mono text-[11px] text-[#8C8475]">
                <span>DRISHTI GROUND TRUTH</span>
                <span className="text-[#1F1E1B] font-medium">PROVENANCE LOCKED</span>
              </div>
            </div>

            {/* Card 02: AUTHORISED SPATIAL EVIDENCE (Bhuvan / SRISHTI) - Stepped Lower */}
            <div className="relative bg-[#F3EFE6] border border-[#DDD7CA] p-8 sm:p-9 rounded-[8px] shadow-sm hover:shadow-md transition-shadow lg:translate-y-20 overflow-hidden">
              {/* Faint Cartographic Contour Background Texture */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 300 300">
                  <path d="M-10,30 Q90,90 200,40 T310,90" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-10,80 Q100,140 210,90 T310,140" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-10,130 Q110,190 220,140 T310,190" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-10,180 Q120,240 230,190 T310,240" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Card Top Meta */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#787165]">
                <div className="px-2.5 py-0.5 border border-[#C9C2B3] rounded-[4px] text-[10px] font-semibold tracking-wider uppercase">
                  AUTHORISED SPATIAL EVIDENCE
                </div>
                <span className="text-[10px] text-[#8C8475]">/ 02</span>
              </div>

              {/* Title & Body */}
              <div className="relative z-10 mt-7">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-sans text-3xl sm:text-4xl font-light text-[#1F1E1B] tracking-tight">
                    Discover
                  </h3>
                  <span className="font-mono text-xs text-[#8C8475] uppercase">· Evidence</span>
                </div>
                <p className="mt-4 font-sans text-sm text-[#59544B] font-light leading-relaxed">
                  We construct dynamic 3D hydrological scenarios across ISRO Bhuvan satellite passes, 30m DEM slope models, and Sentinel radar backscatter to resolve verification uncertainty at zero additional field cost.
                </p>
              </div>

              {/* Card Bottom Tag */}
              <div className="relative z-10 mt-8 pt-4 border-t border-[#DDD7CA] flex items-center justify-between font-mono text-[11px] text-[#8C8475]">
                <span>ISRO BHUVAN CONTEXT</span>
                <span className="text-[#1F1E1B] font-medium">AUTHORISED RASTERS</span>
              </div>
            </div>

            {/* Card 03: PROPOSED INTELLIGENCE LAYER (BHU-DRISHTI) */}
            <div className="relative bg-[#F3EFE6] border border-[#DDD7CA] p-8 sm:p-9 rounded-[8px] shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Faint Cartographic Contour Background Texture */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 300 300">
                  <path d="M-20,50 Q80,110 180,60 T320,100" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-20,100 Q90,160 190,110 T320,150" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-20,150 Q100,210 200,160 T320,200" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-20,200 Q110,260 210,210 T320,250" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Card Top Meta */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#787165]">
                <div className="px-2.5 py-0.5 border border-[#1F1E1B] bg-[#1F1E1B] text-white rounded-[4px] text-[10px] font-semibold tracking-wider uppercase">
                  PROPOSED INTELLIGENCE LAYER
                </div>
                <span className="text-[10px] text-[#8C8475]">/ 03</span>
              </div>

              {/* Title & Body */}
              <div className="relative z-10 mt-7">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-sans text-3xl sm:text-4xl font-light text-[#1F1E1B] tracking-tight">
                    Delineate
                  </h3>
                  <span className="font-mono text-xs text-[#8C8475] uppercase">· Action</span>
                </div>
                <p className="mt-4 font-sans text-sm text-[#59544B] font-light leading-relaxed">
                  Every new spatial intercept instantly updates active watershed scenarios. Fuses ground truth and satellite observations through spatio-temporal reasoning, collapsing uncertainty into four accountable review queues.
                </p>

                {/* Accountable Workflow Pill */}
                <div className="mt-5 p-3 bg-[#EAE4D7] border border-[#D5CDBE] rounded-[4px] font-mono text-xs">
                  <div className="text-[10px] text-[#787165] uppercase font-semibold">ACCOUNTABLE WORKFLOW</div>
                  <div className="text-[#1F1E1B] font-medium mt-0.5">
                    Review case + human decision
                  </div>
                </div>
              </div>

              {/* Card Bottom Tag */}
              <div className="relative z-10 mt-6 pt-4 border-t border-[#DDD7CA] flex items-center justify-between font-mono text-[11px] text-[#8C8475]">
                <span>EXPLAINABLE OUTPUT</span>
                <span className="text-[#1F1E1B] font-medium">ACTION DIRECTIVES</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Centered CTA Buttons with Earthy Forest Green */}
        <div className="mt-28 sm:mt-36 flex items-center justify-center gap-2">
          <a
            href="/command-centre"
            className="px-6 py-3.5 bg-[#244A29] hover:bg-[#1C3B20] text-[#FAF7F2] !text-[#FAF7F2] font-sans text-xs font-semibold tracking-[0.14em] uppercase rounded-[4px] transition-colors shadow-sm"
            style={{ color: '#FAF7F2' }}
          >
            EXPLORE COMMAND CENTRE
          </a>

          <a
            href="#value-proposition"
            className="w-[42px] h-[42px] bg-[#244A29] hover:bg-[#1C3B20] text-[#FAF7F2] flex items-center justify-center rounded-[4px] transition-colors shadow-sm"
            aria-label="Scroll to value proposition"
            style={{ color: '#FAF7F2' }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FAF7F2"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
