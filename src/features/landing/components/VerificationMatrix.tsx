export function VerificationMatrix() {
  const checks = [
    {
      id: '01',
      title: 'Water Retention Index (WRI)',
      sensor: 'Sentinel-1 C-Band SAR',
      tag: 'Hydrology',
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      description:
        'Analyzes radar backscatter attenuation behind check dams post-monsoon. Detects dried-out or phantom structures erroneously marked as water-holding in field logs.',
      metric: '98.4% Confidence',
      badge: 'Radar Penetration',
    },
    {
      id: '02',
      title: 'Vegetation Response Delta',
      sensor: 'Sentinel-2 Multispectral',
      tag: 'Biomass',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      description:
        'Calculates 3-year longitudinal NDVI/NDWI trends in the micro-catchment zone. Distinguishes genuine soil moisture enhancement from fleeting seasonal greening.',
      metric: '+18.2% NDVI Lift',
      badge: 'Multi-Season Baseline',
    },
    {
      id: '03',
      title: 'Topographic Drainage Alignment',
      sensor: 'CartoDEM 30m Elevation',
      tag: 'Geomorphology',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      description:
        'Validates structural placement against hydrological stream flow accumulation. Flags contour trenches or masonry bunds situated outside natural drainage lines.',
      metric: 'Ridge-to-Valley Valid',
      badge: 'Catchment Physics',
    },
    {
      id: '04',
      title: 'Temporal Photo & Geotag Forensics',
      sensor: 'Drishti Telemetry + Perceptual Hash',
      tag: 'Audit Integrity',
      tagColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      description:
        'Cryptographic EXIF corroboration, solar shadow angle alignment, and perceptual image fingerprinting to stop duplicate photo recycling across disparate grant claims.',
      metric: 'Zero Spoof Tolerance',
      badge: 'Anti-Fraud Guard',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="border-t border-white/10 bg-[#070a0d] px-4 py-20 text-white sm:px-6 sm:py-28 md:px-12 lg:px-16"
      aria-labelledby="matrix-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-medium text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Verification Protocols
          </div>
          <h2
            id="matrix-heading"
            className="font-sans text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Biophysical Truth. Not an Opaque Score.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
            Every inspection packet synthesizes multi-modal physical signals. We
            replace subjective sign-offs with defensible, auditable physical
            evidence.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {checks.map((item) => (
            <div
              key={item.id}
              className="glass-card-dark flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:border-white/20 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-neutral-500">
                    {item.id}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-neutral-400">
                  {item.sensor}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
                <span className="text-neutral-400">{item.badge}</span>
                <span className="font-medium text-white">{item.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
