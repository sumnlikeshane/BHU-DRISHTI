export function ImpactGrid() {
  const programmeScale = [
    {
      value: '1,220',
      label: 'Projects Sanctioned',
      sublabel: 'National programme scale under WDC-PMKSY 2.0 across states and Union Territories.',
    },
    {
      value: '52.93 lakh ha',
      label: 'Sanctioned Treatment Area',
      sublabel: 'Rainfed and degraded land brought under participatory watershed development.',
    },
    {
      value: '1.24 lakh',
      label: 'Structures Created / Revived',
      sublabel: 'Water-harvesting check dams, percolation tanks, and contour bunds monitored.',
    },
    {
      value: '28.50 lakh',
      label: 'Farmers Benefited',
      sublabel: 'Smallholders supported through improved soil moisture and groundwater recharge.',
    },
    {
      value: '₹12,404 Cr',
      label: 'Total Project Cost',
      sublabel: 'Central and state public funds directed toward resilient rural watersheds.',
    },
  ]

  return (
    <section
      id="impact"
      className="border-t border-neutral-200 bg-white py-20 text-neutral-900 sm:py-28 lg:py-32"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-[94rem] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-neutral-200">
          <div className="md:col-span-1 lg:col-span-1">
            <span className="font-sans text-3xl font-light tracking-tight text-neutral-400 sm:text-4xl lg:text-5xl">
              /05
            </span>
          </div>
          <div className="md:col-span-7 lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Scale &amp; Impact · Section 06
            </div>
            <h2
              id="impact-heading"
              className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-950 leading-[1.08]"
            >
              Evidence-Based Prioritisation at Scale
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-neutral-600 font-normal max-w-2xl">
              BHU-DRISHTI is designed to move monitoring from limited manual review toward
              evidence-based prioritisation across the programme. The objective is not simply to
              generate another dashboard.
            </p>
          </div>
          <div className="md:col-span-4 lg:col-span-4 flex items-end justify-start md:justify-end">
            <div className="font-mono text-xs text-neutral-400 space-y-1">
              <div>PROGRAMME: WDC-PMKSY 2.0</div>
              <div>OBJECTIVE: REASONED TRIAGE</div>
            </div>
          </div>
        </div>

        {/* 5 WDC-PMKSY 2.0 Programme Scale Metrics with hairline dividers */}
        <div className="grid grid-cols-1 divide-y sm:divide-y-0 sm:grid-cols-2 lg:grid-cols-5 sm:divide-x divide-neutral-200 border-b border-neutral-200">
          {programmeScale.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between py-10 sm:py-12 ${
                idx === 0
                  ? 'sm:pr-6'
                  : idx === programmeScale.length - 1
                    ? 'sm:pl-6'
                    : 'sm:px-6'
              }`}
            >
              <div>
                <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-950">
                  {stat.value}
                </div>
                <div className="mt-4 font-sans text-sm sm:text-base font-normal text-neutral-950">
                  {stat.label}
                </div>
              </div>
              <p className="mt-6 pt-4 border-t border-neutral-100 font-sans text-xs leading-relaxed text-neutral-500 font-normal">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Core Product Principle Module */}
        <div className="pt-14 sm:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-200">
            <div className="md:col-span-4 space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Core Product Principle
              </div>
              <h3 className="font-sans text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">
                Beyond Map Pins &amp; Photos
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                The objective is to help programme teams move from static recording to an explainable,
                auditable review workflow.
              </p>
            </div>

            <div className="md:col-span-8 md:border-l md:border-neutral-200 md:pl-8 lg:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Today's Systems */}
              <div className="space-y-3 border-l sm:border-l-0 pl-4 sm:pl-0 border-neutral-200">
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Today's Systems Answer
                </div>
                <div className="space-y-4">
                  <div className="border border-neutral-200 p-4 bg-neutral-50/50">
                    <div className="font-sans text-lg font-light text-neutral-950">WHERE is the work?</div>
                    <p className="mt-1 font-mono text-xs text-neutral-500">Spatial point coordinate on GIS / Bhuvan</p>
                  </div>
                  <div className="border border-neutral-200 p-4 bg-neutral-50/50">
                    <div className="font-sans text-lg font-light text-neutral-950">WHAT is happening?</div>
                    <p className="mt-1 font-mono text-xs text-neutral-500">Field photograph captured via Drishti</p>
                  </div>
                </div>
              </div>

              {/* BHU-DRISHTI Adds */}
              <div className="space-y-3 border-l sm:border-l-0 pl-4 sm:pl-0 border-neutral-900">
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-950">
                  BHU-DRISHTI Adds
                </div>
                <div className="space-y-4">
                  <div className="border-2 border-neutral-900 p-4 bg-white shadow-sm">
                    <div className="font-sans text-lg font-medium text-neutral-950">WHY does evidence suggest attention?</div>
                    <p className="mt-1 font-mono text-xs text-neutral-600">Cross-verifies cues, baseline &amp; rainfall context</p>
                  </div>
                  <div className="border-2 border-neutral-900 p-4 bg-white shadow-sm">
                    <div className="font-sans text-lg font-medium text-neutral-950">WHAT should happen next?</div>
                    <p className="mt-1 font-mono text-xs text-neutral-600">Routes reasoned state to the accountable official</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Triad Rules */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 pt-8 border-b border-neutral-200 pb-8 text-center sm:text-left font-sans">
            <div className="py-4 md:py-0 md:pr-8">
              <div className="font-mono text-xs text-neutral-400 mb-1">Principle 01</div>
              <div className="text-base font-light text-neutral-950">
                "Every conclusion should be explainable."
              </div>
            </div>
            <div className="py-4 md:py-0 md:px-8">
              <div className="font-mono text-xs text-neutral-400 mb-1">Principle 02</div>
              <div className="text-base font-light text-neutral-950">
                "Every uncertainty should be visible."
              </div>
            </div>
            <div className="py-4 md:py-0 md:pl-8">
              <div className="font-mono text-xs text-neutral-400 mb-1">Principle 03</div>
              <div className="text-base font-light text-neutral-950">
                "Every recommendation should remain reviewable."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
