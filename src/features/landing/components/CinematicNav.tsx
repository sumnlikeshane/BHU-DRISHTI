import React, { useState, useEffect } from 'react'

export const CinematicNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 h-[68px] flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#DDD7CA] shadow-xs'
          : 'bg-black/20 backdrop-blur-[6px] border-b border-white/10'
      }`}
    >
      {/* Left Logo Container with Right Dividing Border */}
      <div
        className={`h-full flex items-center px-6 sm:px-8 border-r transition-colors duration-300 ${
          isScrolled ? 'border-[#DDD7CA]' : 'border-white/10'
        }`}
      >
        <a href="#top" className="flex items-center gap-3 focus:outline-none group">
          {/* Geometric Cartographic Logo Mark */}
          <div
            className={`w-6 h-6 flex items-center justify-center transition-colors ${
              isScrolled ? 'text-[#1F1E1B] group-hover:text-[#244A29]' : 'text-white group-hover:text-white/80'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="8" height="8" rx="1" />
              <rect x="13" y="13" width="8" height="8" rx="1" />
              <path d="M11 7h6v6" strokeWidth="1.8" strokeDasharray="2 2" />
            </svg>
          </div>
          <span
            className={`font-sans text-[16px] font-medium tracking-tight transition-colors ${
              isScrolled ? 'text-[#1F1E1B] group-hover:text-[#244A29]' : 'text-white group-hover:text-white/85'
            }`}
          >
            BHU-DRISHTI
          </span>
        </a>
      </div>

      {/* Right Navigation & Action Items */}
      <div className="h-full flex items-center px-6 sm:px-8 ml-auto gap-6 sm:gap-9">
        <nav
          aria-label="Primary navigation"
          className={`hidden md:flex items-center gap-7 font-sans text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 ${
            isScrolled ? 'text-[#59544B]' : 'text-white/70'
          }`}
        >
          <a href="#top" className={isScrolled ? 'hover:text-[#1F1E1B] transition-colors' : 'hover:text-white transition-colors'}>
            HOME
          </a>
          <a href="#ecosystem" className={isScrolled ? 'hover:text-[#1F1E1B] transition-colors' : 'hover:text-white transition-colors'}>
            ECOSYSTEM
          </a>
          <a href="#land" className={isScrolled ? 'hover:text-[#1F1E1B] transition-colors' : 'hover:text-white transition-colors'}>
            WATERSHED
          </a>
          <a href="#evidence" className={isScrolled ? 'hover:text-[#1F1E1B] transition-colors' : 'hover:text-white transition-colors'}>
            EVIDENCE
          </a>
          <a href="#decision" className={isScrolled ? 'hover:text-[#1F1E1B] transition-colors' : 'hover:text-white transition-colors'}>
            DECISION
          </a>
          <a href="#scale" className={isScrolled ? 'hover:text-[#1F1E1B] transition-colors' : 'hover:text-white transition-colors'}>
            SCALE
          </a>
        </nav>

        {/* Action Buttons: Earthy Forest Green CTA + Up Arrow */}
        <div className="flex items-center gap-2">
          <a
            href="/command-centre"
            className="px-5 py-2.5 bg-[#244A29] hover:bg-[#1C3B20] text-[#FAF7F2] !text-[#FAF7F2] font-sans text-[11px] font-semibold tracking-[0.14em] uppercase rounded-[4px] transition-colors shadow-sm whitespace-nowrap inline-flex items-center justify-center"
            style={{ color: '#FAF7F2' }}
          >
            COMMAND CENTRE
          </a>

          <a
            href="#ecosystem"
            className="w-[38px] h-[38px] bg-[#244A29] hover:bg-[#1C3B20] text-[#FAF7F2] !text-[#FAF7F2] flex items-center justify-center rounded-[4px] transition-colors shadow-sm"
            style={{ color: '#FAF7F2' }}
            aria-label="Explore downwards"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FAF7F2"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
