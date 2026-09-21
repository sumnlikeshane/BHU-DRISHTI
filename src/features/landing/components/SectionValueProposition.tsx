import React from 'react'

interface ValuePropCard {
  id: string
  number: string
  title: string
  description: string
  structureType: string
  imageSrc: string
  imageAlt: string
}

const VALUE_PROPS: ValuePropCard[] = [
  {
    id: 'coverage',
    number: '01',
    title: 'Exhaustive coverage',
    description:
      'Systematic assessment of the full 52.93 lakh hectare land package and satellite data, from regional catchments to micro-structures, surfacing anomalies conventional manual methods miss.',
    structureType: 'MASONRY CHECK DAM · DRAINAGE INTERCEPTION',
    imageSrc: '/images/watershed/check-dam.jpg',
    imageAlt: 'Detailed 3D cutaway specimen of a masonry check dam water harvesting structure',
  },
  {
    id: 'accuracy',
    number: '02',
    title: 'Greater accuracy',
    description:
      'Hydrological reasoning grounding every check dam, drainage vector, and slope gradient, focusing engineering review only on genuine biophysical inconsistencies.',
    structureType: 'PERCOLATION TANK · FARM POND HARVESTING',
    imageSrc: '/images/watershed/percolation-pond.jpg',
    imageAlt: 'Detailed 3D cutaway specimen of an earthen percolation pond and harvest reservoir',
  },
  {
    id: 'speed',
    number: '03',
    title: 'Faster verification',
    description:
      'Multi-temporal satellite radar backscatter matching pre-monsoon and post-monsoon water bodies. Tested, validated, and turned into an optimized operational review queue.',
    structureType: 'CONTOUR TRENCHES · TERRACED RUNOFF RETENTION',
    imageSrc: '/images/watershed/contour-trench.jpg',
    imageAlt: 'Detailed 3D cutaway specimen of continuous contour trenches on a sloping watershed',
  },
  {
    id: 'expenditure',
    number: '04',
    title: 'Focused expenditure',
    description:
      '₹12,404 Cr public capital deployed with precision where it delivers measurable recharge, minimizing verification turnaround and eliminating ghost assets.',
    structureType: 'RECHARGE SHAFT · AQUIFER INFILTRATION',
    imageSrc: '/images/watershed/recharge-shaft.jpg',
    imageAlt: 'Detailed 3D cutaway specimen of an engineered groundwater recharge shaft filter',
  },
]

export const SectionValueProposition: React.FC = () => {
  return (
    <section
      id="value-proposition"
      aria-label="Value Proposition"
      className="relative py-24 sm:py-32 px-6 sm:px-12 bg-[#FAF7F2] text-[#1F1E1B] overflow-hidden border-b border-[#E7E2D6]"
    >
      {/* Background cartographic grid */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none bg-[linear-gradient(to_right,#ECE5D8_1px,transparent_1px),linear-gradient(to_bottom,#ECE5D8_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <div className="relative max-w-[92rem] mx-auto">
        {/* Section Header: Left Badge + Crosshair + Editorial Headline */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#DDD6C8] border border-[#CCC4B4] text-[#3D3A34] font-mono text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[3px] self-start">
            <span className="w-2 h-2 bg-[#1F1E1B] rounded-[1px]" aria-hidden="true" />
            <span>OUR VALUE PROPOSITION</span>
          </div>

          {/* Thin technical divider with crosshair */}
          <div className="hidden lg:flex items-center text-[#B0A798]" aria-hidden="true">
            <span className="font-mono text-sm leading-none">+</span>
            <div className="w-10 h-px bg-[#D5CEBF] mx-2" />
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-light text-[#1F1E1B] tracking-[-0.03em] leading-[1.1]">
            Redefining watershed verification.
          </h2>
        </div>

        {/* 4-Column Card Grid with Specimen Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {VALUE_PROPS.map((card) => (
            <article
              key={card.id}
              className="group relative bg-[#F3EFE6] border border-[#DDD7CA] rounded-[8px] flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md hover:border-[#C9C2B3] transition-all duration-300"
            >
              {/* Subtle organic contour background texture */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 300 300">
                  <path d="M-20,40 Q80,110 180,50 T320,100" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-20,90 Q90,160 190,100 T320,150" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-20,140 Q100,210 200,150 T320,200" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                  <path d="M-20,190 Q110,260 210,200 T320,250" fill="none" stroke="#1F1E1B" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Upper Card Content */}
              <div className="relative z-10 p-7 sm:p-8 pb-4 flex-1">
                {/* Meta Top Row: Badge [01] + Square Icon */}
                <div className="flex items-center justify-between">
                  <div className="px-2 py-0.5 border border-[#D5CEBF] rounded-[4px] font-mono text-[11px] text-[#787165] font-medium tracking-wider">
                    {card.number}
                  </div>
                  <span className="w-2 h-2 bg-[#A8A092] rounded-[1px]" aria-hidden="true" />
                </div>

                {/* Card Title */}
                <h3 className="font-sans text-2xl sm:text-[26px] font-light tracking-[-0.02em] text-[#1F1E1B] mt-7 leading-tight">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-xs sm:text-[13px] text-[#59544B] font-light leading-relaxed mt-4">
                  {card.description}
                </p>
              </div>

              {/* Lower Specimen Image Block */}
              <div className="relative mt-4 -mx-px -mb-px overflow-hidden rounded-b-[7px] border-t border-[#E5DFD2]/70 bg-[#ECE5D8]/40">
                {/* Soft top gradient to blend seamless into card */}
                <div
                  className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#F3EFE6] to-transparent z-10 pointer-events-none"
                  aria-hidden="true"
                />

                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  className="w-full h-52 sm:h-56 object-cover object-bottom mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Structure classification tag at bottom */}
                <div className="absolute inset-x-0 bottom-0 px-4 py-2 bg-gradient-to-t from-[#1F1E1B]/70 via-[#1F1E1B]/30 to-transparent z-20 flex items-center justify-between font-mono text-[9px] text-[#F3EFE6] tracking-wider uppercase">
                  <span>{card.structureType}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
