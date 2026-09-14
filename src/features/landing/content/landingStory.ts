export type MetricClassification = 'official' | 'derived' | 'illustrative'

export interface ClassifiedMetric {
  id: string
  label: string
  value: string
  classification: MetricClassification
  note: string
  source?: {
    name: string
    url: string
    asOf: string
  }
}

export interface NarrativeSection {
  eyebrow: string
  heading: string
  body: string
}

export interface ResearchSource {
  label: string
  publisher: string
  url: string
  supports: string
}

export const metricClassificationLabels: Record<MetricClassification, string> =
  {
    official: 'Official',
    derived: 'Derived',
    illustrative: 'Illustrative demo',
  }

export const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Impact', href: '#impact' },
  { label: 'Research', href: '#research-basis' },
] as const

export const previewActions = {
  login: { label: 'Login', qualifier: 'Secure', href: '/login' },
  commandCentre: {
    label: 'Enter Command Centre',
    qualifier: 'Live',
    href: '/command-centre',
  },
  demo: {
    label: 'Explore Demo',
    qualifier: 'Sign in',
    href: '/demo',
  },
  architecture: {
    label: 'View Architecture',
    qualifier: 'Preview',
    href: '#how-it-works',
  },
} as const

export const nationalProgrammeMetrics: ClassifiedMetric[] = [
  {
    id: 'wdc-projects',
    label: 'WDC-PMKSY 2.0 projects',
    value: '1,220',
    classification: 'official',
    note: 'Government of India programme figure.',
    source: {
      name: 'Press Information Bureau progress review',
      url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2305550&lang=1&reg=48',
      asOf: '1 September 2026',
    },
  },
  {
    id: 'sanctioned-area',
    label: 'hectares covered by sanctioned projects',
    value: '52.93 lakh',
    classification: 'official',
    note: 'Sanctioned programme area, not a measured impact result.',
    source: {
      name: 'Press Information Bureau progress review',
      url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2305550&lang=1&reg=48',
      asOf: '1 September 2026',
    },
  },
  {
    id: 'water-structures',
    label: 'water-harvesting structures constructed or rejuvenated',
    value: '≈1.24 lakh',
    classification: 'official',
    note: 'Rounded programme figure; the underlying MIS total changes over time.',
    source: {
      name: 'Press Information Bureau progress review',
      url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2305550&lang=1&reg=48',
      asOf: '1 September 2026',
    },
  },
]

