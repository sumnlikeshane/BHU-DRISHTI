import { demoScenario } from '../data/demoScenario'

export function StatusKey({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={compact ? 'status-key status-key--compact' : 'status-key'}
      aria-label="Operational status examples"
    >
      {demoScenario.statuses.map((status) => (
        <li className={`status status--${status.id}`} key={status.id}>
          <span className="status-symbol" aria-hidden="true">
            {status.symbol}
          </span>
          <span>
            <strong>{status.label}</strong>
            <small>{status.cue}</small>
          </span>
        </li>
      ))}
    </ul>
  )
}
