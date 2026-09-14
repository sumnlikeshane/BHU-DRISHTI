import { type FormEvent, useEffect, useState } from 'react'

import { navigate, getSafeReturnPath } from '../../lib/navigation'
import { getSupabaseClient } from '../../lib/supabase/client'
import { useAuth } from './authContext'

type LoginMode = 'password' | 'magic-link'

export function LoginPage() {
  const { configured, loading, user } = useAuth()
  const [mode, setMode] = useState<LoginMode>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const returnPath = getSafeReturnPath()

  useEffect(() => {
    if (!loading && user) navigate(returnPath, true)
  }, [loading, returnPath, user])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setMessage('')

    try {
      const supabase = getSupabaseClient()
      if (mode === 'password') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInError) throw signInError
        navigate(returnPath, true)
      } else {
        const { error: magicLinkError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}${returnPath}`,
            shouldCreateUser: false,
          },
        })
        if (magicLinkError) throw magicLinkError
        setMessage('Check your email for a secure sign-in link.')
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Unable to sign in right now.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-shell">
      <a className="auth-brand" href="/">
        <span className="brand-mark" aria-hidden="true">
          भू
        </span>
        <span>
          <strong>BHU-DRISHTI</strong>
          <small>Secure operational access</small>
        </span>
      </a>

      <section className="auth-card" aria-labelledby="login-heading">
        <p className="eyebrow">Authorised users</p>
        <h1 id="login-heading">Sign in to the command centre.</h1>
        <p>
          Access is invitation-only. Your assigned role and administrative scope
          determine which review cases you can see.
        </p>

        {!configured ? (
          <div className="form-alert form-alert--error" role="alert">
            Supabase is not configured. Add SUPABASE_URL and
            SUPABASE_PUBLISHABLE_KEY to the deployment environment.
          </div>
        ) : (
          <>
            <div className="auth-mode" aria-label="Sign-in method">
              <button
                aria-pressed={mode === 'password'}
                onClick={() => setMode('password')}
                type="button"
              >
                Password
              </button>
              <button
                aria-pressed={mode === 'magic-link'}
                onClick={() => setMode('magic-link')}
                type="button"
              >
                Email link
              </button>
            </div>

            <form className="auth-form" onSubmit={submit}>
              <label>
                Government or team email
                <input
                  autoComplete="email"
                  inputMode="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  value={email}
                />
              </label>
              {mode === 'password' && (
                <label>
                  Password
                  <input
                    autoComplete="current-password"
                    minLength={8}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    type="password"
                    value={password}
                  />
                </label>
              )}
              {error && (
                <div className="form-alert form-alert--error" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="form-alert form-alert--success" role="status">
                  {message}
                </div>
              )}
              <button
                className="button-primary"
                disabled={submitting}
                type="submit"
              >
                {submitting
                  ? 'Signing in…'
                  : mode === 'password'
                    ? 'Sign in'
                    : 'Send secure link'}
              </button>
            </form>
          </>
        )}

        <a className="text-link" href="/">
          Return to the public overview
        </a>
      </section>
    </main>
  )
}
