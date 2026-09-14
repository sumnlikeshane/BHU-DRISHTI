import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from '../hooks/useReducedMotion'
import { evidenceRailItems } from './evidenceRailData'

function RailItems({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="evidence-rail__items">
      {evidenceRailItems.map((item) => (
        <li key={item}>
          <span aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function EvidenceRail() {
  const reducedMotion = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const [pausedByUser, setPausedByUser] = useState(false)
  const [onscreen, setOnscreen] = useState(true)
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  )

  useEffect(() => {
    if (!root.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setOnscreen(entry.isIntersecting),
      { rootMargin: '80px 0px' },
    )
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  if (reducedMotion) {
    return (
      <div className="evidence-rail evidence-rail--static" ref={root}>
        <p className="micro-label">Evidence vocabulary</p>
        <RailItems />
      </div>
    )
  }

  const playing = !pausedByUser && onscreen && documentVisible
  return (
    <div className="evidence-rail" data-playing={playing} ref={root}>
      <div className="evidence-rail__header">
        <p className="micro-label">One evidence chain</p>
        <button
          aria-pressed={pausedByUser}
          onClick={() => setPausedByUser((paused) => !paused)}
          type="button"
        >
          <span aria-hidden="true">{pausedByUser ? '▶' : 'Ⅱ'}</span>
          {pausedByUser ? 'Play evidence rail' : 'Pause evidence rail'}
        </button>
      </div>
      <div className="evidence-rail__viewport">
        <div className="evidence-rail__track">
          <RailItems />
          <RailItems hidden />
        </div>
      </div>
    </div>
  )
}
