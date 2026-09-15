export function ArchitectureBento() {
  return (
    <section
      id="about"
      className="border-t border-neutral-200 bg-white py-20 text-neutral-900 sm:py-28 lg:py-32"
      aria-labelledby="architecture-heading"
    >
      <div className="mx-auto max-w-[94rem] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-neutral-200">
          <div className="md:col-span-1 lg:col-span-1">
            <span className="font-sans text-3xl font-light tracking-tight text-neutral-400 sm:text-4xl lg:text-5xl">
              /02
            </span>
          </div>
          <div className="md:col-span-7 lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
              The Interpretation Gap
            </div>
            <h2
              id="architecture-heading"
              className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-950 leading-[1.08]"
            >
              The Data Already Exists. The Reasoning Layer Is Missing.
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-neutral-600 font-normal max-w-2xl">
              WDC-PMKSY 2.0 already uses geo-tagged photographs, GIS verification and remote
              sensing for planning and monitoring. The challenge is not simply collecting
              photographs or displaying them on a map.
            </p>
            <div className="mt-4 border-l-2 border-neutral-900 pl-4 py-1 text-sm sm:text-base text-neutral-900 font-medium">
              Which structure needs attention first? Can the available evidence actually support that conclusion?
            </div>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-neutral-500 font-normal max-w-2xl">
              BHU-DRISHTI addresses this interpretation gap by connecting field evidence with spatial,
              environmental and temporal context.
            </p>
          </div>
          <div className="md:col-span-4 lg:col-span-4 flex items-end justify-start md:justify-end">
            <div className="font-mono text-xs text-neutral-400 space-y-1">
              <div>ECOSYSTEM: DRISHTI + SRISHTI/BHUVAN</div>
              <div>REASONING: EXPLAINABLE REVIEW QUEUE</div>
            </div>
          </div>
        </div>

        {/* 3 Editorial Architecture Tiers with 1px hairlines */}
        <div className="grid grid-cols-1 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border-b border-neutral-200 md:grid-cols-3">
          {/* Tier 01: Drishti Field Capture */}
          <div className="flex flex-col justify-between py-10 md:py-12 md:pr-10">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                <span className="uppercase tracking-wider text-neutral-900 font-medium">
                  Tier 01 · Ground
                </span>
                <span>Drishti Capture</span>
              </div>
              <h3 className="mt-6 font-sans text-2xl sm:text-3xl font-light tracking-tight text-neutral-950">
                Drishti Field Capture
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 font-normal">
                Field surveyors capture geo-coded photographs of check dams,
                percolation tanks, and contour bunds with hardware camera coordinates
                and ground observations.
              </p>
            </div>
            <div className="mt-10 pt-4 border-t border-neutral-100 flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>Captures:</span>
              <span className="text-neutral-950 font-medium">"The Ground"</span>
            </div>
          </div>

          {/* Tier 02: Srishti GIS Layers */}
          <div className="flex flex-col justify-between py-10 md:py-12 md:px-10">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                <span className="uppercase tracking-wider text-neutral-900 font-medium">
                  Tier 02 · Spatial
                </span>
                <span>Srishti / Bhuvan</span>
              </div>
              <h3 className="mt-6 font-sans text-2xl sm:text-3xl font-light tracking-tight text-neutral-950">
                Srishti GIS Layers
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 font-normal">
                30 m SRISHTI-DRISHTI satellite data, administrative micro-watershed
                boundaries, slope, drainage lines, and soil characteristics displayed
                on an interactive map.
              </p>
            </div>
            <div className="mt-10 pt-4 border-t border-neutral-100 flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>Shows:</span>
              <span className="text-neutral-950 font-medium">"It on a Map"</span>
            </div>
          </div>

          {/* Tier 03: BHU-DRISHTI AI Engine */}
          <div className="flex flex-col justify-between py-10 md:py-12 md:pl-10">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                <span className="uppercase tracking-wider text-neutral-900 font-medium">
                  Tier 03 · Intelligence
                </span>
                <span className="text-neutral-950 font-medium">Decision Support</span>
              </div>
              <h3 className="mt-6 font-sans text-2xl sm:text-3xl font-light tracking-tight text-neutral-950">
                BHU-DRISHTI Reasoning
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 font-normal">
                Reads the evidence and tells an officer what to do next. Combines
                geo-coded photographs, satellite observations, and watershed context
                to turn existing records into an explainable review queue.
              </p>
            </div>
            <div className="mt-10 pt-4 border-t border-neutral-100 flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>Delivers:</span>
              <span className="text-neutral-950 font-medium">
                "What to Do Next"
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
