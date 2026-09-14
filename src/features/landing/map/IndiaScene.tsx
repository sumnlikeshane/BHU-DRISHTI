import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { OrthographicCamera } from 'three'

import { fetchBufferedMapAsset, type BufferedAsset } from './assetLoader'
import {
  INITIAL_DEFERRED_SCENE_LAYERS,
  resolveDeferredSceneLayers,
} from './deferredScene'
import { scheduleFirstFrameReady } from './firstFrameReady'
import { IndiaStateMeshes } from './IndiaStateMeshes'
import { NationalMarkerLayer, SiteMarkerLayer } from './MarkerLayer'
import { MaharashtraDistricts } from './MaharashtraDistricts'
import { MAP_PERFORMANCE_MARKS, markMapPerformance } from './performance'
import { MAP_COLOURS } from './sceneConfig'
import { MAP_PROGRESS_EVENT, type StoryProgressRef } from './storyProgress'
import type { IndiaRenderAsset, MaharashtraRenderAsset } from './types'

markMapPerformance(MAP_PERFORMANCE_MARKS.sceneModuleLoaded)

const NATIONAL_REQUEST_MARKS = {
  metadataStart: MAP_PERFORMANCE_MARKS.nationalMetadataRequestStart,
  metadataEnd: MAP_PERFORMANCE_MARKS.nationalMetadataRequestEnd,
  bufferStart: MAP_PERFORMANCE_MARKS.nationalBufferRequestStart,
  bufferEnd: MAP_PERFORMANCE_MARKS.nationalBufferRequestEnd,
}

function useBufferedAsset<T extends IndiaRenderAsset | MaharashtraRenderAsset>(
  enabled: boolean,
  jsonFile: string,
  bufferFile: string,
  compressedBufferFile: string,
  onFailure: () => void,
  onLoaded?: () => void,
  marks?: {
    metadataStart: string
    metadataEnd: string
    bufferStart: string
    bufferEnd: string
  },
) {
  const [loaded, setLoaded] = useState<BufferedAsset<T> | null>(null)

  useEffect(() => {
    if (!enabled || loaded) return
    const controller = new AbortController()
    void fetchBufferedMapAsset<T>({
      bufferFile,
      compressedBufferFile,
      jsonFile,
      marks,
      signal: controller.signal,
    })
      .then((result) => {
        setLoaded(result)
        onLoaded?.()
      })
      .catch(() => {
        if (!controller.signal.aborted) onFailure()
      })
    return () => controller.abort()
  }, [
    bufferFile,
    compressedBufferFile,
    enabled,
    jsonFile,
    loaded,
    marks,
    onFailure,
    onLoaded,
  ])

  return loaded
}

function useDeferredLayers(progress: StoryProgressRef) {
  const [layers, setLayers] = useState(INITIAL_DEFERRED_SCENE_LAYERS)

  useEffect(() => {
    const sync = () =>
      setLayers((mounted) =>
        resolveDeferredSceneLayers(progress.current.value, mounted),
      )
    window.addEventListener(MAP_PROGRESS_EVENT, sync)
    sync()
    return () => window.removeEventListener(MAP_PROGRESS_EVENT, sync)
  }, [progress])

  return layers
}

function EditorialCamera({ progress }: { progress: StoryProgressRef }) {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  useEffect(() => {
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera])

  /* eslint-disable react-hooks/immutability -- Three.js camera state is intentionally driven imperatively per requested frame. */
  useFrame(() => {
    const orthographicCamera = camera as OrthographicCamera
    const value = progress.current.value
    const baseZoom = Math.min(size.width / 100, size.height / 103)
    const focus = Math.max(0, Math.min(1, (value - 0.42) / 0.42))
    orthographicCamera.zoom = baseZoom * (1 + value * 0.07 + focus * 0.16)
    camera.position.x = focus * 9
    camera.position.y = -70 + focus * 3
    camera.lookAt(focus * -5, 0, 0)
    camera.updateProjectionMatrix()
  })
  /* eslint-enable react-hooks/immutability */
  return null
}

function FrameScheduler({
  progress,
  sceneActive,
}: {
  progress: StoryProgressRef
  sceneActive: boolean
}) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    const requestFrame = () => {
      if (sceneActive) invalidate()
    }
    window.addEventListener(MAP_PROGRESS_EVENT, requestFrame)
    requestFrame()
    return () => window.removeEventListener(MAP_PROGRESS_EVENT, requestFrame)
  }, [invalidate, sceneActive])

  useFrame(() => {
    if (sceneActive && progress.current.value >= 0.76) invalidate()
  })
  return null
}

