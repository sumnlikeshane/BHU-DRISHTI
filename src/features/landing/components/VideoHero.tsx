import { useEffect, useRef, useState } from 'react'

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (prefersReducedMotion) {
        if (typeof videoRef.current.pause === 'function') {
          videoRef.current.pause()
        }
      } else {
        if (typeof videoRef.current.play === 'function') {
          const playPromise = videoRef.current.play()
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
              // Autoplay policy fallback
            })
          }
        }
      }
    }
  }, [prefersReducedMotion])

  return (
    <section
      className="relative flex min-h-[94vh] flex-col justify-between bg-[#06080a] p-2.5 sm:p-4 md:p-6"
      aria-label="Hero Overview"
    >
      {/* Outer rounded container matching the reference card frame */}
      <div className="relative flex min-h-[88vh] flex-1 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090d11] p-6 shadow-2xl sm:rounded-[2.25rem] sm:p-8 md:rounded-[2.75rem] md:p-12 lg:p-16">
        {/* Background Video */}
        <video
          ref={videoRef}
          src="/ditther-150926-112600-720x404.mp4"
          autoPlay={!prefersReducedMotion}
          loop
          muted
          playsInline
          data-testid="hero-video"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 select-none ${
            isVideoLoaded ? 'opacity-85' : 'opacity-30'
          }`}
          aria-hidden="true"
        />

        {/* Retro pixel / LED dither mesh overlay texture */}
        <div
          className="dither-mesh-overlay pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay"
          aria-hidden="true"
        />

        {/* Ambient gradients for high contrast and readability */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080a] via-[#06080a]/50 to-[#06080a]/30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(6,8,10,0.88)_0%,rgba(6,8,10,0.45)_55%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Top Navigation Bar */}
        <header className="relative z-10 flex w-full items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#top"
            className="group inline-flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
            aria-label="BHU-DRISHTI Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 font-mono text-sm font-bold text-emerald-400 shadow-inner backdrop-blur-md transition-colors group-hover:border-emerald-400/50">
              &amp;
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm leading-none font-bold tracking-tight text-white sm:text-base">
                BHU-DRISHTI
              </span>
              <span className="mt-0.5 font-mono text-[9px] tracking-widest text-neutral-400 uppercase sm:text-[10px]">
                Catchment Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            className="hidden items-center gap-8 text-xs font-medium text-neutral-300 md:flex"
            aria-label="Primary navigation"
          >
            <a href="#about" className="transition-colors hover:text-white">
              About
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-white"
            >
              How It Works
            </a>
            <a href="#impact" className="transition-colors hover:text-white">
              Impact
            </a>
            <a
              href="/login"
              className="text-neutral-400 transition-colors hover:text-white"
            >
              Login Secure
            </a>
          </nav>

          {/* Top-Right Action Pill Button (Exact Reference Match) */}
          <div className="flex items-center gap-3">
            <a
              href="/command-centre"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-tight text-black shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-neutral-100 active:scale-[0.98] sm:px-6 sm:py-2.5 sm:text-sm"
            >
              Start review intake
            </a>
          </div>
        </header>

        {/* Lower Hero Content (Lower-Left Alignment) */}
        <div className="relative z-10 mt-auto pt-24 pb-4 sm:pt-32">
          <div className="max-w-3xl">
            {/* Primary Display Headline */}
            <h1 className="font-sans text-3xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Structure Your <br />
              Catchment Requirement
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="mt-4 max-w-2xl text-sm leading-relaxed font-normal text-balance text-neutral-300 sm:mt-5 sm:text-base md:text-lg">
              We cross-verify geotagged Drishti ground photos, Sentinel-1/2
              satellite hydrology, and terrain slope models across PMKSY assets.
              Continuous biophysical truth before fund disbursal.
            </p>

            {/* Action Buttons Row */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <a
                href="/command-centre"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold tracking-tight text-black shadow-xl transition-all duration-200 hover:scale-[1.02] hover:bg-neutral-100 active:scale-[0.98] sm:text-sm"
              >
                Start review intake
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-xs font-medium tracking-tight text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:bg-white/15 active:scale-[0.98] sm:text-sm"
              >
                Review Evidence Audits?
              </a>
            </div>

            {/* Floating Glass Metric Cards (Bottom-Left) */}
            <div className="mt-8 flex max-w-xl flex-wrap gap-3 sm:mt-10 sm:gap-4">
              {/* Card 1: Interventions under mandate */}
              <div className="min-w-[170px] flex-1 rounded-2xl border border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-black/60 sm:min-w-[200px] sm:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-5 w-5 items-center justify-center rounded text-neutral-400">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    412
                  </span>
                </div>
                <div className="mt-3">
                  <div className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    34,850
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-wider text-neutral-400 uppercase">
                    Watersheds Audited
                  </div>
                </div>
              </div>

              {/* Card 2: National coverage */}
              <div className="min-w-[170px] flex-1 rounded-2xl border border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-black/60 sm:min-w-[200px] sm:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-5 w-5 items-center justify-center rounded text-neutral-400">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/20 px-2.5 py-0.5 font-mono text-[10px] font-medium text-indigo-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    Remote
                  </span>
                </div>
                <div className="mt-3">
                  <div className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    MH · RJ · MP · KA
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-wider text-neutral-400 uppercase">
                    Coverage
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Bottom Right Metadata */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 font-mono text-[11px] text-neutral-500">
            <div>Smart India Hackathon 2026 · Problem Statement SIH26015</div>
            <div className="flex items-center gap-6">
              <span>© 2026 BHU-DRISHTI</span>
              <a
                href="#about"
                className="transition-colors hover:text-neutral-300"
              >
                Terms
              </a>
              <a
                href="#about"
                className="transition-colors hover:text-neutral-300"
              >
                Privacy
              </a>
              <a
                href="#about"
                className="transition-colors hover:text-neutral-300"
              >
                Data Provenance
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
