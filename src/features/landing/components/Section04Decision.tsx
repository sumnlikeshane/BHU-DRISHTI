import React, { useState } from 'react'

export const Section04Decision: React.FC = () => {
  const [selectedQueue, setSelectedQueue] = useState<'recollect' | 'analyst' | 'field' | 'routine'>('field')

  const queueDetails = {
    recollect: {
      tag: 'EVIDENCE GAP · RECOLLECT',
      title: 'Recollect Evidence',
      trigger: 'Missing work ID, GPS offset over 15m, poor lighting, stale capture over 60 days, or dense cloud shadow on satellite pass.',
      response: 'Dispatches targeted recapture instructions directly to the field surveyor through Drishti.',
      exampleCase: {
        id: 'QUEUE-REC-MH-084',
        workId: 'WORK-MH-STR-0012',
        location: 'Satara District, Maharashtra',
        diagnostic: 'GPS coordinate drift detected (32m from registered spillway). Cloud shadow obscured Sentinel pass.',
        action: 'Recapture task dispatched to Block Field Coordinator with target bearing instructions.',
      },
    },
    analyst: {
      tag: 'CONFLICTING SIGNALS · REVIEW',
      title: 'Analyst Review',
      trigger: 'Ground photograph shows standing water but satellite NDWI remains dry, or reference area is clouded by tree canopy.',
      response: 'Routes raw rasters and reference areas to the district GIS analyst for optical verification before categorization.',
      exampleCase: {
        id: 'QUEUE-ANL-MH-203',
        workId: 'WORK-MH-SOL-0091',
        location: 'Solapur District, Maharashtra',
        diagnostic: 'Discrepancy: Ground photo shows pooling water, but 30m pixel contains heavy tree canopy occlusion.',
        action: 'Assigned to District GIS Specialist for high-resolution optical examination.',
      },
    },
    field: {
      tag: 'HIGH PRIORITY · FIELD INSPECTION',
      title: 'Field Inspection',
      trigger: 'Plausible visible issue corroborated across multiple layers: structural breach or over 40% siltation following storm event.',
      response: 'Routes prioritized evidence packet to the block engineer for on-site inspection and remedial sanction.',
      exampleCase: {
        id: 'QUEUE-FLD-MH-102',
        workId: 'WORK-MH-NSK-0427',
        location: 'Nashik District, Maharashtra',
        diagnostic: '42% siltation capacity loss corroborated after 180mm rain event on steep 14.2° slope reach.',
        action: 'Work order for desiltation and crest wall reinforcement submitted to Project Officer.',
      },
    },
    routine: {
      tag: 'SEASONAL BASELINE · MONITORING',
      title: 'Routine Monitoring',
      trigger: 'Observations fall within historical seasonal baseline with no material anomaly. Not labeled structurally safe without engineer cert.',
      response: 'Schedules the next seasonal satellite observation and records the case in the monitoring ledger.',
      exampleCase: {
        id: 'QUEUE-ROU-MH-045',
        workId: 'WORK-MH-AHM-0045',
        location: 'Ahmednagar District, Maharashtra',
        diagnostic: 'Post-monsoon open-water NDWI (0.64) matches seasonal expectation. Masonry intact.',
        action: 'Scheduled for next quarterly post-monsoon satellite revisit.',
      },
    },
  }

  const active = queueDetails[selectedQueue]

  return (
    <section id="decision" className="relative py-28 px-6 sm:px-12 bg-[#FAF7F2] text-[#1F1E1B] border-t border-[#E7E2D6]">
      <div className="max-w-[92rem] mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-[#244A29] tracking-widest uppercase font-semibold mb-3">
            04 · OPERATIONAL TRIAGE
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl font-light tracking-[-0.03em] uppercase text-[#1F1E1B]">
            THE DECISION
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#59544B] font-light leading-relaxed">
            Prioritize human attention instead of computing an abstract score. The triage system assigns every record to one of four actionable operational queues.
          </p>
        </div>

        {/* 4 Review Queue Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#D8D2C5] mb-12">
          {(['recollect', 'analyst', 'field', 'routine'] as const).map((qKey) => {
            const isSelected = selectedQueue === qKey
            const info = queueDetails[qKey]

            return (
              <button
                key={qKey}
                type="button"
                onClick={() => setSelectedQueue(qKey)}
                className={`text-left p-4 transition-all border-l-2 ${
                  isSelected
                    ? 'border-[#244A29] bg-[#F2EDE2] text-[#1F1E1B]'
                    : 'border-transparent text-[#59544B] hover:text-[#1F1E1B] hover:bg-[#F6F2EB]'
                }`}
              >
                <div className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#244A29]">
                  {info.tag}
                </div>
                <div className="font-sans text-xl font-light text-[#1F1E1B] mt-1 mb-1">
                  {info.title}
                </div>
                <p className="font-sans text-xs text-[#6B6559] font-light line-clamp-2 leading-relaxed">
                  {info.trigger}
                </p>
              </button>
            )
          })}
        </div>

        {/* Active Selected Queue Case Inspector */}
        <div className="bg-[#F3EFE6]/80 p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-[#D8D2C5] gap-2 font-mono text-xs">
            <span className="text-base font-sans text-[#1F1E1B] font-light">
              Triage Case File: <strong className="font-normal text-[#244A29]">{active.title} Queue</strong>
            </span>
            <span className="text-[#787165]">
              Reference: {active.exampleCase.id}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="font-mono text-xs text-[#244A29] font-semibold uppercase">TRIGGER CONDITION</div>
                <p className="mt-2 font-sans text-base text-[#1F1E1B] font-light leading-relaxed">
                  {active.trigger}
                </p>
              </div>

              <div>
                <div className="font-mono text-xs text-[#244A29] font-semibold uppercase">OPERATIONAL ACTION</div>
                <p className="mt-2 font-sans text-sm text-[#59544B] font-light leading-relaxed">
                  {active.response}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2C5] font-mono text-xs text-[#59544B] space-y-2">
                <div className="text-xs text-[#1F1E1B] font-semibold uppercase mb-2">CASE EVIDENCE SUMMARY</div>
                <div>Work ID: <strong className="text-[#1F1E1B]">{active.exampleCase.workId}</strong></div>
                <div>Location: {active.exampleCase.location}</div>
                <div>Diagnostic: {active.exampleCase.diagnostic}</div>
                <div className="pt-2 text-[#244A29] font-semibold">
                  Action Assigned: {active.exampleCase.action}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 font-mono text-xs border-l border-[#D8D2C5] pl-8">
              <div className="text-[#1F1E1B] font-semibold uppercase">
                Accountable Oversight
              </div>

              <p className="font-sans text-xs text-[#59544B] font-light leading-relaxed">
                NIST AI Risk Management Framework aligned. The system never labels a structure safe or defective on algorithmic confidence alone. High-consequence cases require designated engineer verification before public funds or repair works are committed.
              </p>

              <div className="pt-4">
                <a
                  href="/command-centre"
                  className="inline-flex items-center gap-2 text-[#244A29] hover:text-[#1C3B20] font-sans text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  <span>Open Triage Queue in Command Centre</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
