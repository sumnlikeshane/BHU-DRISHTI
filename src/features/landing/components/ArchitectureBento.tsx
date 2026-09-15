export function ArchitectureBento() {
  return (
    <section
      id="about"
      className="border-t border-white/10 bg-[#06080a] px-4 py-20 text-white sm:px-6 sm:py-28 md:px-12 lg:px-16"
      aria-labelledby="architecture-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow & Section Heading */}
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            System Architecture
          </div>
          <h2
            id="architecture-heading"
            className="font-sans text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Three Layers. One Auditable Chain of Truth.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
            BHU-DRISHTI does not replace India’s existing spatial investments.
            It adds an AI and GIS interpretation layer that converts raw field
            photographs and GIS points into defensible biophysical verification.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: Drishti */}
          <div className="glass-card-dark flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 sm:p-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                  Tier 01 · Ground
                </span>
                <span className="font-mono text-[11px] text-neutral-500">
                  NRSC Mobile
                </span>
              </div>
              <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Drishti Field Capture
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                Field surveyors capture geotagged photographs of check dams,
                percolation tanks, and contour bunds with hardware compass
                heading and device telemetry.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-neutral-400">
              <span>Answers:</span>
              <span className="text-neutral-200">"What is on the ground?"</span>
            </div>
          </div>

          {/* Card 2: Srishti / Bhuvan */}
          <div className="glass-card-dark flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 sm:p-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                  Tier 02 · Spatial
                </span>
                <span className="font-mono text-[11px] text-neutral-500">
                  ISRO Bhuvan
                </span>
              </div>
              <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Srishti GIS Layers
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                CartoDEM 30m digital elevation contours, administrative
                micro-watershed boundaries, and national river basin networks
                projected in high resolution.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-neutral-400">
              <span>Answers:</span>
              <span className="text-neutral-200">"Where is it mapped?"</span>
            </div>
          </div>

          {/* Card 3: BHU-DRISHTI */}
          <div className="glass-card-dark flex flex-col justify-between rounded-3xl border-emerald-500/30 bg-gradient-to-b from-[#0e1614] to-[#0a1012] p-6 shadow-2xl transition-all duration-300 sm:p-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                  Tier 03 · Intelligence
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Active Layer
                </span>
              </div>
              <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight text-white sm:text-2xl">
                BHU-DRISHTI AI Engine
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Continuous radar (Sentinel-1 SAR) &amp; optical (Sentinel-2)
                cross-audit. Detects dry/silted structures, photo spoofing, and
                generates explainable audit dossiers.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-emerald-300">
              <span>Answers:</span>
              <span className="font-medium text-white">
                "Does it work &amp; should we pay?"
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
