import React, { useEffect, useRef } from 'react'

export const CinematicVideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      videoRef.current.pause()
      return
    }

    const playPromise = videoRef.current.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Autoplay policy fallback
      })
    }
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#0C0D0E] text-white select-none">
      {/* 1. Full-Screen Cinematic Video Asset (hero.mp4 only) */}
      <video
        ref={videoRef}
        data-testid="hero-video"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* 2. Soft Atmospheric Gradient for Crisp Typography Legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Subtle Center Telemetry Crosshair (Matching Reference Viewfinder) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center opacity-40"
        aria-hidden="true"
      >
        <div className="absolute w-[360px] sm:w-[480px] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute h-[180px] sm:h-[240px] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="relative font-mono text-[10px] text-white/40 select-none">
          +
        </div>
      </div>

      {/* 4. Left Asymmetric Text: "From terrain" (Positioned with clear vertical elevation and left anchor) */}
      <div className="absolute left-6 sm:left-[5vw] bottom-[34vh] sm:bottom-[30vh] lg:bottom-[28vh] z-20 pointer-events-none max-w-[44vw]">
        <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.75rem] 2xl:text-[7.5rem] font-light tracking-[-0.035em] leading-none text-white whitespace-nowrap drop-shadow-[0_4px_36px_rgba(0,0,0,0.7)]">
          From terrain
        </h1>
      </div>

      {/* 5. Right Asymmetric Lower Text: "To intelligence" (Positioned lower with clear horizontal and vertical separation) */}
      <div className="absolute right-6 sm:right-[5vw] bottom-[8vh] sm:bottom-[7vh] lg:bottom-[6vh] z-20 pointer-events-none max-w-[48vw] text-right">
        <h2 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.75rem] 2xl:text-[7.5rem] font-light tracking-[-0.035em] leading-none text-white whitespace-nowrap drop-shadow-[0_4px_36px_rgba(0,0,0,0.7)]">
          To intelligence
        </h2>
      </div>
    </section>
  )
}
