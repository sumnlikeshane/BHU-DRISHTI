import { useFrame } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Color, Group, LineBasicMaterial, MeshStandardMaterial } from 'three'

import {
  createBatchedExtrudedGeometry,
  createBatchedOutlineGeometry,
} from './geometry'
import { MAP_PERFORMANCE_MARKS, markMapPerformance } from './performance'
import { MAP_COLOURS, MAP_FOCUS_STYLE, MAHARASHTRA_LIFT } from './sceneConfig'
import type { StoryProgressRef } from './storyProgress'
import type { StateRenderRegion } from './types'

interface StateBatchProps {
  buffer: ArrayBuffer
  isMaharashtra: boolean
  onFirstDraw: () => void
  progress: StoryProgressRef
  regions: StateRenderRegion[]
}

function StateBatch({
  buffer,
  isMaharashtra,
  onFirstDraw,
  progress,
  regions,
}: StateBatchProps) {
  const group = useRef<Group>(null)
  const geometry = useMemo(() => {
    if (!isMaharashtra) {
      markMapPerformance(MAP_PERFORMANCE_MARKS.nationalGeometryHydrationStart)
    }
    return createBatchedExtrudedGeometry(
      regions.map(({ renderGeometry }) => renderGeometry),
      buffer,
    )
  }, [buffer, isMaharashtra, regions])
  const outline = useMemo(
    () =>
      createBatchedOutlineGeometry(
        regions.map(({ renderGeometry }) => renderGeometry),
        buffer,
      ),
    [buffer, regions],
  )
  const topMaterial = useRef<MeshStandardMaterial>(null)
  const sideMaterial = useRef<MeshStandardMaterial>(null)
  const outlineMaterial = useRef<LineBasicMaterial>(null)
  const baseColour = useMemo(() => new Color(MAP_COLOURS.mutedAqua), [])
  const selectedColour = useMemo(() => new Color(MAP_COLOURS.deepAqua), [])

  useEffect(
    () => () => {
      geometry.dispose()
      outline.dispose()
    },
    [geometry, outline, outlineMaterial, sideMaterial, topMaterial],
  )

  useFrame(() => {
    if (
      !group.current ||
      !topMaterial.current ||
      !sideMaterial.current ||
      !outlineMaterial.current
    ) {
      return
    }
    const focus = Math.max(
      0,
      Math.min(1, (progress.current.value - 0.42) / 0.16),
    )
    const targetZ = isMaharashtra ? MAHARASHTRA_LIFT * focus : -2.5 * focus
    const targetOpacity = !isMaharashtra
      ? 1 - focus * (1 - MAP_FOCUS_STYLE.nationalBackgroundOpacity)
      : 1
    group.current.position.z = targetZ
    topMaterial.current.opacity = targetOpacity
    sideMaterial.current.opacity = targetOpacity
    outlineMaterial.current.opacity = isMaharashtra
      ? 0.76
      : 0.76 - focus * (0.76 - MAP_FOCUS_STYLE.nationalBackgroundOutlineOpacity)
    topMaterial.current.color.lerpColors(
      baseColour,
      selectedColour,
      isMaharashtra ? focus : 0,
    )
  })

  return (
    <group ref={group}>
      <mesh
        geometry={geometry}
        onAfterRender={isMaharashtra ? onFirstDraw : undefined}
      >
        <meshStandardMaterial
          ref={topMaterial}
          attach="material-0"
          color={MAP_COLOURS.mutedAqua}
          metalness={0.02}
          roughness={0.86}
          transparent
        />
        <meshStandardMaterial
          ref={sideMaterial}
          attach="material-1"
          color={MAP_COLOURS.forest}
          roughness={0.94}
          transparent
        />
      </mesh>
      <lineSegments geometry={outline}>
        <lineBasicMaterial
          ref={outlineMaterial}
          color={MAP_COLOURS.canvas}
          opacity={0.76}
          transparent
        />
      </lineSegments>
    </group>
  )
}

interface IndiaStateMeshesProps {
  buffer: ArrayBuffer
  onFirstDraw: () => void
  onGeometryReady: () => void
  progress: StoryProgressRef
  regions: StateRenderRegion[]
}

export function IndiaStateMeshes({
  buffer,
  onFirstDraw,
  onGeometryReady,
  progress,
  regions,
}: IndiaStateMeshesProps) {
  useLayoutEffect(() => onGeometryReady(), [onGeometryReady])
  const [backgroundRegions, maharashtraRegions] = useMemo(
    () => [
      regions.filter(({ id }) => id !== 'maharashtra'),
      regions.filter(({ id }) => id === 'maharashtra'),
    ],
    [regions],
  )

  useLayoutEffect(() => {
    markMapPerformance(MAP_PERFORMANCE_MARKS.nationalGeometryHydrationEnd)
  }, [])

  return (
    <>
      <StateBatch
        buffer={buffer}
        isMaharashtra={false}
        onFirstDraw={onFirstDraw}
        progress={progress}
        regions={backgroundRegions}
      />
      <StateBatch
        buffer={buffer}
        isMaharashtra
        onFirstDraw={onFirstDraw}
        progress={progress}
        regions={maharashtraRegions}
      />
    </>
  )
}
