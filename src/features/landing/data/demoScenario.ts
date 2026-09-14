import type { ClassifiedMetric } from '../content/landingStory'

export interface DemoStatus {
  id: 'healthy' | 'monitor' | 'priority' | 'uncertain'
  symbol: string
  label: string
  cue: string
}

const illustrativeMetric = (
  id: string,
  label: string,
  value: string,
  note: string,
): ClassifiedMetric => ({
  id,
  label,
  value,
  note,
  classification: 'illustrative',
})

export const demoScenario = {
  disclosure:
    'Illustrative demo. Maharashtra, Nashik, site, model confidence, vegetation, open-water, rainfall, and priority values are mock data for explaining the interaction.',
  state: {
    name: 'Maharashtra',
    metrics: [
      illustrativeMetric(
        'state-projects',
        'projects in view',
        '38',
        'Mock programme overview.',
      ),
      illustrativeMetric(
        'state-structures',
        'structures indexed',
        '4,670',
        'Mock evidence inventory.',
      ),
      illustrativeMetric(
        'state-attention',
        'flagged for review',
        '286',
        'Mock triage result.',
      ),
    ],
  },
  district: {
    name: 'Nashik',
    metrics: [
      illustrativeMetric(
        'district-monitored',
        'structures monitored',
        '432',
        'Mock district inventory.',
      ),
      illustrativeMetric(
        'district-priority',
        'high-priority reviews',
        '27',
        'Mock priority queue.',
      ),
      illustrativeMetric(
        'district-uncertain',
        'review-required cases',
        '18',
        'Mock uncertainty queue.',
      ),
    ],
  },
  site: {
    id: 'MH-NSK-0427',
    name: 'Sample check dam MH-NSK-0427',
    place: 'Nashik, Maharashtra',
    possibleIssue: 'Possible siltation and reduced water presence',
    recommendation:
      'Engineer field verification recommended; do not schedule remediation from this screen alone.',
    bareScore: illustrativeMetric(
      'site-bare-score',
      'bare priority score',
      '42/100',
      'Mock score shown only to demonstrate why unexplained scores are insufficient.',
    ),
    metrics: [
      illustrativeMetric(
        'site-confidence',
        'model signal confidence',
        '82%',
        'Mock confidence for a model signal; not the probability that the structure is defective.',
      ),
      illustrativeMetric(
        'site-ndvi-before',
        'NDVI · earlier period',
        '0.48',
        'Mock satellite vegetation index.',
      ),
      illustrativeMetric(
        'site-ndvi-after',
        'NDVI · current period',
        '0.36',
        'Mock satellite vegetation index.',
      ),
      illustrativeMetric(
        'site-ndwi-before',
        'open-water index · baseline',
        '0.24',
        'Mock McFeeters-style NDWI signal, using green and near-infrared reflectance.',
      ),
      illustrativeMetric(
        'site-ndwi-after',
        'open-water index · current',
        '0.14',
        'Mock McFeeters-style NDWI signal; not a direct water-depth measurement.',
      ),
      illustrativeMetric(
        'site-rainfall',
        'seasonal rainfall anomaly',
        '−12%',
        'Mock deviation for a declared accumulation window and seasonal baseline.',
      ),
      illustrativeMetric(
        'site-priority',
        'priority position',
        '3 of 27',
        'Mock district queue position.',
      ),
    ],
  },
  statuses: [
    {
      id: 'healthy',
      symbol: '✓',
      label: 'No current flag',
      cue: 'Screened signals remain within the monitored baseline',
    },
    {
      id: 'monitor',
      symbol: '◷',
      label: 'Monitor',
      cue: 'Observe the next evidence cycle',
    },
    {
      id: 'priority',
      symbol: '!',
      label: 'High priority',
      cue: 'Inspection recommended',
    },
    {
      id: 'uncertain',
      symbol: '?',
      label: 'Evidence gap',
      cue: 'Evidence is missing, stale, or contradictory',
    },
  ] satisfies DemoStatus[],
  queue: [
    { rank: '01', site: 'MH-NSK-0188', status: 'Evidence gap' },
    { rank: '02', site: 'MH-NSK-0314', status: 'High priority' },
    { rank: '03', site: 'MH-NSK-0427', status: 'High priority' },
  ],
} as const

export const allIllustrativeMetrics: ClassifiedMetric[] = [
  ...demoScenario.state.metrics,
  ...demoScenario.district.metrics,
  demoScenario.site.bareScore,
  ...demoScenario.site.metrics,
]
