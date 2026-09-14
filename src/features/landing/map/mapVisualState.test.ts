/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

const readMapSource = (name: string) =>
  readFileSync(join(process.cwd(), 'src/features/landing/map', name), 'utf8')

describe('map visual-state regressions', () => {
  it('keeps the fallback layer until ready without showing the flat poster during healthy loading', () => {
    const source = readMapSource('MapExperience.tsx')

    expect(source).toContain('visible={!ready || fallbackOnly}')
    expect(source).toContain('poster={fallbackOnly}')
    expect(source).toContain('loading={!ready && !fallbackOnly}')
    expect(source).toContain('data-ready={ready}')
    expect(source).not.toContain('webGLAvailable')
  })

  it('starts with a neutral national map and focuses regions from scroll', () => {
    const states = readMapSource('IndiaStateMeshes.tsx')
    const districts = readMapSource('MaharashtraDistricts.tsx')

    expect(states).toContain('color={MAP_COLOURS.mutedAqua}')
    expect(states).toContain('isMaharashtra ? focus : 0')
    expect(districts).toContain('color={MAP_COLOURS.deepAqua}')
    expect(districts).toContain('color={MAP_COLOURS.paleWater}')
    expect(districts).toContain('nashikColour')
  })

  it('uses demand rendering and defers district data and site markers', () => {
    const scene = readMapSource('IndiaScene.tsx')

    expect(scene).toContain('frameloop="demand"')
    expect(scene).toContain('layers.maharashtraDistricts')
    expect(scene).toContain('layers.siteMarkers && districts')
    expect(scene).not.toContain("frameloop={sceneActive ? 'always' : 'never'}")
  })

  it('starts the critical scene early and waits for the national draw', () => {
    const experience = readMapSource('MapExperience.tsx')
    const states = readMapSource('IndiaStateMeshes.tsx')
    const vite = readFileSync(join(process.cwd(), 'vite.config.ts'), 'utf8')

    expect(vite).toContain("name: 'critical-map-modulepreload'")
    expect(vite).toContain("rel: 'modulepreload'")
    expect(vite).toContain('/src/features/landing/map/IndiaScene.tsx')
    expect(experience).toContain(
      "const criticalSceneModule = import('./IndiaScene')",
    )
    expect(states).toContain('isMaharashtra ? onFirstDraw : undefined')
  })

  it('batches states while preserving a separately animated Maharashtra', () => {
    const states = readMapSource('IndiaStateMeshes.tsx')

    expect(states).toContain("id !== 'maharashtra'")
    expect(states).toContain("id === 'maharashtra'")
    expect(states).toContain('createBatchedExtrudedGeometry')
    expect(states).toContain('createBatchedOutlineGeometry')
    expect(states).not.toContain('regions.map((region)')
  })
})
