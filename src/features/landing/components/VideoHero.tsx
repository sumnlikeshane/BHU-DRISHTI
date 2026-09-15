import { useEffect, useRef, useState } from 'react'

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeVisual, setActiveVisual] = useState<'raster' | 'stream'>('raster')
  const [timeString, setTimeString] = useState('IN, 14:03:41 IST')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatted = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now)
        setTimeString(`IN, ${formatted} IST`)
      } catch {
        setTimeString('IN, 14:03:41 IST')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

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
      className="relative w-full bg-white text-neutral-900 pb-12 pt-4 sm:pb-16 sm:pt-6"
      aria-label="Hero Overview"
    >
      <div className="mx-auto max-w-[94rem] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Top Minimalist Navigation (Exact Reference Layout) */}
        <header className="flex w-full items-center justify-between border-b border-neutral-100 pb-4 text-xs sm:text-sm">
          {/* Brand Mark with Registered Symbol */}
          <a
            href="#top"
            className="group flex items-center gap-1.5 font-sans font-semibold tracking-tight text-neutral-950 transition-opacity hover:opacity-75"
            aria-label="BHU-DRISHTI Home"
          >
            <span className="text-base sm:text-lg font-medium">BHU-DRISHTI</span>
            <sup className="text-[10px] font-normal tracking-normal text-neutral-400">®</sup>
          </a>

          {/* Clean Navigation Links */}
          <nav
            className="hidden items-center gap-7 lg:gap-10 font-sans text-neutral-600 md:flex"
            aria-label="Primary navigation"
          >
            <a
              href="#about"
              className="transition-colors hover:text-neutral-950 hover:underline underline-offset-8 decoration-neutral-300"
            >
              About
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-neutral-950 hover:underline underline-offset-8 decoration-neutral-300"
            >
              How It Works
            </a>
            <a
              href="#impact"
              className="transition-colors hover:text-neutral-950 hover:underline underline-offset-8 decoration-neutral-300"
            >
              Impact
            </a>
            <a
              href="/login"
              className="text-neutral-400 transition-colors hover:text-neutral-950 hover:underline underline-offset-8 decoration-neutral-300"
            >
              Login Secure
            </a>
          </nav>

          {/* Right Utility (Timestamp + Sleek Action Arrow) */}
          <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs">
            <span className="hidden sm:inline-block font-mono text-neutral-400 tracking-tight">
              {timeString}
            </span>
            <a
              href="/command-centre"
              className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-medium text-neutral-950 transition-colors hover:text-neutral-600"
            >
              <span>Start review intake</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </header>

        {/* Asymmetric 3-Column Editorial Hero Grid */}
        <div className="pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:gap-10 items-start">
            {/* Left Column: Index Number */}
            <div className="md:col-span-1 lg:col-span-1">
              <span className="font-sans text-2xl font-light tracking-tight text-neutral-400 sm:text-3xl lg:text-4xl">
                /01
              </span>
            </div>

            {/* Center Column: Dominant Lightweight Headline + Subtitle + Description */}
            <div className="md:col-span-7 lg:col-span-7 pr-0 lg:pr-6">
              <h1 className="font-sans text-3xl font-light tracking-[-0.035em] text-neutral-950 sm:text-5xl md:text-5xl lg:text-6xl xl:text-[3.75rem] leading-[1.06]">
                A Decision-Support Layer for Watershed Monitoring
              </h1>
              <p className="mt-2.5 sm:mt-3 font-sans text-base sm:text-lg lg:text-xl font-light tracking-tight text-neutral-600">
                Drishti captures the ground. Srishti shows it on a map. BHU-DRISHTI reads the evidence and tells an officer what to do next.
              </p>

              <div className="mt-3.5 sm:mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600 font-normal">
                <p>
                  Built directly over the existing Drishti + Srishti/Bhuvan ecosystem. It connects
                  geo-coded photographs, satellite observations and watershed context to turn existing
                  records into an explainable review queue.
                </p>
              </div>

              {/* Editorial Inline Contextual Data & Core Product Principle */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-8 border-t border-neutral-100 pt-4">
                <div>
                  <div className="font-sans text-xl sm:text-2xl font-light text-neutral-950">
                    1,220
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    Sanctioned Projects
                  </div>
                </div>

                <div className="h-6 w-px bg-neutral-200 hidden sm:block" />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xl sm:text-2xl font-light text-neutral-950">
                      1.24 Lakh
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    Water Structures
                  </div>
                </div>

                <div className="h-6 w-px bg-neutral-200 hidden sm:block" />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm sm:text-base font-light text-neutral-950">
                      MH · RJ · MP · KA
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500 border border-neutral-200 px-1 py-0.2">
                      Remote
                    </span>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    Coverage
                  </div>
                </div>

                <div className="ml-auto">
                  <a
                    href="#how-it-works"
                    className="group inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
                  >
                    <span>Evidence Fusion Architecture</span>
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Structured Metadata / Project Info */}
            <div className="md:col-span-4 lg:col-span-4 md:border-l md:border-neutral-100 md:pl-6 lg:pl-8">
              <div className="space-y-3">
                <div className="font-sans text-xs font-medium tracking-tight text-neutral-900">
                  Project Info
                </div>
                <div className="h-px w-full bg-neutral-200" />

                <dl className="space-y-2 font-sans text-xs">
                  <div className="flex justify-between gap-4 py-0.5 border-b border-neutral-100">
                    <dt className="text-neutral-400 font-normal">Layer</dt>
                    <dd className="text-right text-neutral-950 font-normal">
                      Decision-Support Layer
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-0.5 border-b border-neutral-100">
                    <dt className="text-neutral-400 font-normal">Ecosystem</dt>
                    <dd className="text-right text-neutral-950 font-normal">
                      Drishti + Srishti/Bhuvan
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-0.5 border-b border-neutral-100">
                    <dt className="text-neutral-400 font-normal">Programme</dt>
                    <dd className="text-right text-neutral-950 font-normal">
                      WDC-PMKSY 2.0 / DoLR
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-0.5 border-b border-neutral-100">
                    <dt className="text-neutral-400 font-normal">Earth Obs</dt>
                    <dd className="text-right text-neutral-950 font-normal">
                      30m SRISHTI-DRISHTI
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-0.5 border-b border-neutral-100">
                    <dt className="text-neutral-400 font-normal">Ground Truth</dt>
                    <dd className="text-right text-neutral-950 font-normal">
                      Geo-coded Drishti Photos
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-0.5">
                    <dt className="text-neutral-400 font-normal">Deliverable</dt>
                    <dd className="text-right text-neutral-950 font-normal">
                      Explainable Review Queue
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Large Feature / Visual Content Area (Directly Matching Reference) */}
        <div className="relative w-full overflow-hidden border border-neutral-200 bg-neutral-950 text-white">
          {/* Mode Switcher / Architectural Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/90 px-4 py-2.5 font-mono text-[11px] text-neutral-400 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CATCHMENT ID: MH-NSK-0427 · TRIMBAKESHWAR BASIN</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setActiveVisual('raster')}
                className={`transition-colors ${
                  activeVisual === 'raster'
                    ? 'text-white font-medium underline underline-offset-4'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Dither Raster
              </button>
              <span className="text-neutral-600">/</span>
              <button
                type="button"
                onClick={() => setActiveVisual('stream')}
                className={`transition-colors ${
                  activeVisual === 'stream'
                    ? 'text-white font-medium underline underline-offset-4'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Kinetic Stream
              </button>
            </div>
          </div>

          {/* Visual Container */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-neutral-950">
            {/* Background Video (Kept for automated tests and live kinetic mode) */}
            <video
              ref={videoRef}
              src="/ditther-150926-112600-720x404.mp4"
              autoPlay={!prefersReducedMotion}
              loop
              muted
              playsInline
              data-testid="hero-video"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 select-none ${
                activeVisual === 'stream' ? 'opacity-90' : 'opacity-0 pointer-events-none'
              }`}
              aria-hidden="true"
            />

            {/* User-Provided Dither Raster Visual */}
            <img
              src="/ditther-150926-121324.png"
              alt="Catchment biophysical raster telemetry"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 select-none ${
                activeVisual === 'raster' ? 'opacity-95' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Subtle corner architectural metadata */}
            <div className="absolute bottom-4 left-4 z-10 font-mono text-[10px] sm:text-xs text-white/80 bg-black/60 px-3 py-1.5 backdrop-blur-sm border border-white/10">
              RESOL: 10m MULTISPECTRAL · REVISIT: 5-DAY · SENSOR: SENTINEL-1/2
            </div>
          </div>

          {/* Architectural Figure Caption */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/10 bg-neutral-900/90 px-4 py-2.5 font-mono text-[11px] text-neutral-400">
            <div>
              Fig. 01 — Multi-source evidence fusion: Geo-coded Drishti ground truth, 30m SRISHTI-DRISHTI satellite data &amp; watershed terrain context.
            </div>
            <div className="text-neutral-500">
              LAT: 20.26° N · LON: 73.61° E
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

