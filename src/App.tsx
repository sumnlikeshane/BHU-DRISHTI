import { lazy, Suspense, useSyncExternalStore } from 'react'

import { LandingPage } from './features/landing/LandingPage'
import { getPathname, subscribeToLocation } from './lib/navigation'

const AuthenticatedApp = lazy(() => import('./features/auth/AuthenticatedApp'))

export function App() {
  const pathname = useSyncExternalStore(
    subscribeToLocation,
    getPathname,
    () => '/',
  )

  if (
    pathname !== '/login' &&
    pathname !== '/command-centre' &&
    pathname !== '/demo'
  ) {
    return <LandingPage />
  }

  return (
    <Suspense
      fallback={
        <main className="route-state" aria-busy="true">
          <p className="eyebrow">Secure application</p>
          <h1>Loading BHU-DRISHTI…</h1>
        </main>
      }
    >
      <AuthenticatedApp pathname={pathname} />
    </Suspense>
  )
}
