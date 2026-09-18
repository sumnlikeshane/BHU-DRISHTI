import React from "react"

export const Section03Reasoning: React.FC = () => {
  return (
    <section id="reasoning" className="relative py-24 sm:py-32 px-6 sm:px-12 bg-[#F6F3EC] text-[#1F1E1B] border-b border-[#E5DFD3] overflow-hidden">
      <div className="max-w-[92rem] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5DFD3] pb-8 mb-14 gap-6">
          <div>
            <div className="font-mono text-xs text-[#244A29] tracking-widest uppercase font-semibold mb-3">
              03 · EXPLAINABLE REASONING
            </div>
            <h2 className="font-sans text-4xl sm:text-6xl font-light tracking-[-0.03em] uppercase text-[#1F1E1B]">
              THE REASONING
            </h2>
          </div>
          <p className="font-mono text-xs text-[#59544B] max-w-md uppercase tracking-wider leading-relaxed">
            No single "watershed health score" that hides uncertainty. BHU-DRISHTI builds structured evidence packets that separate observations from inferences and authorized actions.
          </p>
        </div>

        {/* 4 Connected Reasoning Pipeline Stages - Clean Borderless Surfaces */}
        <div className="relative mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Level 1: Observation */}
            <div className="bg-[#F0EBE1] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] text-[#787165] uppercase tracking-wider font-semibold">LEVEL 01 / OBSERVATION</span>
                  <span className="w-5 h-5 rounded-full bg-[#E4DDD0] flex items-center justify-center font-mono text-[10px] text-[#1F1E1B] font-bold">1</span>
                </div>
                <h3 className="font-sans text-xl font-normal text-[#1F1E1B] mb-2">Recorded Observation</h3>
                <p className="font-sans text-xs sm:text-sm text-[#59544B] font-light leading-relaxed my-3">
                  &ldquo;Geo-coded photograph for work MH-NSK-0427 captured at 11:24 IST with calibrated compass bearing.&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-2 font-mono text-[10px] text-[#244A29] font-medium flex justify-between">
                <span>DEFENSIBILITY</span>
                <span>WORK ID &amp; AUDIT LOG</span>
              </div>
            </div>

            {/* Level 2: Derived Signal */}
            <div className="bg-[#F0EBE1] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] text-[#787165] uppercase tracking-wider font-semibold">LEVEL 02 / SIGNAL</span>
                  <span className="w-5 h-5 rounded-full bg-[#E4DDD0] flex items-center justify-center font-mono text-[10px] text-[#1F1E1B] font-bold">2</span>
                </div>
                <h3 className="font-sans text-xl font-normal text-[#1F1E1B] mb-2">Derived Signal</h3>
                <p className="font-sans text-xs sm:text-sm text-[#59544B] font-light leading-relaxed my-3">
                  &ldquo;Model marked visible siltation cue; season-matched McFeeters open-water NDWI declined by 0.18.&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-2 font-mono text-[10px] text-[#244A29] font-medium flex justify-between">
                <span>DEFENSIBILITY</span>
                <span>FORMULA &amp; QUALITY MASK</span>
              </div>
            </div>

            {/* Level 3: Assessment */}
            <div className="bg-[#F0EBE1] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] text-[#787165] uppercase tracking-wider font-semibold">LEVEL 03 / ASSESSMENT</span>
                  <span className="w-5 h-5 rounded-full bg-[#E4DDD0] flex items-center justify-center font-mono text-[10px] text-[#1F1E1B] font-bold">3</span>
                </div>
                <h3 className="font-sans text-xl font-normal text-[#1F1E1B] mb-2">Assessment</h3>
                <p className="font-sans text-xs sm:text-sm text-[#59544B] font-light leading-relaxed my-3">
                  &ldquo;Signals consistent with sediment buildup; rainfall anomaly (+24%) explains rapid sediment yield.&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-2 font-mono text-[10px] text-[#244A29] font-medium flex justify-between">
                <span>DEFENSIBILITY</span>
                <span>BASELINE &amp; REFERENCE AREA</span>
              </div>
            </div>

            {/* Level 4: Action */}
            <div className="bg-[#E4ECD5] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] text-[#244A29] uppercase tracking-wider font-bold">LEVEL 04 / ACTION</span>
                  <span
                    className="w-5 h-5 rounded-full bg-[#244A29] text-[#FAF7F2] !text-[#FAF7F2] flex items-center justify-center font-mono text-[10px] font-bold"
                    style={{ color: '#FAF7F2' }}
                  >
                    4
                  </span>
                </div>
                <h3 className="font-sans text-xl font-normal text-[#1C3B20] mb-2">Authorised Action</h3>
                <p className="font-sans text-xs sm:text-sm text-[#2E4A28] font-medium leading-relaxed my-3">
                  &ldquo;Field verification by block engineer recommended. Case routed to priority desiltation schedule.&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-2 font-mono text-[10px] text-[#244A29] font-semibold flex justify-between">
                <span>DEFENSIBILITY</span>
                <span>ACCOUNTABLE HUMAN ROLE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual NIST AI RMF 1.0 Blueprint - Open Architectural Canvas */}
        <div className="bg-[#F0EBE1] rounded-[8px] p-8 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 gap-3 border-b border-[#DDD6C7]/50">
            <div className="font-mono text-xs font-semibold text-[#1F1E1B] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#244A29]" />
              <span>THE EVIDENCE PACKET SPECIFICATION</span>
            </div>
            <div className="font-mono text-[11px] text-[#787165]">
              NIST AI RMF 1.0 ALIGNED · SAFE ABSTENTION PROTOCOL
            </div>
          </div>

          {/* Architectural Diagram Schematic - Borderless Clean Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
            {/* Box 1: Multi-Source Inputs */}
            <div className="p-5 bg-[#E8E2D5]/70 rounded-[6px] flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-[#244A29] font-bold uppercase mb-2">1. INGESTION MATRIX</div>
                <div className="text-sm font-sans font-medium text-[#1F1E1B] mb-3">Multi-Source Evidence</div>
                <ul className="space-y-1.5 text-[11px] text-[#59544B]">
                  <li className="flex items-center gap-1.5">● Ground: Drishti Work Photos &amp; Azimuth</li>
                  <li className="flex items-center gap-1.5">● Satellite: Bhuvan / Sentinel-2 Optical + SAR</li>
                  <li className="flex items-center gap-1.5">● Hydro: 30m DEM Elevation Vectors</li>
                  <li className="flex items-center gap-1.5">● Climate: IMD Gridded Rainfall Series</li>
                </ul>
              </div>
              <div className="mt-4 pt-2 text-[10px] text-[#787165]">PROVENANCE PRESERVED</div>
            </div>

            {/* Box 2: Safe Abstention Gate */}
            <div className="p-5 bg-[#E8E2D5]/70 rounded-[6px] flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-[#D97706] font-bold uppercase mb-2">2. GUARDRAIL CIRCUIT</div>
                <div className="text-sm font-sans font-medium text-[#1F1E1B] mb-3">Safe Abstention Gate</div>
                <ul className="space-y-1.5 text-[11px] text-[#59544B]">
                  <li className="flex items-center gap-1.5">● GPS Drift Threshold: Flags if &gt;15m</li>
                  <li className="flex items-center gap-1.5">● Cloud Mask: Rejects if pixel obscured</li>
                  <li className="flex items-center gap-1.5">● Out-of-Domain Detection: Uncalibrated soils</li>
                  <li className="flex items-center gap-1.5">● Zero Hallucination: Refuses blind scores</li>
                </ul>
              </div>
              <div className="mt-4 pt-2 text-[10px] text-[#787165]">STRICT CONFIDENCE GATES</div>
            </div>

            {/* Box 3: Accountable Triage Dispatch */}
            <div className="p-5 bg-[#E8E2D5]/70 rounded-[6px] flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-[#244A29] font-bold uppercase mb-2">3. ACTIONABLE ROUTING</div>
                <div className="text-sm font-sans font-medium text-[#1F1E1B] mb-3">Operational Triage</div>
                <ul className="space-y-1.5 text-[11px] text-[#59544B]">
                  <li className="flex items-center gap-1.5">● Recollect Evidence (Surveyor Task)</li>
                  <li className="flex items-center gap-1.5">● Analyst Review (GIS Specialist Queue)</li>
                  <li className="flex items-center gap-1.5">● Field Inspection (Block Engineer Priority)</li>
                  <li className="flex items-center gap-1.5">● Routine Monitoring (Quarterly Cycle)</li>
                </ul>
              </div>
              <div className="mt-4 pt-2 text-[10px] text-[#787165]">ACCOUNTABLE HUMAN REVIEW</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
