export function LiveQueuePreview() {
  const reviewStates = [
    {
      state: 'NO CURRENT FLAG',
      definition: 'Signals remain within the monitored baseline.',
      action: 'Routine observation',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    },
    {
      state: 'MONITOR',
      definition: 'The case should be observed through the next evidence cycle.',
      action: 'Next cycle tracking',
      color: 'text-sky-800 bg-sky-50 border-sky-200',
    },
    {
      state: 'HIGH PRIORITY',
      definition: 'The available evidence supports a field inspection.',
      action: 'Field inspection candidate',
      color: 'text-rose-800 bg-rose-50 border-rose-200',
    },
    {
      state: 'EVIDENCE GAP',
      definition: 'Evidence is missing, stale or contradictory.',
      action: 'Verification trigger',
      color: 'text-amber-800 bg-amber-50 border-amber-200',
    },
  ]

  const cases = [
    {
      id: 'WDC2-MH-NSK-0427',
      structure: 'Earthen Check Dam (CD-04)',
      watershed: 'Trimbakeshwar · Upper Godavari',
      state: 'HIGH PRIORITY',
      stateColor: 'text-rose-800 bg-rose-50 border-rose-200',
      window: 'Post-Monsoon 2025 vs. Pre-Monsoon 2026',
      basis: 'Drishti Photo + 30m SRISHTI-DRISHTI Satellite + Gridded Rainfall',
      confidence: '0.88',
      supporting: 'CV visible cues detect silt accumulation and partial breach; water retention below expected rainfall baseline',
      contradicting: 'None observed across temporal window',
      limitations: 'Satellite scene 12% shadow on eastern slope; photo GPS horizontal dilution 3.8m',
      action: 'Field inspection: Route inspection candidate to block development engineer',
    },
    {
      id: 'WDC2-MH-NSK-0812',
      structure: 'Masonry Percolation Tank (PT-02)',
      watershed: 'Igatpuri · Darna Basin',
      state: 'EVIDENCE GAP',
      stateColor: 'text-amber-800 bg-amber-50 border-amber-200',
      window: 'Kharif 2025 – Rabi 2026',
      basis: 'Drishti Photo Only (Satellite Masked)',
      confidence: '0.41 (Insufficient)',
      supporting: 'Ground photograph shows water presence cue',
      contradicting: 'Persistent 30m satellite cloud cover over 45 days; compass heading telemetry missing in photo EXIF',
      limitations: 'Evidence is stale and contradictory. Cannot confirm spatial retention.',
      action: 'Further verification: Trigger surveyor re-capture before sign-off (Abstain)',
    },
    {
      id: 'WDC2-MH-NSK-0199',
      structure: 'Continuous Contour Trench (CCT-08)',
      watershed: 'Kalwan · Girna Catchment',
      state: 'NO CURRENT FLAG',
      stateColor: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      window: '3-Year Longitudinal Seasonal Baseline',
      basis: 'Drishti Telemetry + 30m Satellite Time-Series + CartoDEM Flow',
      confidence: '0.94',
      supporting: 'Topographic drainage alignment verified; vegetation response within baseline limits',
      contradicting: 'None',
      limitations: 'None; quality check passed all completeness filters',
      action: 'Maintain routine monitoring; signals remain within monitored baseline',
    },
  ]

  return (
    <section
      id="demo"
      className="border-t border-neutral-200 bg-white py-20 text-neutral-900 sm:py-28 lg:py-32"
      aria-labelledby="queue-heading"
    >
      <div className="mx-auto max-w-[94rem] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-neutral-200">
          <div className="md:col-span-1 lg:col-span-1">
            <span className="font-sans text-3xl font-light tracking-tight text-neutral-400 sm:text-4xl lg:text-5xl">
              /04
            </span>
          </div>
          <div className="md:col-span-7 lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
              From Evidence to Action · Section 05
            </div>
            <h2
              id="queue-heading"
              className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-950 leading-[1.08]"
            >
              Every Reviewed Case Placed into Four States
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-neutral-600 font-normal max-w-2xl">
              The final decision remains with the accountable official.
              BHU-DRISHTI supports the decision; it does not replace the reviewer.
            </p>
          </div>
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-start md:items-end justify-end gap-3 font-sans text-xs sm:text-sm">
            <a
              href="/command-centre"
              className="group inline-flex items-center gap-1.5 font-medium text-neutral-950 hover:text-neutral-600 transition-colors"
            >
              <span>Enter Command Centre Live</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
            <a
              href="/demo"
              className="group inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              <span>Explore Demo Sign In</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* Four States Hairline Grid */}
        <div className="grid grid-cols-1 divide-y sm:divide-y-0 sm:grid-cols-2 lg:grid-cols-4 sm:divide-x divide-neutral-200 border-b border-neutral-200">
          {reviewStates.map((st) => (
            <div key={st.state} className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span
                  className={`inline-block border px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide ${st.color}`}
                >
                  {st.state}
                </span>
                <p className="mt-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                  {st.definition}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-100 font-mono text-[11px] text-neutral-400">
                Action: <span className="text-neutral-900">{st.action}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Case Dossier Anatomy: Editorial Case Ledger Rows */}
        <div className="pt-10">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 font-mono text-xs text-neutral-400">
            <span>CASE DOSSIER ANATOMY (COMPARISON WINDOW · EVIDENCE BASIS · CONFIDENCE · SIGNALS)</span>
            <span>ACCOUNTABLE OFFICIAL AUDIT</span>
          </div>

          <div className="divide-y divide-neutral-200 border-b border-neutral-200">
            {cases.map((c) => (
              <div
                key={c.id}
                className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-neutral-50/50 transition-colors"
              >
                <div className="md:col-span-3 space-y-1">
                  <div className="font-mono text-xs font-semibold text-neutral-950">
                    {c.id}
                  </div>
                  <div className="font-mono text-xs text-neutral-500">
                    {c.watershed}
                  </div>
                  <div className="pt-2">
                    <span
                      className={`inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${c.stateColor}`}
                    >
                      {c.state}
                    </span>
                  </div>
                  <div className="pt-2 font-mono text-[11px] text-neutral-400">
                    Confidence: <span className="text-neutral-900 font-medium">{c.confidence}</span>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-3">
                  <h3 className="font-sans text-xl font-light text-neutral-950">
                    {c.structure}
                  </h3>
                  <div className="space-y-1.5 text-xs sm:text-sm text-neutral-600 font-normal">
                    <div>
                      <span className="font-mono text-neutral-400 text-xs">Window: </span>
                      {c.window}
                    </div>
                    <div>
                      <span className="font-mono text-neutral-400 text-xs">Basis: </span>
                      {c.basis}
                    </div>
                    <div>
                      <span className="font-mono text-emerald-700 text-xs">Supporting: </span>
                      {c.supporting}
                    </div>
                    <div>
                      <span className="font-mono text-neutral-500 text-xs">Contradicting: </span>
                      {c.contradicting}
                    </div>
                    <div>
                      <span className="font-mono text-amber-700 text-xs">Limitations: </span>
                      {c.limitations}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 md:border-l md:border-neutral-100 md:pl-8 space-y-2 font-sans text-xs sm:text-sm">
                  <div className="font-mono text-neutral-400 uppercase tracking-wider text-[10px]">
                    Recommended Next Action
                  </div>
                  <div className="text-neutral-900 font-medium leading-relaxed">
                    {c.action}
                  </div>
                  <div className="pt-3 border-t border-neutral-100 font-mono text-[10px] text-neutral-400">
                    Decision owner: District / Block Verification Officer
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
