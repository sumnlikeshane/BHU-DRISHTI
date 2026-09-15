export function CleanFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-16 text-xs text-neutral-500">
      <div className="mx-auto max-w-[94rem] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row pb-12 border-b border-neutral-200">
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-1.5 font-sans text-sm font-semibold tracking-tight text-neutral-950">
              <span>BHU-DRISHTI</span>
              <sup className="text-[10px] font-normal tracking-normal text-neutral-400">®</sup>
            </div>
            <p className="text-xs leading-relaxed text-neutral-600 font-normal">
              BHU-DRISHTI is a decision-support layer for watershed development monitoring.
              Works on top of the existing Drishti + Srishti/Bhuvan ecosystem.
            </p>
            <div className="font-mono text-[11px] text-neutral-400">
              Drishti captures · Srishti shows · BHU-DRISHTI reads and recommends.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 font-sans text-xs sm:grid-cols-3 lg:gap-16">
            <div className="space-y-3">
              <div className="text-[11px] font-medium tracking-wider text-neutral-950 uppercase">
                Platform
              </div>
              <ul className="space-y-2 text-neutral-600 font-normal">
                <li>
                  <a href="#about" className="transition-colors hover:text-neutral-950">
                    Interpretation Gap
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="transition-colors hover:text-neutral-950"
                  >
                    Evidence Fusion
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    className="transition-colors hover:text-neutral-950"
                  >
                    Four Review States
                  </a>
                </li>
                <li>
                  <a
                    href="#impact"
                    className="transition-colors hover:text-neutral-950"
                  >
                    Scale &amp; Impact
                  </a>
                </li>
                <li>
                  <a
                    href="/command-centre"
                    className="transition-colors hover:text-neutral-950"
                  >
                    Command Centre
                  </a>
                </li>
                <li>
                  <a
                    href="#celebrate"
                    className="transition-colors hover:text-neutral-950"
                  >
                    Celebrate Milestone
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-medium tracking-wider text-neutral-950 uppercase">
                Standards
              </div>
              <ul className="space-y-2 text-neutral-600 font-normal">
                <li>
                  <span className="text-neutral-400">WDC-PMKSY 2.0</span>
                </li>
                <li>
                  <span className="text-neutral-400">NRSC Drishti Sync</span>
                </li>
                <li>
                  <span className="text-neutral-400">ISRO Bhuvan GIS</span>
                </li>
                <li>
                  <span className="text-neutral-400">CartoDEM 30m</span>
                </li>
              </ul>
            </div>

            <div className="col-span-2 space-y-3 sm:col-span-1">
              <div className="text-[11px] font-medium tracking-wider text-neutral-950 uppercase">
                Access
              </div>
              <ul className="space-y-2 text-neutral-600 font-normal">
                <li>
                  <a href="/login" className="transition-colors hover:text-neutral-950">
                    Secure Sign In
                  </a>
                </li>
                <li>
                  <a href="/demo" className="transition-colors hover:text-neutral-950">
                    Interactive Demo
                  </a>
                </li>
                <li>
                  <a href="#top" className="transition-colors hover:text-neutral-950">
                    Back to Top ↑
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 font-mono text-[11px] text-neutral-400 sm:flex-row">
          <div>© 2026 BHU-DRISHTI · Smart India Hackathon 2026</div>
          <div className="flex items-center gap-6">
            <span>Department of Land Resources Aligned</span>
            <span>Open Spatial Standards</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