function RendererLifecycle({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    const canvas = gl.domElement
    const handleContextLoss = (event: Event) => {
      event.preventDefault()
      onFailure()
    }
    canvas.addEventListener('webglcontextlost', handleContextLoss)
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLoss)
    }
  }, [gl, onFailure])
  return null
}

interface SceneContentProps {
  onFailure: () => void
  onReady: () => void
  progress: StoryProgressRef
  sceneActive: boolean
}

function SceneContent({
  onFailure,
  onReady,
  progress,
  sceneActive,
}: SceneContentProps) {
  const layers = useDeferredLayers(progress)
  const markMapDataAvailable = useCallback(
    () => markMapPerformance(MAP_PERFORMANCE_MARKS.mapDataAvailable),
    [],
  )
  const national = useBufferedAsset<IndiaRenderAsset>(
    true,
    'india-states.render.json',
    'india-states.geometry.bin',
    'india-states.geometry.bin.pack',
    onFailure,
    markMapDataAvailable,
    NATIONAL_REQUEST_MARKS,
  )
  const districts = useBufferedAsset<MaharashtraRenderAsset>(
    layers.maharashtraDistricts,
    'maharashtra-districts.render.json',
    'maharashtra-districts.geometry.bin',
    'maharashtra-districts.geometry.bin.pack',
    onFailure,
  )
  const handleNationalGeometryReady = useCallback(
    () => markMapPerformance(MAP_PERFORMANCE_MARKS.nationalGeometryReady),
    [],
  )
  const handleDistrictGeometryReady = useCallback(
    () => markMapPerformance(MAP_PERFORMANCE_MARKS.districtGeometryReady),
    [],
  )
  const firstFrameScheduled = useRef(false)
  const firstFrameAnimation = useRef<number | null>(null)
  const handleFirstNationalDraw = useCallback(() => {
    if (firstFrameScheduled.current) return
    firstFrameScheduled.current = true
    firstFrameAnimation.current = scheduleFirstFrameReady(onReady)
  }, [onReady])

  useEffect(
    () => () => {
      if (firstFrameAnimation.current !== null) {
        cancelAnimationFrame(firstFrameAnimation.current)
      }
    },
    [],
  )

  if (!national) return null

  return (
    <>
      <EditorialCamera progress={progress} />
      <FrameScheduler progress={progress} sceneActive={sceneActive} />
      <RendererLifecycle onFailure={onFailure} />
      <ambientLight intensity={1.8} />
      <directionalLight intensity={2.8} position={[-24, -32, 70]} />
      <directionalLight intensity={0.7} position={[42, 18, 35]} />
      <group rotation={[-0.08, 0, -0.025]}>
        <IndiaStateMeshes
          buffer={national.buffer}
          onFirstDraw={handleFirstNationalDraw}
          onGeometryReady={handleNationalGeometryReady}
          progress={progress}
          regions={national.asset.regions}
        />
        {districts ? (
          <MaharashtraDistricts
            buffer={districts.buffer}
            districts={districts.asset.districts}
            onGeometryReady={handleDistrictGeometryReady}
            progress={progress}
          />
        ) : null}
        {layers.nationalMarkers ? (
          <NationalMarkerLayer
            progress={progress}
            regions={national.asset.regions}
          />
        ) : null}
        {layers.siteMarkers && districts ? (
          <SiteMarkerLayer
            districts={districts.asset.districts}
            progress={progress}
          />
        ) : null}
      </group>
    </>
  )
}

interface IndiaSceneProps {
  onFailure: () => void
  onReady: () => void
  progress: StoryProgressRef
  sceneActive: boolean
}

export default function IndiaScene({
  onFailure,
  onReady,
  progress,
  sceneActive,
}: IndiaSceneProps) {
  const devicePixelRatio =
    typeof window === 'undefined'
      ? 1
      : Math.min(window.devicePixelRatio, window.innerWidth <= 720 ? 1 : 1.25)

  return (
    <Canvas
      aria-hidden="true"
      camera={{
        position: [0, -70, 120],
        zoom: 5.8,
        near: 0.1,
        far: 300,
      }}
      dpr={devicePixelRatio}
      fallback={null}
      frameloop="demand"
      gl={{
        alpha: true,
        antialias: devicePixelRatio <= 1.5,
        powerPreference: 'high-performance',
      }}
      onCreated={() =>
        markMapPerformance(MAP_PERFORMANCE_MARKS.rendererCreated)
      }
      orthographic
      style={{ background: 'transparent' }}
    >
      <color attach="background" args={[MAP_COLOURS.canvas]} />
      <SceneContent
        onFailure={onFailure}
        onReady={onReady}
        progress={progress}
        sceneActive={sceneActive}
      />
    </Canvas>
  )
}
