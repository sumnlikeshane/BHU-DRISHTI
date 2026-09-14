import { withSupabase } from 'npm:@supabase/server'

const outcomes = new Set([
  'confirmed',
  'rejected',
  'needs_more_evidence',
  'inspection_required',
  'resolved',
])

interface ReviewBody {
  caseId?: unknown
  outcome?: unknown
  notes?: unknown
}

export default {
  fetch: withSupabase(
    { auth: 'user', errors: { detailed: false } },
    async (req, ctx) => {
      if (req.method !== 'POST') {
        return Response.json(
          { message: 'Method not allowed', code: 'method_not_allowed' },
          { status: 405, headers: { Allow: 'POST' } },
        )
      }

      const userId = ctx.userClaims?.id
      if (!userId) {
        return Response.json(
          {
            message: 'Authenticated user identity is unavailable',
            code: 'identity_missing',
          },
          { status: 401 },
        )
      }

      let body: ReviewBody
      try {
        body = await req.json()
      } catch {
        return Response.json(
          { message: 'Request body must be valid JSON', code: 'invalid_json' },
          { status: 400 },
        )
      }

      if (
        typeof body.caseId !== 'string' ||
        typeof body.outcome !== 'string' ||
        !outcomes.has(body.outcome) ||
        (body.notes !== undefined && typeof body.notes !== 'string')
      ) {
        return Response.json(
          { message: 'Invalid case review payload', code: 'invalid_request' },
          { status: 422 },
        )
      }

      const { data, error } = await ctx.supabaseAdmin.rpc('review_case', {
        p_user_id: userId,
        p_case_id: body.caseId,
        p_outcome: body.outcome,
        p_notes: body.notes ?? null,
      })

      if (error) {
        const status =
          error.code === '42501'
            ? 403
            : error.code === 'P0002'
              ? 404
              : error.code === '22023'
                ? 422
                : 500
        return Response.json(
          {
            message: status >= 500 ? 'Unable to save review' : error.message,
            code:
              status === 403
                ? 'access_denied'
                : status === 404
                  ? 'case_not_found'
                  : 'review_failed',
          },
          { status },
        )
      }

      return Response.json(data, {
        headers: { 'Cache-Control': 'private, no-store' },
      })
    },
  ),
}
