import { cleanup, render, screen, waitFor } from '@testing-library/react'
import type { User } from '@supabase/supabase-js'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AuthContext } from '../auth/authContext'
import { CommandCentrePage } from './CommandCentrePage'
import type { CommandCentreSnapshot } from './types'

const snapshot: CommandCentreSnapshot = {
  generatedAt: '2026-09-14T10:00:00Z',
  profile: {
    fullName: 'District Reviewer',
    role: 'district_reviewer',
    scope: 'Nashik',
  },
  summary: {
    total: 1,
    open: 1,
    critical: 1,
    fieldInspection: 1,
    evidenceGaps: 0,
  },
  cases: [
    {
      caseId: '50000000-0000-4000-8000-000000000001',
      workId: '30000000-0000-4000-8000-000000000001',
      workCode: 'MH-NSK-0427',
      workName: 'Peth check dam 0427',
      activityType: 'check_dam',
      projectCode: 'MH-NSK-WDC-DEMO-01',
      adminUnit: 'Nashik',
      latitude: 20.26,
      longitude: 73.61,
      queue: 'field_inspection',
      priority: 'critical',
      status: 'open',
      reasonCodes: ['possible_siltation'],
      explanation: 'Possible issue; field inspection is required.',
      confidence: 0.81,
      dueAt: '2026-09-18T12:00:00Z',
      createdAt: '2026-09-14T03:30:00Z',
    },
  ],
}

const apiMocks = vi.hoisted(() => ({
  fetchCommandCentre: vi.fn(),
  submitCaseReview: vi.fn(),
}))

vi.mock('./api', () => apiMocks)

describe('CommandCentrePage', () => {
  afterEach(cleanup)

  it('renders the scoped review queue and its evidence cues', async () => {
    apiMocks.fetchCommandCentre.mockResolvedValue(snapshot)
    apiMocks.submitCaseReview.mockResolvedValue({ success: true })

    render(
      <AuthContext.Provider
        value={{
          configured: true,
          loading: false,
          session: null,
          user: { email: 'reviewer@example.test' } as User,
        }}
      >
        <CommandCentrePage />
      </AuthContext.Provider>,
    )

    await waitFor(() => {
      expect(screen.getByText('Peth check dam 0427')).toBeInTheDocument()
    })
    expect(screen.getByText('District reviewer')).toBeInTheDocument()
    expect(screen.getAllByText('Nashik').length).toBeGreaterThan(0)
    expect(screen.getByText('81%')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Route to inspection' }),
    ).toBeEnabled()
  })
})
