import { withSupabase } from 'npm:@supabase/server'

export default {
  fetch: withSupabase(
    { auth: 'user', errors: { detailed: false } },
    async (req, ctx) => {
      if (req.method !== 'GET') {
        return Response.json(
          { message: 'Method not allowed', code: 'method_not_allowed' },
          { status: 405, headers: { Allow: 'GET' } },
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

      const { data, error } = await ctx.supabaseAdmin.rpc(
        'command_centre_snapshot',
        { p_user_id: userId },
      )

      if (error) {
        const forbidden = error.code === '42501'
        return Response.json(
          {
            message: forbidden
              ? error.message
              : 'Unable to load command-centre data',
            code: forbidden ? 'access_denied' : 'query_failed',
          },
          { status: forbidden ? 403 : 500 },
        )
      }

      return Response.json(data, {
        headers: { 'Cache-Control': 'private, no-store' },
      })
    },
  ),
}
