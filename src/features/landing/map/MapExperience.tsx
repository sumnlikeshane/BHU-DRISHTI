import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { useReducedMotion } from '../hooks/useReducedMotion'
import { MapFallback } from './MapFallback'
import { MAP_PERFORMANCE_MARKS, markMapPerformance } from './performance'
import type { StoryProgressRef } from './storyProgress'

markMapPerformance(MAP_PERFORMANCE_MARKS.sceneImportRequested)
const criticalSceneModule = import('./IndiaScene')
const CriticalIndiaScene = lazy(() => criticalSceneModule)

interface SceneErrorBoundaryProps {
  children: ReactNode
  onError: () => void
}

interface SceneErrorBoundaryState {
  failed: boolean
}

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

interface MapExperienceProps {
  progress: StoryProgressRef
}

export function MapExperience({ progress }: MapExperienceProps) {
  const root = useRef<HTMLDivElement>(null)
  const onscreen = useRef(true)
  const reducedMotion = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [sceneActive, setSceneActive] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  )
  const fallbackOnly = reducedMotion || failed
  const fallbackReason = reducedMotion
    ? 'reduced-motion'
    : failed
      ? 'renderer-failure'
      : undefined
  const handleReady = useCallback(() => {
    setReady(true)
    window.dispatchEvent(new Event('bhu-map-assets-ready'))
  }, [])
  const handleError = useCallback(() => setFailed(true), [])

  useEffect(() => {
    const updateVisibility = () =>
      setSceneActive(onscreen.current && !document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    if (!root.current || typeof IntersectionObserver === 'undefined') {
      return () =>
        document.removeEventListener('visibilitychange', updateVisibility)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        onscreen.current = entry.isIntersecting
        setSceneActive(entry.isIntersecting && !document.hidden)
      },
      { rootMargin: '120px 0px' },
    )
    observer.observe(root.current)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  return (
    <div
      className="map-experience"
      data-fallback-only={fallbackOnly}
      data-fallback-reason={fallbackReason}
      ref={root}
    >
      <MapFallback
        loading={!ready && !fallbackOnly}
        poster={fallbackOnly}
        visible={!ready || fallbackOnly}
      />
      {!fallbackOnly && !ready ? (
        <span className="sr-only" role="status" aria-live="polite">
          Loading interactive map.
        </span>
      ) : null}
      {!fallbackOnly && (
        <div className="map-canvas" data-ready={ready}>
          <SceneErrorBoundary onError={handleError}>
            <Suspense fallback={null}>
              <CriticalIndiaScene
                onFailure={handleError}
                onReady={handleReady}
                progress={progress}
                sceneActive={sceneActive}
              />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      )}
    </div>
  )
}
