import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

import { navigate } from '../../lib/navigation'
import { useAuth } from './authContext'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { configured, loading, user } = useAuth()

  useEffect(() => {
    if (configured && !loading && !user) {
      const returnTo = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`,
      )
      navigate(`/login?returnTo=${returnTo}`, true)
    }
  }, [configured, loading, user])

  if (!configured) {
    return (
      <main className="route-state">
        <p className="eyebrow">Configuration required</p>
        <h1>The command centre cannot connect to Supabase.</h1>
        <p>
          Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in the application
          environment, then rebuild the client.
        </p>
        <a className="button-secondary" href="/">
          Return home
        </a>
      </main>
    )
  }

  if (loading || !user) {
    return (
      <main className="route-state" aria-busy="true">
        <p className="eyebrow">Secure session</p>
        <h1>Checking your access…</h1>
      </main>
    )
  }

  return children
}
