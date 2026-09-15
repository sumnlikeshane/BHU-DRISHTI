export function VerificationMatrix() {
  const sources = [
    {
      id: '01',
      title: 'Field Evidence',
      subtitle: 'Geo-coded Drishti photographs',
      tag: 'Ground Camera',
      description:
        'Computer vision analyses geo-coded photographs for visible cues: structure presence, water presence, silt, cracks, breaches, and vegetation. Each observation carries a confidence score.',
      retention: 'Source · Time · Spatial Scale · Quality',
      meta: 'Computer Vision Cues',
    },
    {
      id: '02',
      title: 'Earth Observation',
      subtitle: '30 m SRISHTI-DRISHTI satellite data',
      tag: 'Satellite GIS',
      description:
        'Spaceborne multi-temporal observations providing surface reflectance, water retention signatures, and vegetation indices aligned by geography, season, and spatial scale.',
      retention: '30 m Spatial Scale · Orbit Revisit',
      meta: 'Bhuvan / Srishti Core',
    },
    {
      id: '03',
      title: 'Hydrometeorology',
      subtitle: 'Rainfall amount, timing and anomaly',
      tag: 'Climate Context',
      description:
        'Rainfall amount, timing and anomaly over declared evaluation windows help determine whether observed water or vegetation response is climatically plausible.',
      retention: 'Rainfall Anomaly · Seasonal Baseline',
      meta: 'Monsoon Synchronization',
    },
    {
      id: '04',
      title: 'Watershed Context',
      subtitle: 'Micro-watershed, slope, drainage and soils',
      tag: 'Geomorphology',
      description:
        'Micro-watershed boundaries, topographic slope gradients, natural drainage flow accumulation lines, and soil characteristics establish the physical baseline.',
      retention: 'Ridge-to-Valley · Soil Permeability',
      meta: 'Physical Terrain Unit',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="border-t border-neutral-200 bg-white py-20 text-neutral-900 sm:py-28 lg:py-32"
      aria-labelledby="matrix-heading"
    >
      <div className="mx-auto max-w-[94rem] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-neutral-200">
          <div className="md:col-span-1 lg:col-span-1">
            <span className="font-sans text-3xl font-light tracking-tight text-neutral-400 sm:text-4xl lg:text-5xl">
              /03
            </span>
          </div>
          <div className="md:col-span-7 lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Evidence Fusion · Section 03
            </div>
            <h2
              id="matrix-heading"
              className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-950 leading-[1.08]"
            >
              Evidence Fusion Aligned by Work ID
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-neutral-600 font-normal max-w-2xl">
              BHU-DRISHTI brings multiple evidence sources together for every work ID.
              Each input retains its source, time, spatial scale, and quality information.
              Evidence is aligned by work ID, geography, season and spatial scale.
            </p>
          </div>
          <div className="md:col-span-4 lg:col-span-4 flex items-end justify-start md:justify-end">
            <div className="font-mono text-xs text-neutral-400 space-y-1">
              <div>ALIGNMENT: WORK ID · GEO · SEASON · SCALE</div>
              <div>PROVENANCE: SOURCE · TIME · QUALITY</div>
            </div>
          </div>
        </div>

        {/* 2x2 Grid of 4 Evidence Sources with hairline dividers */}
        <div className="grid grid-cols-1 divide-y md:divide-y-0 md:grid-cols-2 md:divide-x border-b border-neutral-200 divide-neutral-200">
          {sources.map((item, idx) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between py-10 md:py-12 ${
                idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
              } ${idx >= 2 ? 'md:border-t md:border-neutral-200' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                  <span className="font-normal text-neutral-400">
                    Source /{item.id}
                  </span>
                  <span className="text-neutral-900 border border-neutral-200 px-2 py-0.5 uppercase tracking-wider text-[10px]">
                    {item.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-sans text-2xl sm:text-3xl font-light tracking-tight text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-neutral-500">
                  {item.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600 font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-10 pt-4 border-t border-neutral-100 flex items-center justify-between font-mono text-xs">
                <span className="text-neutral-400">{item.retention}</span>
                <span className="font-medium text-neutral-950">{item.meta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4: Intelligence & Reasoning (Editorial 2-Column Hairline Module) */}
        <div className="pt-12 sm:pt-16 border-b border-neutral-200 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-6 space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Section 04 · Intelligence &amp; Reasoning
              </div>
              <h3 className="font-sans text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">
                Computer Vision &amp; Reasoning Layer
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 font-normal">
                Computer vision analyses geo-coded photographs for visible cues such as:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                {[
                  'Structure presence',
                  'Water presence',
                  'Silt',
                  'Cracks',
                  'Breaches',
                  'Vegetation',
                ].map((cue) => (
                  <div
                    key={cue}
                    className="border border-neutral-200 px-3 py-2 font-mono text-xs text-neutral-800 bg-neutral-50/50"
                  >
                    • {cue}
                  </div>
                ))}
              </div>
              <p className="text-xs font-mono text-neutral-500 pt-2">
                Each observation carries an explicit confidence score before entering reasoning.
              </p>
            </div>

            <div className="md:col-span-6 md:border-l md:border-neutral-200 md:pl-8 lg:pl-12 space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                The Reasoning Process &amp; Abstention
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 font-normal">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-neutral-400">01</span>
                  <span>Aligns evidence across sources by work ID and season</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-neutral-400">02</span>
                  <span>Compares observations against a declared baseline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-neutral-400">03</span>
                  <span>Considers seasonal and rainfall context</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-neutral-400">04</span>
                  <span>Records supporting evidence and contradicting evidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-neutral-400">05</span>
                  <span>Identifies data-quality limitations &amp; determines sufficiency</span>
                </li>
              </ul>

              <div className="mt-6 border-l-2 border-neutral-900 bg-neutral-50 p-4">
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-950 mb-1">
                  "Insufficient Evidence" is a Valid Output
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                  The system does not force a conclusion when the evidence is inadequate.
                  Poor or contradictory evidence should trigger further verification rather than a false-positive decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
