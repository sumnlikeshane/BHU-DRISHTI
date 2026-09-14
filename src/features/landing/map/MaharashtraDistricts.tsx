import { useFrame } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Color, Group, LineBasicMaterial, MeshStandardMaterial } from 'three'

import { createExtrudedGeometry, createOutlineGeometry } from './geometry'
import {
  MAP_COLOURS,
  MAP_DEPTH,
  MAP_FOCUS_STYLE,
  MAHARASHTRA_LIFT,
} from './sceneConfig'
import type { StoryProgressRef } from './storyProgress'
import type { RenderRegion } from './types'

interface DistrictPieceProps {
  buffer: ArrayBuffer
  district: RenderRegion
  progress: StoryProgressRef
}

function DistrictPiece({ buffer, district, progress }: DistrictPieceProps) {
  const group = useRef<Group>(null)
  const isNashik = district.id === 'nashik'
  const geometry = useMemo(
    () => createExtrudedGeometry(district.renderGeometry, buffer),
    [buffer, district.renderGeometry],
  )
  const outline = useMemo(
    () => createOutlineGeometry(district.renderGeometry, buffer),
    [buffer, district.renderGeometry],
  )
  const topMaterial = useRef<MeshStandardMaterial>(null)
  const sideMaterial = useRef<MeshStandardMaterial>(null)
  const outlineMaterial = useRef<LineBasicMaterial>(null)
  const districtColour = useMemo(() => new Color(MAP_COLOURS.deepAqua), [])
  const subduedColour = useMemo(() => new Color(MAP_COLOURS.mutedAqua), [])
  const nashikColour = useMemo(() => new Color(MAP_COLOURS.nashik), [])
  const districtOutlineColour = useMemo(
    () => new Color(MAP_COLOURS.paleWater),
    [],
  )
  const nashikOutlineColour = useMemo(() => new Color(MAP_COLOURS.ink), [])

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
    const nashikFocus = Math.max(
      0,
      Math.min(1, (progress.current.value - 0.62) / 0.13),
    )
    const isSubdued = nashikFocus > 0 && !isNashik
    const targetOpacity = isSubdued
      ? 1 - nashikFocus * (1 - MAP_FOCUS_STYLE.districtSubduedOpacity)
      : MAP_FOCUS_STYLE.districtOpacity
    topMaterial.current.opacity = targetOpacity
    sideMaterial.current.opacity = targetOpacity
    outlineMaterial.current.opacity = isNashik
      ? MAP_FOCUS_STYLE.districtOutlineOpacity +
        nashikFocus *
          (MAP_FOCUS_STYLE.nashikOutlineOpacity -
            MAP_FOCUS_STYLE.districtOutlineOpacity)
      : MAP_FOCUS_STYLE.districtOutlineOpacity
    group.current.position.z = isNashik
      ? MAP_FOCUS_STYLE.nashikLift * nashikFocus
      : 0
    if (isNashik) {
      topMaterial.current.color.lerpColors(
        districtColour,
        nashikColour,
        nashikFocus,
      )
      outlineMaterial.current.color.lerpColors(
        districtOutlineColour,
        nashikOutlineColour,
        nashikFocus,
      )
    } else {
      topMaterial.current.color.lerpColors(
        districtColour,
        subduedColour,
        nashikFocus * 0.32,
      )
    }
  })

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          ref={topMaterial}
          attach="material-0"
          color={MAP_COLOURS.deepAqua}
          depthTest
          depthWrite
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
          roughness={0.82}
          transparent
        />
        <meshStandardMaterial
          ref={sideMaterial}
          attach="material-1"
          color={MAP_COLOURS.forest}
          depthTest
          depthWrite
          roughness={0.95}
          transparent
        />
      </mesh>
      <lineSegments geometry={outline}>
        <lineBasicMaterial
          ref={outlineMaterial}
          color={MAP_COLOURS.paleWater}
          depthTest
          opacity={MAP_FOCUS_STYLE.districtOutlineOpacity}
          transparent
        />
      </lineSegments>
    </group>
  )
}

interface MaharashtraDistrictsProps {
  buffer: ArrayBuffer
  districts: RenderRegion[]
  onGeometryReady: () => void
  progress: StoryProgressRef
}

export function MaharashtraDistricts({
  buffer,
  districts,
  onGeometryReady,
  progress,
}: MaharashtraDistrictsProps) {
  const group = useRef<Group>(null)

  useLayoutEffect(() => onGeometryReady(), [onGeometryReady])

  useFrame(() => {
    if (!group.current) return
    const reveal = Math.max(
      0,
      Math.min(1, (progress.current.value - 0.48) / 0.14),
    )
    const targetScale = 0.985 + reveal * 0.015
    group.current.scale.set(targetScale, targetScale, 1)
    group.current.position.z =
      reveal > 0
        ? MAHARASHTRA_LIFT + MAP_DEPTH + MAP_FOCUS_STYLE.districtLayerGap
        : -4
    group.current.visible = reveal > 0
  })

  return (
    <group position={[0, 0, -4]} ref={group} visible={false}>
      {districts.map((district) => (
        <DistrictPiece
          buffer={buffer}
          key={district.id}
          district={district}
          progress={progress}
        />
      ))}
    </group>
  )
}