export const landingStory = {
  hero: {
    eyebrow: 'Watershed intelligence for India',
    heading: 'From geo-coded evidence to watershed decisions.',
    body: 'A proposed decision-support layer that aligns field photographs with satellite, rainfall, and terrain evidence—so officials can see what changed, what remains uncertain, and what to verify next.',
    prompt: 'Explore the static story',
  },
  mapChapters: [
    {
      label: 'india-intro',
      breadcrumb: ['India'],
      eyebrow: 'Watershed intelligence for India',
      heading: 'From geo-coded evidence to watershed decisions.',
      body: 'Align field photographs with satellite, rainfall, and terrain evidence—then show officials what changed, what remains uncertain, and what to verify next.',
      detail: 'Scroll to explore',
      content: 'hero',
    },
    {
      label: 'evidence-scale',
      breadcrumb: ['India', 'Evidence at scale'],
      eyebrow: 'Official programme scale',
      heading: 'A national evidence estate, already in motion.',
      body: 'As of 1 September 2026, WDC-PMKSY 2.0 reported 1,220 sanctioned projects across 52.93 lakh hectares and 1.24 lakh water-harvesting structures constructed or rejuvenated. These are programme outputs—not proof of site-level outcomes.',
      detail: 'Official figures · as of 1 September 2026',
      content: 'national-metrics',
    },
    {
      label: 'triage-question',
      breadcrumb: ['India', 'Triage'],
      eyebrow: 'From evidence to attention',
      heading:
        'Every structure is evidence. Not every structure requires attention.',
      body: 'The operational problem is not to score every asset. It is to separate usable evidence from missing evidence, routine monitoring from possible risk, and automated screening from decisions that require an engineer.',
      detail: 'Four explainable review states',
      content: 'statuses',
    },
    {
      label: 'maharashtra-focus',
      breadcrumb: ['India', 'Maharashtra'],
      eyebrow: 'Illustrative demo · Maharashtra',
      heading: 'Move from national coverage to state attention.',
      body: 'Maharashtra separates while India remains visible as context. State values describe a mock interaction, not live results.',
      detail: 'Prototype administrative boundaries',
      content: 'state-metrics',
    },
    {
      label: 'nashik-focus',
      breadcrumb: ['India', 'Maharashtra', 'Nashik'],
      eyebrow: 'Illustrative demo · Nashik',
      heading: 'Focus on one district without erasing its neighbours.',
      body: 'Every Maharashtra district remains bounded and legible while Nashik receives restrained amber emphasis. These are district—not watershed—boundaries.',
      detail: 'All available district geometries remain visible',
      content: 'district-metrics',
    },
    {
      label: 'priority-site',
      breadcrumb: ['India', 'Maharashtra', 'Nashik', 'MH-NSK-0427'],
      eyebrow: 'Illustrative priority site',
      heading: 'One possible issue, with the evidence needed to review it.',
      body: 'MH-NSK-0427 combines a possible visible siltation cue with weaker landscape signals. Rainfall may explain part of the change, and a photograph cannot establish internal structural safety. The defensible output is an inspection candidate—not a diagnosis.',
      detail: 'Human verification required',
      content: 'site',
    },
    {
      label: 'solution-handoff',
      breadcrumb: ['India', 'Evidence', 'Explanation'],
      eyebrow: 'The intelligence question',
      heading: 'But how does BHU-DRISHTI know?',
      body: 'It first checks whether the observation is usable, then compares like with like across time, tests independent signals for agreement, exposes contradictions, and routes the evidence to a responsible official.',
      detail: 'Continue to the evidence model',
      content: 'handoff',
    },
  ],
  monitoringGap: {
    eyebrow: 'The monitoring gap',
    heading:
      'Collection is designed in. Interpretation is still the hard part.',
    body: 'WDC-PMKSY 2.0 guidance already calls for geo-tagged work photographs, GIS verification, a web MIS, unique work IDs, and pre–mid–post remote-sensing comparison. The unresolved task is to turn those records into a defensible review queue without confusing a signal with a finding.',
  },
  intelligenceLayer: {
    eyebrow: 'The BHU-DRISHTI intelligence layer',
    heading: 'Add reasoning between evidence systems and field action.',
    body: 'BHU-DRISHTI does not need to become another collection app. Its role is to preserve the work ID, place, time, source, and quality of each signal; make comparisons explicit; and return a review packet to the officer or engineer who owns the decision.',
  },
  evidence: {
    eyebrow: 'Four evidence inputs',
    heading: 'Give every signal a job—and a boundary.',
    body: 'Evidence fusion is useful only when each source answers a defined question. The system should retain source, acquisition time, spatial scale, quality flags, and the limit of what that evidence can support.',
    inputs: [
      {
        symbol: '01',
        title: 'Field observation',
        body: 'A work-linked, time-stamped photograph can support visible cues such as standing water, erosion, obstruction, or possible siltation. It cannot certify internal structural safety.',
      },
      {
        symbol: '02',
        title: 'Earth observation',
        body: 'Quality-masked, season-matched time series describe landscape greenness and water extent around the intervention. A satellite pixel is context—not a close-up inspection.',
      },
      {
        symbol: '03',
        title: 'Hydrometeorology',
        body: 'Rainfall amount, timing, and anomaly over a declared window help explain whether a wet or green signal is climatically plausible. Rainfall adjustment alone does not prove impact.',
      },
      {
        symbol: '04',
        title: 'Watershed context',
        body: 'Intervention geometry, micro-watershed, slope, drainage, soils, and upstream–downstream position establish physical context and the right spatial unit for comparison.',
      },
    ],
  },
  fusion: {
    eyebrow: 'Evidence fusion',
    heading: 'Validate, align, compare—then decide whether to speak.',
    body: 'A useful fusion pipeline rejects unusable inputs, aligns evidence by work ID, geography, season, and scale, compares change against a baseline, and records both supporting and contradictory signals. If the evidence is inadequate, the correct output is “insufficient evidence.”',
  },
  explainability: {
    eyebrow: 'Explainable priority',
    heading: 'Return an evidence packet, not a mystery score.',
    body: 'A reviewable result separates observations from derived indicators and inference. It names the comparison period, data-quality limits, contradictory evidence, confidence basis, and the next action—with links back to every source record.',
  },
  humanLoop: {
    eyebrow: 'Human in the loop',
    heading: 'Make escalation rules explicit.',
    body: 'Poor data should trigger recollection, conflicting signals should trigger analyst review, and plausible high-consequence issues should trigger field inspection. Confidence never transfers decision authority from the responsible official or engineer.',
  },
  scale: {
    eyebrow: 'Prioritisation at scale',
    heading: 'Use automation to allocate attention, not declare truth.',
    body: 'A national inventory becomes workable when cases are ranked by plausible consequence, evidence strength, urgency, and uncertainty. Separate queues for possible risk and missing evidence prevent low-quality records from masquerading as healthy sites.',
  },
  impact: {
    eyebrow: 'Impact without overclaiming',
    heading: 'A change is observed. An impact must be demonstrated.',
    body: 'Compare quality-screened observations from the same season and resolution, account for rainfall, and—where feasible—use similar untreated reference areas across multiple years. Until satellite, field, and programme outcomes converge, describe association rather than causation.',
  },
  workflow: {
    eyebrow: 'Complete workflow',
    heading: 'Keep an auditable chain from capture to closure.',
    body: 'Every transformation should retain the work ID, input provenance, comparison window, model version, quality checks, reviewer, decision, and eventual field outcome.',
    steps: [
      'Validate work record',
      'Extract visible cues',
      'Align spatial evidence',
      'Compare baseline and reference',
      'Assess + abstain',
      'Route for human review',
      'Record outcome + learn',
    ],
  },
  product: {
    eyebrow: 'Plan · Monitor · Evaluate · Act',
    heading: 'One evidence model, four distinct decisions.',
    body: 'Planning, monitoring, evaluation, and action should reuse the same source records while applying different questions, thresholds, and levels of authority.',
    modes: [
      {
        title: 'Plan',
        body: 'Screen candidate areas using watershed, drainage, slope, soil, and programme constraints.',
      },
      {
        title: 'Monitor',
        body: 'Track each work ID through comparable observations and surface missing or stale evidence.',
      },
      {
        title: 'Evaluate',
        body: 'Test change across seasons, rainfall histories, reference areas, and ground outcomes.',
      },
      {
        title: 'Act',
        body: 'Send a reasoned case, urgency, and verification task to the accountable official.',
      },
    ],
  },
  productPreview: {
    eyebrow: 'Product preview · Illustrative demo',
    heading: 'Move from geographic overview to site evidence.',
    body: 'A coherent mock scenario follows the same sample structure from state context, through a ranked queue, to the evidence and recommended inspection view.',
  },
  integration: {
    eyebrow: 'Existing-system role',
    heading: 'Integrate through records, not a replacement platform.',
    body: 'The proposed architecture consumes work-linked field observations and authorised geospatial layers, preserves their identifiers and provenance, and returns explainable review cases. The prototype demonstrates this contract; it does not claim access to or live integration with government systems.',
  },
  outcomes: {
    eyebrow: 'Built for each level of action',
    heading: 'Design the output around the decision owner.',
    body: 'The same evidence should be aggregated differently for programme review, district triage, and field verification—without hiding the underlying record.',
    users: [
      {
        title: 'Programme leadership',
        body: 'Comparable trends, coverage gaps, and outcome evidence by state and project.',
      },
      {
        title: 'District reviewers',
        body: 'A queue grouped by urgency, evidence quality, and responsible workflow.',
      },
      {
        title: 'Engineers and field teams',
        body: 'A precise verification task, supporting evidence, and a place to record the finding.',
      },
    ],
  },
  outputOutcome: {
    eyebrow: 'Output to outcome',
    heading:
      'Count the work. Then test whether land, water, farms, and livelihoods changed.',
    body: 'Structures and treated hectares are delivery outputs. Outcome evaluation should combine water availability, irrigation and crop intensity, land productivity, vegetation and land condition, and livelihood evidence. Remote sensing can screen and corroborate these outcomes; it cannot replace field and programme measurement.',
  },
  researchBasis: {
    eyebrow: 'Research basis',
    heading: 'The claims behind this concept are inspectable.',
    body: 'The landing narrative is grounded in official WDC-PMKSY guidance and programme figures, NRSC’s published SRISHTI description, established remote-sensing literature, and AI risk-management guidance. Prototype values remain explicitly illustrative.',
  },
  closing: {
    eyebrow: 'Return to the whole system',
    heading: 'A defensible next step is more valuable than another score.',
    body: 'Field records show what was observed. Geospatial evidence shows the surrounding change. BHU-DRISHTI is the proposed reasoning layer that preserves uncertainty and helps the responsible official decide what to verify next.',
  },
} as const

