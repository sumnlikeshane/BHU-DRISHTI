import React, { useState } from "react"

export const Section01Land: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0)

  const pillars = [
    {
      id: "dem",
      tag: "01 / DIGITAL ELEVATION",
      title: "30m SRISHTI DEM",
      resolution: "30M MSL PIXEL SCALE",
      caption: "A 30m pixel covers ~900m². Context is calculated across drainage reaches and micro-watersheds.",
      meta: "420m - 980m MSL",
      visual: (
        <div className="relative w-full h-36 bg-[#E8E2D5]/50 rounded-[6px] p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center font-mono text-[9px] text-[#787165]">
            <span>SRISHTI DEM · RASTER TILE</span>
            <span className="text-[#244A29] font-semibold">900m² CELL</span>
          </div>
          {/* Topographic Contour Wireframe Graphic */}
          <div className="relative flex-1 flex items-center justify-center my-1">
            <svg className="w-full h-20" viewBox="0 0 240 80">
              <path d="M10,65 Q60,20 120,45 T230,15" fill="none" stroke="#244A29" strokeWidth="2" />
              <path d="M10,72 Q60,35 120,55 T230,30" fill="none" stroke="#688A6E" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M10,80 Q60,50 120,65 T230,45" fill="none" stroke="#A3B8A7" strokeWidth="1.2" />
              {/* 30m Grid Pixel Box Overlay */}
              <rect x="105" y="32" width="28" height="20" fill="#244A29" fillOpacity="0.15" stroke="#244A29" strokeWidth="1.5" strokeDasharray="2 2" />
              <text x="140" y="44" fill="#1F1E1B" fontSize="8" fontFamily="monospace">30×30m Pixel</text>
            </svg>
          </div>
          <div className="flex justify-between font-mono text-[9px] text-[#59544B] pt-1">
            <span>MIN: 420m</span>
            <span>MEAN: 684m</span>
            <span>PEAK: 980m</span>
          </div>
        </div>
      ),
    },
    {
      id: "routing",
      tag: "02 / RUNOFF ROUTING",
      title: "Stream Flow Vectors",
      resolution: "STREAM ORDER: 1 TO 4 REACHES",
      caption: "Steepest descent vector routing models runoff concentration, identifying high-velocity gully corridors.",
      meta: "REACH-MH-42",
      visual: (
        <div className="relative w-full h-36 bg-[#E8E2D5]/50 rounded-[6px] p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center font-mono text-[9px] text-[#787165]">
            <span>DRAINAGE ACCUMULATION</span>
            <span className="text-[#244A29] font-semibold">D8 VECTOR</span>
          </div>
          {/* Stream Network Vector Flow Graphic */}
          <div className="relative flex-1 flex items-center justify-center my-1">
            <svg className="w-full h-20" viewBox="0 0 240 80">
              <path d="M20,10 Q60,25 90,38" fill="none" stroke="#7A9A80" strokeWidth="1.5" />
              <path d="M20,60 Q60,48 90,38" fill="none" stroke="#7A9A80" strokeWidth="1.5" />
              <path d="M90,38 Q140,42 170,40" fill="none" stroke="#244A29" strokeWidth="2.5" />
              <path d="M120,15 Q145,28 170,40" fill="none" stroke="#7A9A80" strokeWidth="1.5" />
              <path d="M170,40 L230,40" fill="none" stroke="#16331A" strokeWidth="3.5" />
              <line x1="195" y1="28" x2="195" y2="52" stroke="#A83B24" strokeWidth="3" />
              <circle cx="195" cy="40" r="3" fill="#A83B24" />
              <text x="180" y="24" fill="#A83B24" fontSize="7.5" fontWeight="bold" fontFamily="monospace">STRUCTURE</text>
            </svg>
          </div>
          <div className="flex justify-between font-mono text-[9px] text-[#59544B] pt-1">
            <span>ORDER 1: HEADWATERS</span>
            <span>ORDER 4: MAIN STEM</span>
          </div>
        </div>
      ),
    },
    {
      id: "catchment",
      tag: "03 / HYDROLOGICAL UNIT",
      title: "Catchment Basins",
      resolution: "TREATMENT: 52.93 LAKH HA",
      caption: "Topographic ridgelines define micro-watershed boundaries, assessing assets within their complete hydrological basin.",
      meta: "GODAVARI-U04",
      visual: (
        <div className="relative w-full h-36 bg-[#E8E2D5]/50 rounded-[6px] p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center font-mono text-[9px] text-[#787165]">
            <span>WATERSHED DELINEATION</span>
            <span className="text-[#244A29] font-semibold">RIDGELINE</span>
          </div>
          {/* Catchment Polygon Graphic */}
          <div className="relative flex-1 flex items-center justify-center my-1">
            <svg className="w-full h-20" viewBox="0 0 240 80">
              <polygon points="30,35 70,12 160,10 215,35 185,70 90,72 30,35" fill="#244A29" fillOpacity="0.08" stroke="#244A29" strokeWidth="1.5" strokeDasharray="4 3" />
              <path d="M70,18 Q120,40 185,70" fill="none" stroke="#244A29" strokeWidth="2" />
              <path d="M150,15 Q145,35 160,50" fill="none" stroke="#688A6E" strokeWidth="1.5" />
              <circle cx="185" cy="70" r="4" fill="#244A29" />
              <text x="135" y="74" fill="#244A29" fontSize="7.5" fontWeight="bold" fontFamily="monospace">POUR POINT</text>
              <text x="80" y="32" fill="#59544B" fontSize="8" fontFamily="sans-serif">Area: 620 ha</text>
            </svg>
          </div>
          <div className="flex justify-between font-mono text-[9px] text-[#59544B] pt-1">
            <span>RIDGE DIVIDE</span>
            <span>CLOSED UNIT</span>
          </div>
        </div>
      ),
    },
    {
      id: "slope",
      tag: "04 / EROSION RISK",
      title: "Slope & Soil Context",
      resolution: "GRADIENT: 0° TO 38° RANGE",
      caption: "Steep slopes and erodible soil identify structures under high hydraulic stress, verifying natural sediment dynamics.",
      meta: "&gt;15° CRITICAL",
      visual: (
        <div className="relative w-full h-36 bg-[#E8E2D5]/50 rounded-[6px] p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center font-mono text-[9px] text-[#787165]">
            <span>SLOPE GRADIENT SPECTRUM</span>
            <span className="text-[#A83B24] font-semibold">18.4° STEEP</span>
          </div>
          {/* Slope Profile Cross-Section */}
          <div className="relative flex-1 flex items-center justify-center my-1">
            <svg className="w-full h-20" viewBox="0 0 240 80">
              <path d="M15,15 L95,45 L170,65 L225,68" fill="none" stroke="#1F1E1B" strokeWidth="2" />
              <polygon points="15,15 95,45 170,65 225,68 225,78 15,78" fill="#DDD6C7" fillOpacity="0.5" />
              <line x1="30" y1="21" x2="80" y2="40" stroke="#A83B24" strokeWidth="3" />
              <text x="50" y="18" fill="#A83B24" fontSize="7.5" fontWeight="bold" fontFamily="monospace">HIGH SEDIMENT (28°)</text>
              <rect x="165" y="55" width="8" height="12" fill="#244A29" />
              <text x="178" y="62" fill="#244A29" fontSize="7" fontWeight="bold" fontFamily="monospace">DAM</text>
            </svg>
          </div>
          <div className="flex justify-between font-mono text-[9px] text-[#59544B] pt-1">
            <span>0°-5° FLAT</span>
            <span>15°-25° MOD</span>
            <span>&gt;25° HIGH</span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="land" className="relative py-24 sm:py-32 px-6 sm:px-12 bg-[#F6F3EC] text-[#1F1E1B] border-b border-[#E5DFD3] overflow-hidden">
      <div className="max-w-[92rem] mx-auto">
        {/* Core Product Thesis Banner */}
        <div className="mb-16 pb-10 border-b border-[#E5DFD3] flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
          <div className="font-sans text-2xl sm:text-3xl md:text-4xl font-light text-[#1F1E1B] leading-snug max-w-3xl">
            Drishti captures the ground. Srishti shows it on a map. <br className="hidden sm:inline" />
            <span className="text-[#244A29] font-normal">BHU-DRISHTI</span> reads the evidence and tells an officer what to do next.
          </div>
          <div className="font-mono text-xs text-[#787165] uppercase tracking-widest">
            WATERSHED DECISION SUPPORT · WDC-PMKSY 2.0
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5DFD3] pb-8 mb-14 gap-6">
          <div>
            <div className="font-mono text-xs text-[#244A29] tracking-widest uppercase font-semibold mb-3">
              01 · PHYSICAL FOUNDATION
            </div>
            <h2 className="font-sans text-4xl sm:text-6xl font-light tracking-[-0.03em] uppercase text-[#1F1E1B]">
              THE LAND
            </h2>
          </div>
          <p className="font-mono text-xs text-[#59544B] max-w-md uppercase tracking-wider leading-relaxed">
            Slope, drainage, soil, and upstream–downstream position determine the analysis unit. Physical terrain tests whether observed changes are hydrologically plausible.
          </p>
        </div>

        {/* 4 Biophysical Foundation Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {pillars.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => setActivePillar(idx)}
              className={`bg-[#F0EBE1] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xs cursor-pointer ${
                activePillar === idx
                  ? "ring-2 ring-[#244A29] shadow-md bg-[#EFEAE0]"
                  : "hover:bg-[#EAE4D7]/70"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] text-[#244A29] font-bold tracking-wider">{p.tag}</span>
                  <span className="font-mono text-[9px] text-[#787165] px-1.5 py-0.5 bg-[#E6DFD1] rounded-[2px]">{p.meta}</span>
                </div>
                <h3 className="font-sans text-xl sm:text-2xl font-light text-[#1F1E1B] mb-2">{p.title}</h3>
                <p className="font-sans text-xs text-[#59544B] font-light leading-relaxed mb-5">
                  {p.caption}
                </p>

                {/* Embedded Visual Diagram - Clean and Borderless */}
                {p.visual}
              </div>

              <div className="mt-6 flex justify-between items-center font-mono text-[10px] text-[#787165]">
                <span>{p.resolution}</span>
                <span className="text-[#244A29]">EXPLORE →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

