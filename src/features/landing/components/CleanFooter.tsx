export function CleanFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#040608] px-4 py-16 text-xs text-neutral-400 sm:px-6 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 md:flex-row">
        <div className="max-w-sm space-y-4">
          <div className="flex items-center gap-2.5 text-white">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 bg-white/10 font-mono text-xs font-bold text-emerald-400">
              &amp;
            </div>
            <span className="font-sans text-base font-bold tracking-tight text-white">
              BHU-DRISHTI
            </span>
          </div>
          <p className="text-xs leading-relaxed text-neutral-400">
            AI and GIS decision-support layer for watershed monitoring. Designed
            for the Smart India Hackathon 2026 problem statement SIH26015.
          </p>
          <div className="font-mono text-[11px] text-neutral-500">
            Drishti captures · Srishti maps · BHU-DRISHTI interprets.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 font-mono text-xs sm:grid-cols-3">
          <div className="space-y-3">
            <div className="text-[11px] font-semibold tracking-wider text-white uppercase">
              Platform
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  Architecture
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-white"
                >
                  Biophysical Matrix
                </a>
              </li>
              <li>
                <a
                  href="#impact"
                  className="transition-colors hover:text-white"
                >
                  Catchment Impact
                </a>
              </li>
              <li>
                <a
                  href="/command-centre"
                  className="transition-colors hover:text-white"
                >
                  Command Centre
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-semibold tracking-wider text-white uppercase">
              Standards
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <span className="text-neutral-500">WDC-PMKSY 2.0</span>
              </li>
              <li>
                <span className="text-neutral-500">NRSC Drishti Sync</span>
              </li>
              <li>
                <span className="text-neutral-500">ISRO Bhuvan GIS</span>
              </li>
              <li>
                <span className="text-neutral-500">CartoDEM 30m</span>
              </li>
            </ul>
          </div>

          <div className="col-span-2 space-y-3 sm:col-span-1">
            <div className="text-[11px] font-semibold tracking-wider text-white uppercase">
              Access
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="/login" className="transition-colors hover:text-white">
                  Secure Sign In
                </a>
              </li>
              <li>
                <a href="/demo" className="transition-colors hover:text-white">
                  Interactive Demo
                </a>
              </li>
              <li>
                <a href="#top" className="transition-colors hover:text-white">
                  Back to Top ↑
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 font-mono text-[11px] text-neutral-500 sm:flex-row">
        <div>© 2026 BHU-DRISHTI · Built for Smart India Hackathon 2026</div>
        <div className="flex items-center gap-6">
          <span>Department of Land Resources &amp; Jal Shakti Aligned</span>
          <span>Open Spatial Standards</span>
        </div>
      </div>
    </footer>
  )
}
