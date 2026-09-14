import { useCallback, useEffect, useMemo, useState } from 'react'

import { navigate } from '../../lib/navigation'
import { getSupabaseClient } from '../../lib/supabase/client'
import { useAuth } from '../auth/authContext'
import { fetchCommandCentre, submitCaseReview } from './api'
import type {
  CommandCentreCase,
  CommandCentreSnapshot,
  ReviewOutcome,
} from './types'

const priorityLabel: Record<CommandCentreCase['priority'], string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

const roleLabel = {
  programme_admin: 'Programme administrator',
  state_reviewer: 'State reviewer',
  district_reviewer: 'District reviewer',
  field_officer: 'Field officer',
  analyst: 'Evidence analyst',
} as const

function formatQueue(value: string) {
  return value.replaceAll('_', ' ')
}

function CaseRow({
  item,
  onReview,
  saving,
}: {
  item: CommandCentreCase
  onReview: (caseId: string, outcome: ReviewOutcome) => void
  saving: boolean
}) {
  return (
    <article className="case-card">
      <div className="case-card__topline">
        <span className={`priority-badge priority-badge--${item.priority}`}>
          {priorityLabel[item.priority]}
        </span>
        <span>{formatQueue(item.queue)}</span>
        <span>{item.adminUnit ?? 'National scope'}</span>
      </div>
      <div className="case-card__body">
        <div>
          <p className="micro-label">{item.workCode}</p>
          <h2>{item.workName ?? item.activityType ?? 'Watershed work'}</h2>
          <p>{item.explanation}</p>
        </div>
        <dl className="case-facts">
          <div>
            <dt>Project</dt>
            <dd>{item.projectCode}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{formatQueue(item.status)}</dd>
          </div>
          <div>
            <dt>Confidence</dt>
            <dd>
              {item.confidence === null
                ? 'Not available'
                : `${Math.round(item.confidence * 100)}%`}
            </dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>{item.reasonCodes.map(formatQueue).join(' · ')}</dd>
          </div>
        </dl>
      </div>
      <div
        className="case-card__actions"
        aria-label={`Review ${item.workCode}`}
      >
        <button
          disabled={saving || item.status === 'resolved'}
          onClick={() => onReview(item.caseId, 'inspection_required')}
          type="button"
        >
          Route to inspection
        </button>
        <button
          disabled={saving || item.status === 'resolved'}
          onClick={() => onReview(item.caseId, 'needs_more_evidence')}
          type="button"
        >
          Request evidence
        </button>
        <button
          disabled={saving || item.status === 'resolved'}
          onClick={() => onReview(item.caseId, 'resolved')}
          type="button"
        >
          Mark resolved
        </button>
      </div>
    </article>
  )
}

export function CommandCentrePage() {
  const { user } = useAuth()
  const [snapshot, setSnapshot] = useState<CommandCentreSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingCaseId, setSavingCaseId] = useState<string | null>(null)
  const [priority, setPriority] = useState('all')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setSnapshot(await fetchCommandCentre())
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Unable to load the command centre.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    void fetchCommandCentre()
      .then((data) => {
        if (active) setSnapshot(data)
      })
      .catch((caught: unknown) => {
        if (!active) return
        setError(
          caught instanceof Error
            ? caught.message
            : 'Unable to load the command centre.',
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const cases = useMemo(
    () =>
      snapshot?.cases.filter(
        (item) => priority === 'all' || item.priority === priority,
      ) ?? [],
    [priority, snapshot],
  )

  const review = async (caseId: string, outcome: ReviewOutcome) => {
    setSavingCaseId(caseId)
    setError('')
    try {
      await submitCaseReview({ caseId, outcome })
      await load()
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Unable to save review.',
      )
    } finally {
      setSavingCaseId(null)
    }
  }

  const signOut = async () => {
    await getSupabaseClient().auth.signOut()
    navigate('/login', true)
  }

  return (
    <div className="command-centre">
      <header className="command-header">
        <a className="auth-brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            भू
          </span>
          <span>
            <strong>BHU-DRISHTI</strong>
            <small>Command centre</small>
          </span>
        </a>
        <div className="command-user">
          <span>{snapshot?.profile.fullName ?? user?.email}</span>
          <button onClick={signOut} type="button">
            Sign out
          </button>
        </div>
      </header>

      <main className="command-main">
        <section className="command-intro">
          <div>
            <p className="eyebrow">Explainable review queue</p>
            <h1>Watershed attention, organised for action.</h1>
            <p>
              Signals are screening evidence. Field findings and accountable
              review remain the basis for operational decisions.
            </p>
          </div>
          {snapshot && (
            <dl className="access-scope">
              <div>
                <dt>Role</dt>
                <dd>{roleLabel[snapshot.profile.role]}</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>{snapshot.profile.scope ?? 'All authorised regions'}</dd>
              </div>
            </dl>
          )}
        </section>

        {error && (
          <div className="form-alert form-alert--error" role="alert">
            <span>{error}</span>
            <button onClick={() => void load()} type="button">
              Try again
            </button>
          </div>
        )}

        {loading && !snapshot ? (
          <div className="dashboard-loading" aria-busy="true">
            Loading authorised cases…
          </div>
        ) : snapshot ? (
          <>
            <section className="summary-grid" aria-label="Queue summary">
              {[
                ['Open cases', snapshot.summary.open],
                ['Critical', snapshot.summary.critical],
                ['Field inspections', snapshot.summary.fieldInspection],
                ['Evidence gaps', snapshot.summary.evidenceGaps],
              ].map(([label, value]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </section>

            <section className="queue-section" aria-labelledby="queue-heading">
              <div className="queue-toolbar">
                <div>
                  <p className="eyebrow">Current workload</p>
                  <h2 id="queue-heading">Priority cases</h2>
                </div>
                <label>
                  Filter by priority
                  <select
                    onChange={(event) => setPriority(event.target.value)}
                    value={priority}
                  >
                    <option value="all">All priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </label>
              </div>

              <div className="case-list">
                {cases.map((item) => (
                  <CaseRow
                    item={item}
                    key={item.caseId}
                    onReview={review}
                    saving={savingCaseId === item.caseId}
                  />
                ))}
                {cases.length === 0 && (
                  <div className="empty-state">
                    No cases match this filter in your authorised scope.
                  </div>
                )}
              </div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  )
}
