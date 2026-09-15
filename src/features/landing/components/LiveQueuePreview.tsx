export function LiveQueuePreview() {
  const cases = [
    {
      id: 'MH-NSK-2026-088',
      structure: 'Masonry Check Dam (CD-04)',
      watershed: 'Upper Godavari Sub-basin · Trimbakeshwar',
      status: 'Verified Healthy',
      statusBadge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      dotColor: 'bg-emerald-400',
      evidence:
        'Sentinel-1 SAR confirms 84% post-monsoon water holding · NDVI +21%',
      recommendation: 'Approve Phase II milestone payment',
    },
    {
      id: 'MH-NSK-2026-042',
      structure: 'Earthen Percolation Tank (PT-02)',
      watershed: 'Darna River Tributary · Igatpuri',
      status: 'High Priority Action',
      statusBadge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      dotColor: 'bg-rose-400',
      evidence:
        'Rapid siltation detected: 62% dead storage loss · upstream erosion flag',
      recommendation: 'Issue desiltation & catchment desilt work order to BDO',
    },
    {
      id: 'MH-NSK-2026-019',
      structure: 'Continuous Contour Trench (CCT-12)',
      watershed: 'Girna Sub-catchment · Kalwan',
      status: 'Audit Escalate',
      statusBadge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      dotColor: 'bg-amber-400',
      evidence:
        'Field photo coordinates offset 340m from actual drainage contour slope',
      recommendation: 'Hold disbursal · re-survey with GPS elevation bench',
    },
  ]

  return (
    <section
      id="demo"
      className="border-t border-white/10 bg-[#06080a] px-4 py-20 text-white sm:px-6 sm:py-28 md:px-12 lg:px-16"
      aria-labelledby="queue-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 font-mono text-xs font-medium text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              Live Queue Preview
            </div>
            <h2
              id="queue-heading"
              className="font-sans text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Actionable Decisions for District Officers
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
              Officials don’t browse raw rasters. They receive prioritized case
              queues with clear biophysical corroboration, satellite proofs, and
              one-click field work orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/command-centre"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-tight text-black shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-neutral-100 sm:text-sm"
            >
              Enter Command Centre Live
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-medium tracking-tight text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:bg-white/15 sm:text-sm"
            >
              Explore Demo Sign In
            </a>
          </div>
        </div>

        {/* Case Cards Stack */}
        <div className="mt-12 space-y-4">
          {cases.map((c) => (
            <div
              key={c.id}
              className="glass-card-dark flex flex-col justify-between gap-6 rounded-2xl p-5 transition-all duration-300 hover:border-white/20 sm:p-6 lg:flex-row lg:items-center"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold tracking-wider text-neutral-400">
                    {c.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium ${c.statusBadge}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${c.dotColor}`}
                    />
                    {c.status}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-semibold text-white">
                  {c.structure}
                </h3>
                <p className="font-mono text-xs text-neutral-400">
                  {c.watershed}
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-white/5 bg-white/[0.03] p-3.5 font-mono text-xs lg:max-w-md">
                <div className="font-medium text-neutral-300">
                  Evidence: {c.evidence}
                </div>
                <div className="text-emerald-400">
                  Action: {c.recommendation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
