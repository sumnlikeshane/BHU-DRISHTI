import React, { useState } from "react"

export const Section02Evidence: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<"drishti" | "srishti" | "rainfall" | "slope">("drishti")

  return (
    <section id="evidence" className="relative py-24 sm:py-32 px-6 sm:px-12 bg-[#FAF7F2] text-[#1F1E1B] border-b border-[#E5DFD3] overflow-hidden">
      <div className="max-w-[92rem] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5DFD3] pb-8 mb-14 gap-6">
          <div>
            <div className="font-mono text-xs text-[#244A29] tracking-widest uppercase font-semibold mb-3">
              02 · EVIDENCE BOUNDARIES
            </div>
            <h2 className="font-sans text-4xl sm:text-6xl font-light tracking-[-0.03em] uppercase text-[#1F1E1B]">
              THE EVIDENCE
            </h2>
          </div>
          <p className="font-mono text-xs text-[#59544B] max-w-md uppercase tracking-wider leading-relaxed">
            Every signal has a strict boundary. A field photo shows visible conditions; satellites describe landscape spectral changes; rainfall explains climate variability.
          </p>
        </div>

        {/* Interactive Multi-Layer Convergence Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Layer Selector Left Column - Clean Tonal Buttons */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveLayer("drishti")}
              className={`w-full text-left p-5 transition-all rounded-[6px] ${
                activeLayer === "drishti"
                  ? "bg-[#EAE4D7] text-[#1F1E1B] shadow-xs"
                  : "bg-[#F3EFE6]/60 text-[#59544B] hover:bg-[#EAE4D7]/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#244A29] font-bold uppercase tracking-wider">LAYER 01 / GROUND FIELD</span>
                <span className="w-2 h-2 rounded-full bg-[#244A29]" />
              </div>
              <div className="text-lg font-light font-sans text-[#1F1E1B] mt-1.5">Geo-coded Drishti Photos</div>
              <div className="mt-2 text-xs font-sans text-[#59544B] font-light">
                GPS coordinates, camera compass azimuth, stage of work, and image sharpness quality gates.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveLayer("srishti")}
              className={`w-full text-left p-5 transition-all rounded-[6px] ${
                activeLayer === "srishti"
                  ? "bg-[#EAE4D7] text-[#1F1E1B] shadow-xs"
                  : "bg-[#F3EFE6]/60 text-[#59544B] hover:bg-[#EAE4D7]/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#244A29] font-bold uppercase tracking-wider">LAYER 02 / SATELLITE OBS</span>
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
              </div>
              <div className="text-lg font-light font-sans text-[#1F1E1B] mt-1.5">McFeeters Open-Water NDWI</div>
              <div className="mt-2 text-xs font-sans text-[#59544B] font-light">
                Same-resolution pre/post passes with cloud, shadow, and radiometric saturation masks.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveLayer("rainfall")}
              className={`w-full text-left p-5 transition-all rounded-[6px] ${
                activeLayer === "rainfall"
                  ? "bg-[#EAE4D7] text-[#1F1E1B] shadow-xs"
                  : "bg-[#F3EFE6]/60 text-[#59544B] hover:bg-[#EAE4D7]/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#244A29] font-bold uppercase tracking-wider">LAYER 03 / METEOROLOGY</span>
                <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              </div>
              <div className="text-lg font-light font-sans text-[#1F1E1B] mt-1.5">Precipitation Spell Totals</div>
              <div className="mt-2 text-xs font-sans text-[#59544B] font-light">
                14/30/60-day cumulative precipitation and anomaly relative to declared historical baseline.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveLayer("slope")}
              className={`w-full text-left p-5 transition-all rounded-[6px] ${
                activeLayer === "slope"
                  ? "bg-[#EAE4D7] text-[#1F1E1B] shadow-xs"
                  : "bg-[#F3EFE6]/60 text-[#59544B] hover:bg-[#EAE4D7]/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#244A29] font-bold uppercase tracking-wider">LAYER 04 / TOPOGRAPHY</span>
                <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              </div>
              <div className="text-lg font-light font-sans text-[#1F1E1B] mt-1.5">Catchment Runoff Units</div>
              <div className="mt-2 text-xs font-sans text-[#59544B] font-light">
                Slope gradient, catchment area, and upstream surface flow accumulation reaches.
              </div>
            </button>
          </div>

          {/* Right Column: Clean Visual Viewport Console */}
          <div className="lg:col-span-8 bg-[#F3EFE6] rounded-[8px] overflow-hidden shadow-xs flex flex-col justify-between">
            {/* Console Header Bar */}
            <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#EAE4D7]/60 font-mono text-[11px] text-[#59544B]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#244A29] animate-pulse" />
                <span className="font-semibold text-[#1F1E1B]">
                  {activeLayer === "drishti" && "SURVEYOR VIEWPORT: WORK-MH-NSK-0427"}
                  {activeLayer === "srishti" && "ISRO BHUVAN / SENTINEL-2 SPECTRAL CONVERGENCE"}
                  {activeLayer === "rainfall" && "IMD GRIDDED METEOROLOGY TELEMETRY"}
                  {activeLayer === "slope" && "30m DEM TOPOGRAPHIC FLOW ACCUMULATION"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#787165]">LAT: 19.9975° N · LON: 73.7898° E</span>
                <span className="px-2 py-0.5 bg-[#DDD6C7] rounded-[3px] text-[10px] font-semibold text-[#1F1E1B]">VERIFIED STREAM</span>
              </div>
            </div>

            {/* Main Visual Display Area */}
            <div className="p-6 sm:p-8">
              {activeLayer === "drishti" && (
                <div className="space-y-5">
                  <div className="relative rounded-[6px] overflow-hidden bg-black shadow-inner">
                    <img
                      src="/images/watershed/drishti-survey.jpg"
                      alt="Drishti Ground Truth Field Surveyor Inspection"
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-sm text-white font-mono text-[10px] px-3 py-1.5 rounded-[4px]">
                      DRISHTI CAM AZIMUTH: 142° SE · FOV 78°
                    </div>
                    <div className="absolute top-4 right-4 bg-emerald-950/80 text-emerald-300 font-mono text-[10px] px-3 py-1.5 rounded-[4px]">
                      ● GPS LOCKED (±3.2m ACCURACY)
                    </div>
                  </div>

                  {/* Telemetry Strip - Borderless Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">STAGE</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">COMPLETED</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">STRUCTURE</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">CHECK DAM</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">WATER POOLING</div>
                      <div className="text-sm font-semibold text-[#244A29] mt-0.5">1.2m VISIBLE</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">PROVENANCE</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">TAMPER PROOF</div>
                    </div>
                  </div>
                </div>
              )}

              {activeLayer === "srishti" && (
                <div className="space-y-5">
                  <div className="relative rounded-[6px] overflow-hidden bg-black shadow-inner">
                    <img
                      src="/images/watershed/satellite-ndwi.jpg"
                      alt="McFeeters Open-Water NDWI False-Color Satellite Pass"
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-sm text-white font-mono text-[10px] px-3 py-1.5 rounded-[4px]">
                      SENTINEL-2 / BHUVAN PASS · MCFEETERS NDWI
                    </div>
                    <div className="absolute bottom-4 right-4 bg-blue-950/80 text-blue-300 font-mono text-[10px] px-3 py-1.5 rounded-[4px]">
                      WATER INDEX: +0.64 (ACTIVE POOLING)
                    </div>
                  </div>

                  {/* Telemetry Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">PRE-MONSOON</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">NDWI: -0.22</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">POST-MONSOON</div>
                      <div className="text-sm font-semibold text-[#1D4ED8] mt-0.5">NDWI: +0.64</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">CLOUD COVER</div>
                      <div className="text-sm font-semibold text-[#244A29] mt-0.5">0.0% (CLEAR)</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">IMPOUND AREA</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">1,840 m²</div>
                    </div>
                  </div>
                </div>
              )}

              {activeLayer === "rainfall" && (
                <div className="space-y-5">
                  {/* Interactive Hyetograph Visualization - Borderless */}
                  <div className="relative rounded-[6px] p-6 bg-[#E8E2D5]/70 flex flex-col justify-between min-h-[320px]">
                    <div className="flex justify-between items-center font-mono text-xs text-[#59544B] pb-3">
                      <span>60-DAY MONSOON HYETOGRAPH &amp; ANOMALY PROFILE</span>
                      <span className="text-[#D97706] font-semibold">+24.2% CUMULATIVE ANOMALY</span>
                    </div>

                    {/* Bar Chart */}
                    <div className="h-56 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2">
                      {[12, 18, 5, 0, 8, 42, 68, 124, 85, 32, 14, 2, 0, 16, 54, 92, 110, 45, 18, 6].map((mm, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                          <div
                            style={{ height: `${Math.min(100, (mm / 130) * 100)}%` }}
                            className={`w-full rounded-t-[2px] transition-all ${
                              mm > 80 ? "bg-[#A83B24]" : mm > 30 ? "bg-[#244A29]" : "bg-[#7A9A80]"
                            }`}
                          />
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-[#1F1E1B] text-white text-[9px] font-mono px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-20">
                            {mm} mm
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-[#787165] pt-3">
                      <span>DAY -60 (DRY SPELL)</span>
                      <span className="text-[#A83B24] font-semibold">PEAK RAIN: 124mm / 24h</span>
                      <span>DAY 0 (CURRENT)</span>
                    </div>
                  </div>

                  {/* Telemetry Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">14-DAY TOTAL</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">286 mm</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">60-DAY TOTAL</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">748 mm</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">SOIL MOISTURE</div>
                      <div className="text-sm font-semibold text-[#244A29] mt-0.5">AMC-III SATURATED</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">STATION ID</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">IMD-NSK-439</div>
                    </div>
                  </div>
                </div>
              )}

              {activeLayer === "slope" && (
                <div className="space-y-5">
                  {/* Terrain Elevation & Flow Profile - Borderless */}
                  <div className="relative rounded-[6px] p-6 bg-[#E8E2D5]/70 flex flex-col justify-between min-h-[320px]">
                    <div className="flex justify-between items-center font-mono text-xs text-[#59544B] pb-3">
                      <span>DRAINAGE REACH CROSS-SECTION · FLOW ACCUMULATION</span>
                      <span className="text-[#244A29] font-semibold">14.2° CATCHMENT GRADIENT</span>
                    </div>

                    <div className="relative h-56 flex items-center justify-center">
                      <svg className="w-full h-44" viewBox="0 0 500 160">
                        <path d="M20,20 L150,70 L320,115 L480,125" fill="none" stroke="#1F1E1B" strokeWidth="2.5" />
                        <polygon points="20,20 150,70 320,115 480,125 480,155 20,155" fill="#D5CEBF" fillOpacity="0.5" />
                        <path d="M150,70 L320,115" stroke="#1D4ED8" strokeWidth="3" strokeDasharray="6 4" />
                        <rect x="315" y="98" width="12" height="25" fill="#A83B24" rx="2" />
                        <text x="335" y="105" fill="#A83B24" fontSize="11" fontFamily="monospace" fontWeight="bold">DAM EMBANKMENT</text>
                        <polygon points="250,105 315,115 315,123 250,112" fill="#8B5A2B" fillOpacity="0.6" />
                        <text x="210" y="95" fill="#8B5A2B" fontSize="10" fontFamily="monospace">SILT ACCUMULATION (42%)</text>
                        <text x="50" y="45" fill="#59544B" fontSize="10" fontFamily="sans-serif">Upstream Runoff: 3.8 m³/s</text>
                      </svg>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-[#787165] pt-3">
                      <span>ELEVATION: 684m MSL</span>
                      <span>DRAINAGE DENSITY: 2.8 km/km²</span>
                      <span>SOIL: CLAYEY LOAM</span>
                    </div>
                  </div>

                  {/* Telemetry Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">SLOPE ANGLE</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">14.2° MODERATE</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">RUNOFF COEFF</div>
                      <div className="text-sm font-semibold text-[#1F1E1B] mt-0.5">C = 0.48</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">PLACEMENT</div>
                      <div className="text-sm font-semibold text-[#244A29] mt-0.5">VALIDATED GULLY</div>
                    </div>
                    <div className="p-3 bg-[#EAE4D7]/70 rounded-[4px]">
                      <div className="text-[10px] text-[#787165]">SAFETY STATUS</div>
                      <div className="text-sm font-semibold text-[#D97706] mt-0.5">CAPACITY LOSS &gt;40%</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
