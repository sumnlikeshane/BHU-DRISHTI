import { AuthProvider } from './AuthProvider'
import { LoginPage } from './LoginPage'
import { ProtectedRoute } from './ProtectedRoute'
import { CommandCentrePage } from '../command-centre/CommandCentrePage'

export function AuthenticatedApp({ pathname }: { pathname: string }) {
  const route =
    pathname === '/login' ? (
      <LoginPage />
    ) : (
      <ProtectedRoute>
        <CommandCentrePage />
      </ProtectedRoute>
    )

  return <AuthProvider>{route}</AuthProvider>
}

export default AuthenticatedApp
