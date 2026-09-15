export function ImpactGrid() {
  const stats = [
    {
      value: '100%',
      label: 'Pre-Disbursal Verification',
      sublabel:
        'Zero payments approved without corroborated satellite biophysical evidence.',
    },
    {
      value: '4.2×',
      label: 'Faster Anomaly Flagging',
      sublabel:
        'Dry or breached structures identified in days instead of annual audit cycles.',
    },
    {
      value: '84 Basins',
      label: 'PostGIS Pan-India Schema',
      sublabel:
        'Designed from day one for nationwide scaling across state watershed cells.',
    },
    {
      value: '₹0 Lost',
      label: 'To Phantom Infrastructure',
      sublabel:
        'Eliminates duplicate photo claims and paper assets via radar backscatter audits.',
    },
  ]

  return (
    <section
      id="impact"
      className="border-t border-white/10 bg-[#070a0d] px-4 py-20 text-white sm:px-6 sm:py-28 md:px-12 lg:px-16"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Operational Impact
          </div>
          <h2
            id="impact-heading"
            className="font-sans text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Accountability at Catchment Scale
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
            By shifting from unverified physical sampling to automated
            satellite-based auditing, district authorities maximize water table
            recharge and secure public funds.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card-dark flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:border-white/20 sm:p-8"
            >
              <div>
                <div className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-3 font-sans text-sm font-semibold text-neutral-200">
                  {stat.label}
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-neutral-400">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
