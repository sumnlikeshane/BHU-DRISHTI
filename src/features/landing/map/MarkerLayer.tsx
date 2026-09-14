import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color, Group, MeshBasicMaterial } from 'three'

import { demoScenario } from '../data/demoScenario'
import {
  MAP_COLOURS,
  MAP_DEPTH,
  MAP_FOCUS_STYLE,
  MAHARASHTRA_LIFT,
} from './sceneConfig'
import type { StoryProgressRef } from './storyProgress'
import type { RenderRegion, StateRenderRegion } from './types'

const STATUS_COLOURS = ['#39725b', '#79541f', '#98453d', '#45646e'] as const

interface MarkerProps {
  colour: string
  position: [number, number, number]
  progress: StoryProgressRef
  reveal: [number, number]
  fade?: [number, number]
  priority?: boolean
  resolvesToStatus?: boolean
}

function Marker({
  colour,
  fade,
  position,
  priority,
  progress,
  reveal,
  resolvesToStatus = false,
}: MarkerProps) {
  const group = useRef<Group>(null)
  const material = useRef<MeshBasicMaterial>(null)
  const targetColour = useMemo(() => new Color(colour), [colour])
  const baseColour = useMemo(() => new Color(MAP_COLOURS.deepAqua), [])

  useFrame(({ clock }) => {
    if (!group.current || !material.current) return
    const value = progress.current.value
    const revealValue = Math.max(
      0,
      Math.min(1, (value - reveal[0]) / (reveal[1] - reveal[0])),
    )
    const fadeValue = fade
      ? Math.max(0, Math.min(1, (value - fade[0]) / (fade[1] - fade[0])))
      : 0
    const opacity = revealValue * (1 - fadeValue)
    const pulse =
      priority && opacity > 0.9
        ? 1 + Math.sin(clock.elapsedTime * 2.4) * 0.12
        : 1
    group.current.visible = opacity > 0.01
    group.current.scale.setScalar((0.72 + revealValue * 0.28) * pulse)
    material.current.opacity = opacity
    const statusMix = resolvesToStatus
      ? Math.max(0, Math.min(1, (value - 0.27) / 0.11))
      : 1
    material.current.color.lerpColors(baseColour, targetColour, statusMix)
  })

  return (
    <group ref={group} position={position} visible={false}>
      <mesh>
        <circleGeometry args={[priority ? 1.15 : 0.72, 20]} />
        <meshBasicMaterial
          ref={material}
          color={colour}
          depthTest
          depthWrite={false}
          transparent
        />
      </mesh>
      {priority ? (
        <mesh position={[0, 0, -0.02]} scale={1.7}>
          <ringGeometry args={[0.72, 0.88, 24]} />
          <meshBasicMaterial
            color={MAP_COLOURS.nashik}
            opacity={0.7}
            transparent
          />
        </mesh>
      ) : null}
    </group>
  )
}

export function NationalMarkerLayer({
  progress,
  regions,
}: {
  progress: StoryProgressRef
  regions: StateRenderRegion[]
}) {
  const national = useMemo(() => {
    const preferred = new Set([
      'assam',
      'gujarat',
      'karnataka',
      'madhya-pradesh',
      'maharashtra',
      'odisha',
      'rajasthan',
      'uttar-pradesh',
    ])
    return regions.filter((region) => preferred.has(region.id)).slice(0, 8)
  }, [regions])
  return (
    <group>
      {national.map((region, index) => (
        <Marker
          colour={STATUS_COLOURS[index % STATUS_COLOURS.length]}
          fade={[0.43, 0.58]}
          key={region.id}
          position={[region.centroid[0], region.centroid[1], MAP_DEPTH + 0.35]}
          progress={progress}
          reveal={[0.12 + index * 0.008, 0.27]}
          resolvesToStatus
        />
      ))}
    </group>
  )
}

export function SiteMarkerLayer({
  districts,
  progress,
}: {
  districts: RenderRegion[]
  progress: StoryProgressRef
}) {
  const nashik = districts.find((district) => district.id === 'nashik')
  if (!nashik) return null

  const siteZ =
    MAHARASHTRA_LIFT +
    MAP_DEPTH +
    MAP_FOCUS_STYLE.districtLayerGap +
    MAP_FOCUS_STYLE.districtDepth +
    MAP_FOCUS_STYLE.nashikLift +
    0.2
  const offsets: [number, number][] = [
    [-1.4, 0.35],
    [0, 0],
    [1.15, -0.72],
  ]

  return (
    <group aria-label={`${demoScenario.site.id} marker layer`}>
      {offsets.map(([x, y], index) => (
        <Marker
          colour={index === 1 ? STATUS_COLOURS[2] : MAP_COLOURS.deepAqua}
          key={`${demoScenario.site.id}-${index}`}
          position={[nashik.centroid[0] + x, nashik.centroid[1] + y, siteZ]}
          priority={index === 1}
          progress={progress}
          reveal={[0.76 + index * 0.015, 0.87]}
        />
      ))}
    </group>
  )
}
