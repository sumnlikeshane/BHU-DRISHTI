import React from 'react'

export const CinematicFooter: React.FC = () => {
  return (
    <footer className="bg-[#EFEAE0] text-[#59544B] border-t border-[#DDD7CA] py-16 px-6 sm:px-12 font-mono text-xs">
      <div className="max-w-[92rem] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-xl font-light tracking-tight text-[#1F1E1B]">
              BHU-DRISHTI
            </span>
            <span className="text-[10px] text-[#8C8475] tracking-widest uppercase font-semibold">
              ® SIH26015
            </span>
          </div>
          <p className="font-sans text-xs text-[#6F695E] font-light max-w-md">
            AI &amp; GIS Decision-Support System for Watershed Monitoring. Built directly over the Drishti + Srishti/Bhuvan ecosystem.
          </p>
        </div>

        <nav aria-label="Footer Links" className="flex flex-wrap items-center gap-6 sm:gap-8 text-[#59544B]">
          <a href="#top" className="hover:text-[#244A29] transition-colors">
            TOP OF ATLAS ↑
          </a>
          <a href="/command-centre" className="hover:text-[#244A29] transition-colors">
            COMMAND CENTRE
          </a>
          <a href="/login" className="hover:text-[#244A29] transition-colors">
            OFFICER LOGIN
          </a>
          <a href="/demo" className="hover:text-[#244A29] transition-colors">
            DEMO SCENARIO
          </a>
        </nav>
      </div>

      <div className="max-w-[92rem] mx-auto mt-12 pt-8 border-t border-[#DDD7CA] flex flex-col sm:flex-row justify-between text-[11px] text-[#8C8475] gap-3">
        <div>SMART INDIA HACKATHON 2026 · PROBLEM STATEMENT SIH26015</div>
        <div>DEPARTMENT OF LAND RESOURCES · MINISTRY OF RURAL DEVELOPMENT, GOVT OF INDIA</div>
      </div>
    </footer>
  )
}