export const landingResearchSources: ResearchSource[] = [
  {
    label: 'WDC-PMKSY 2.0 Guidelines',
    publisher: 'Department of Land Resources',
    url: 'https://www.wdcpmksy.dolr.gov.in/reference/WDCPMKSY2.0_Guidelines.pdf',
    supports:
      'Geo-tagged monitoring, unique work IDs, GIS/MIS integration, and pre–mid–post NDVI/NDWI comparison.',
  },
  {
    label: 'WDC-PMKSY progress review · 1 September 2026',
    publisher: 'Press Information Bureau, Government of India',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2305550&lang=1&reg=48',
    supports:
      'Programme scale and the distinction between construction outputs and measurable land, water, farm, and livelihood outcomes.',
  },
  {
    label: 'Bhuvan IWMP–SRISHTI overview',
    publisher: 'NRSC / ISRO',
    url: 'https://bhuvan-app1.nrsc.gov.in/iwmp/index_pop.php',
    supports:
      'Published role of satellite remote sensing, sample field data, map display, monitoring tools, and multi-level reporting.',
  },
  {
    label: 'NDVI: foundation and limitations',
    publisher: 'U.S. Geological Survey',
    url: 'https://www.usgs.gov/special-topics/remote-sensing-phenology/science/ndvi-foundation-remote-sensing-phenology',
    supports:
      'NDVI as a greenness indicator, its value in time series, and sensitivity to soil background and dense-canopy saturation.',
  },
  {
    label: 'Before–After Control–Impact remote-sensing design',
    publisher:
      'International Journal of Applied Earth Observation and Geoinformation',
    url: 'https://doi.org/10.1016/j.jag.2017.02.016',
    supports:
      'Use of comparable reference areas and repeated observations to distinguish intervention change from natural variability.',
  },
  {
    label: 'AI Risk Management Framework 1.0',
    publisher: 'U.S. National Institute of Standards and Technology',
    url: 'https://doi.org/10.6028/NIST.AI.100-1',
    supports:
      'Documented knowledge limits, uncertainty, explainability, validation, and defined human-oversight roles.',
  },
]

export const footerDetails = [
  'Smart India Hackathon 2026',
  'Problem statement SIH26015',
  'Team Lethals',
] as const
