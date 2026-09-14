import type { SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseClient } from '../../lib/supabase/client'
import type { CommandCentreSnapshot, ReviewOutcome } from './types'

interface FunctionsClient {
  functions: Pick<SupabaseClient['functions'], 'invoke'>
}

function errorMessage(error: unknown, fallback: string) {
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  return fallback
}

export async function fetchCommandCentreWith(client: FunctionsClient) {
  const { data, error } = await client.functions.invoke<CommandCentreSnapshot>(
    'command-centre',
    { method: 'GET' },
  )
  if (error)
    throw new Error(errorMessage(error, 'Unable to load review cases.'))
  if (!data) throw new Error('The command centre returned no data.')
  return data
}

export async function submitCaseReviewWith(
  client: FunctionsClient,
  input: { caseId: string; outcome: ReviewOutcome; notes?: string },
) {
  const { data, error } = await client.functions.invoke<{ success: boolean }>(
    'review-case',
    { body: input },
  )
  if (error) throw new Error(errorMessage(error, 'Unable to save the review.'))
  if (!data?.success) throw new Error('The review was not saved.')
  return data
}

export function fetchCommandCentre() {
  return fetchCommandCentreWith(getSupabaseClient())
}

export function submitCaseReview(input: {
  caseId: string
  outcome: ReviewOutcome
  notes?: string
}) {
  return submitCaseReviewWith(getSupabaseClient(), input)
}
