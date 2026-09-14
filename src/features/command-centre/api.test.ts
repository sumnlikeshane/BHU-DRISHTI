import { describe, expect, it, vi } from 'vitest'

import { fetchCommandCentreWith, submitCaseReviewWith } from './api'
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
  cases: [],
}

describe('command-centre API', () => {
  it('loads the authenticated command-centre function', async () => {
    const invoke = vi.fn().mockResolvedValue({ data: snapshot, error: null })

    await expect(
      fetchCommandCentreWith({ functions: { invoke } } as never),
    ).resolves.toEqual(snapshot)
    expect(invoke).toHaveBeenCalledWith('command-centre', { method: 'GET' })
  })

  it('surfaces function errors without accepting an empty response', async () => {
    const invoke = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'Access denied' },
    })

    await expect(
      fetchCommandCentreWith({ functions: { invoke } } as never),
    ).rejects.toThrow('Access denied')
  })

  it('submits an audited review payload', async () => {
    const invoke = vi
      .fn()
      .mockResolvedValue({ data: { success: true }, error: null })

    await expect(
      submitCaseReviewWith({ functions: { invoke } } as never, {
        caseId: '50000000-0000-4000-8000-000000000001',
        outcome: 'inspection_required',
      }),
    ).resolves.toEqual({ success: true })
    expect(invoke).toHaveBeenCalledWith('review-case', {
      body: {
        caseId: '50000000-0000-4000-8000-000000000001',
        outcome: 'inspection_required',
      },
    })
  })
})
