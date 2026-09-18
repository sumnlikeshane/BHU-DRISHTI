import React from "react"

export const Section05Scale: React.FC = () => {
  return (
    <section id="scale" className="relative py-24 sm:py-32 px-6 sm:px-12 bg-[#F6F3EC] text-[#1F1E1B] border-b border-[#E5DFD3] overflow-hidden">
      <div className="max-w-[92rem] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5DFD3] pb-8 mb-14 gap-6">
          <div>
            <div className="font-mono text-xs text-[#244A29] tracking-widest uppercase font-semibold mb-3">
              05 · PROGRAMME SCALE
            </div>
            <h2 className="font-sans text-4xl sm:text-6xl font-light tracking-[-0.03em] uppercase text-[#1F1E1B]">
              THE SCALE
            </h2>
          </div>
          <p className="font-mono text-xs text-[#59544B] max-w-md uppercase tracking-wider leading-relaxed">
            WDC-PMKSY 2.0 evidence estate as reported by the Government of India on 1 September 2026. Beyond expenditure: evaluating water, land productivity, and farmer livelihoods.
          </p>
        </div>

        {/* 12-Column Grid: Left Stats + Right National Watershed Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          {/* Left Stats Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Primary Hero Stat Card */}
            <div className="bg-[#F0EBE1] p-8 sm:p-10 rounded-[8px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#787165] uppercase tracking-wider mb-6">
                  <span>SANCTIONED PROGRAMME OUTPUTS</span>
                  <span>PIB SNAPSHOT: 1 SEP 2026</span>
                </div>
                <div className="font-sans text-6xl sm:text-8xl font-extralight tracking-tight leading-none text-[#1F1E1B] mb-4">
                  1,220
                </div>
                <h3 className="font-sans text-xl sm:text-2xl font-light text-[#1F1E1B] uppercase tracking-wide">
                  SANCTIONED WATERSHED PROJECTS
                </h3>
                <p className="mt-3 font-sans text-xs sm:text-sm text-[#59544B] font-light leading-relaxed max-w-xl">
                  Distributed across 28 states and union territories. Making the existing evidence chain comparable, explainable, and operationally reviewable.
                </p>
              </div>

              <div className="mt-8 pt-4 font-mono text-xs text-[#787165] flex flex-wrap justify-between gap-4 border-t border-[#DDD6C7]/50">
                <span>PRIMARY SOURCE: MINISTRY OF RURAL DEVELOPMENT</span>
                <span className="text-[#244A29] font-medium">FIXED CITED SNAPSHOT</span>
              </div>
            </div>

            {/* 2-Column Split: Treatment Area & Physical Assets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Sanctioned Treatment Area */}
              <div className="bg-[#F0EBE1] p-6 sm:p-7 rounded-[8px] flex flex-col justify-between shadow-xs">
                <div>
                  <div className="font-mono text-[10px] text-[#244A29] font-bold uppercase tracking-wider mb-2">
                    02 / SANCTIONED TREATMENT AREA
                  </div>
                  <div className="font-sans text-4xl sm:text-5xl font-light tracking-tight text-[#1F1E1B]">
                    52.93 LAKH HA
                  </div>
                  <div className="mt-2 font-sans text-xs font-light text-[#59544B]">
                    Treatment area covered across rainfed agricultural basins under uniform standards.
                  </div>
                </div>
                <div className="mt-6 font-mono text-[10px] text-[#787165]">
                  INTERVENTION UNITS MAPPED
                </div>
              </div>

              {/* Water Structures */}
              <div className="bg-[#F0EBE1] p-6 sm:p-7 rounded-[8px] flex flex-col justify-between shadow-xs">
                <div>
                  <div className="font-mono text-[10px] text-[#244A29] font-bold uppercase tracking-wider mb-2">
                    03 / PHYSICAL ASSETS
                  </div>
                  <div className="font-sans text-4xl sm:text-5xl font-light tracking-tight text-[#1F1E1B]">
                    1.24 LAKH
                  </div>
                  <div className="mt-2 font-sans text-xs font-light text-[#59544B]">
                    Water-harvesting structures constructed or rejuvenated across India.
                  </div>
                </div>
                <div className="mt-6 font-mono text-[10px] text-[#787165]">
                  CHECK DAMS, FARM PONDS &amp; BUNDS
                </div>
              </div>
            </div>
          </div>

          {/* Right National Watershed Map Frame (5 cols) */}
          <div className="lg:col-span-5 bg-[#F0EBE1] rounded-[8px] p-6 sm:p-8 flex flex-col justify-between shadow-xs overflow-hidden">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#59544B] pb-3 mb-4 border-b border-[#DDD6C7]/50">
                <span className="font-semibold text-[#1F1E1B]">NATIONAL BASIN CARTOGRAPHY</span>
                <span className="text-[#244A29]">28 STATES &amp; UTs</span>
              </div>

              {/* High-Resolution India Watershed Coverage Map Image */}
              <div className="relative rounded-[6px] overflow-hidden bg-[#EAE4D7] shadow-inner group">
                <img
                  src="/images/watershed/india-watershed-map.jpg"
                  alt="India National Watershed Conservation and River Basin Map"
                  className="w-full h-80 sm:h-96 object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#FAF7F2]/90 backdrop-blur-sm p-2.5 rounded text-[10px] font-mono text-[#59544B] flex justify-between">
                  <span>● 1,220 WATERSHED PROJECTS</span>
                  <span className="text-[#244A29] font-semibold">100% AUDIT TRAIL</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex justify-between font-mono text-[10px] text-[#787165] border-t border-[#DDD6C7]/50">
              <span>MAHARASHTRA · MP · RAJASTHAN · KARNATAKA</span>
              <span>SCALE: 1:5,000,000</span>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F0EBE1] p-6 sm:p-8 rounded-[8px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="font-mono text-[10px] text-[#787165] uppercase tracking-wider font-semibold">
                04 / LIVELIHOOD OUTCOME
              </div>
              <div className="font-sans text-4xl sm:text-5xl font-light text-[#1F1E1B] mt-1">
                28.50 LAKH
              </div>
              <div className="font-sans text-xs text-[#59544B] font-light mt-1">
                FARMERS BENEFITED ACROSS RAINFED REGIONS
              </div>
            </div>
            <div className="font-mono text-xs text-[#244A29] font-medium bg-[#E8E2D5] px-3 py-1.5 rounded-[4px]">
              GROUNDWATER RECHARGE
            </div>
          </div>

          <div className="bg-[#F0EBE1] p-6 sm:p-8 rounded-[8px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="font-mono text-[10px] text-[#787165] uppercase tracking-wider font-semibold">
                05 / FINANCIAL OUTLAY
              </div>
              <div className="font-sans text-4xl sm:text-5xl font-light text-[#1F1E1B] mt-1">
                ₹12,404 CR
              </div>
              <div className="font-sans text-xs text-[#59544B] font-light mt-1">
                TOTAL CENTRAL &amp; STATE INVESTMENT
              </div>
            </div>
            <div className="font-mono text-xs text-[#244A29] font-medium bg-[#E8E2D5] px-3 py-1.5 rounded-[4px]">
              AUDITABLE EXPENDITURE
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
