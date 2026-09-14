export type AppRole =
  | 'programme_admin'
  | 'state_reviewer'
  | 'district_reviewer'
  | 'field_officer'
  | 'analyst'

export type CasePriority = 'critical' | 'high' | 'medium' | 'low'
export type CaseStatus =
  'open' | 'assigned' | 'in_review' | 'resolved' | 'dismissed'

export type ReviewOutcome =
  | 'confirmed'
  | 'rejected'
  | 'needs_more_evidence'
  | 'inspection_required'
  | 'resolved'

export interface CommandCentreCase {
  caseId: string
  workId: string
  workCode: string
  workName: string | null
  activityType: string | null
  projectCode: string
  adminUnit: string | null
  latitude: number | null
  longitude: number | null
  queue: string
  priority: CasePriority
  status: CaseStatus
  reasonCodes: string[]
  explanation: string
  confidence: number | null
  dueAt: string | null
  createdAt: string
}

export interface CommandCentreSnapshot {
  generatedAt: string
  profile: {
    fullName: string | null
    role: AppRole
    scope: string | null
  }
  summary: {
    total: number
    open: number
    critical: number
    fieldInspection: number
    evidenceGaps: number
  }
  cases: CommandCentreCase[]
}
