import type { Session } from '@supabase/supabase-js'
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'

import {
  getSupabaseClient,
  isSupabaseConfigured,
} from '../../lib/supabase/client'
import { AuthContext, type AuthState } from './authContext'

export function AuthProvider({ children }: PropsWithChildren) {
  const configured = isSupabaseConfigured()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(configured)

  useEffect(() => {
    if (!configured) return

    const supabase = getSupabaseClient()
    let active = true

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) console.error('Unable to restore Supabase session', error)
      setSession(data.session)
      setLoading(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [configured])

  const value = useMemo<AuthState>(
    () => ({
      configured,
      loading,
      session,
      user: session?.user ?? null,
    }),
    [configured, loading, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
