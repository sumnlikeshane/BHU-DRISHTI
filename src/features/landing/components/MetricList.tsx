import {
  metricClassificationLabels,
  type ClassifiedMetric,
} from '../content/landingStory'

interface MetricListProps {
  metrics: readonly ClassifiedMetric[]
  compact?: boolean
}

export function MetricList({ metrics, compact = false }: MetricListProps) {
  return (
    <dl
      className={compact ? 'metric-list metric-list--compact' : 'metric-list'}
    >
      {metrics.map((metric) => (
        <div className="metric" key={metric.id}>
          <dt>{metric.label}</dt>
          <dd className="metric-value">
            <strong>{metric.value}</strong>
            <span className={`data-label data-label--${metric.classification}`}>
              {metricClassificationLabels[metric.classification]}
            </span>
          </dd>
          <dd className="metric-meta">
            <p>{metric.note}</p>
            {metric.source ? (
              <a href={metric.source.url} rel="noreferrer" target="_blank">
                {metric.source.name} · as of {metric.source.asOf}
              </a>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
