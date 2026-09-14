import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const scene = vi.hoisted(() => ({
  props: null as null | { onFailure: () => void; onReady: () => void },
}))

vi.mock('./IndiaScene', () => ({
  default: (props: { onFailure: () => void; onReady: () => void }) => {
    scene.props = props
    return <canvas aria-hidden="true" data-testid="webgl-canvas" />
  },
}))

import { MapExperience } from './MapExperience'
import type { StoryProgressRef } from './storyProgress'

const progress = { current: { value: 0 } } as StoryProgressRef

describe('MapExperience loading lifecycle', () => {
  beforeEach(() => {
    scene.props = null
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    )
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('shows a quiet perimeter loader and accessible status while loading', async () => {
    render(<MapExperience progress={progress} />)

    expect(screen.getByTestId('map-fallback')).toHaveAttribute(
      'data-visible',
      'true',
    )
    expect(screen.getByTestId('map-fallback')).toHaveAttribute(
      'data-loading',
      'true',
    )
    expect(screen.getByTestId('map-fallback')).toHaveAttribute(
      'data-poster',
      'false',
    )
    expect(screen.getByTestId('map-loader')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      'Loading interactive map.',
    )
    await waitFor(() => expect(scene.props).not.toBeNull())
    expect(await screen.findByTestId('webgl-canvas')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })

  it('cross-fades the poster only when the rendered scene reports ready', async () => {
    render(<MapExperience progress={progress} />)
    await waitFor(() => expect(scene.props).not.toBeNull())

    act(() => scene.props?.onReady())

    expect(screen.getByTestId('map-fallback')).toHaveAttribute(
      'data-visible',
      'false',
    )
    expect(document.querySelector('.map-canvas')).toHaveAttribute(
      'data-ready',
      'true',
    )
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByTestId('map-loader')).not.toBeInTheDocument()
  })

  it('preserves the poster when renderer initialization fails', async () => {
    render(<MapExperience progress={progress} />)
    await waitFor(() => expect(scene.props).not.toBeNull())

    act(() => scene.props?.onFailure())

    expect(screen.getByTestId('map-fallback')).toHaveAttribute(
      'data-visible',
      'true',
    )
    expect(screen.getByTestId('map-fallback')).toHaveAttribute(
      'data-poster',
      'true',
    )
    expect(document.querySelector('.map-experience')).toHaveAttribute(
      'data-fallback-reason',
      'renderer-failure',
    )
    expect(screen.queryByTestId('webgl-canvas')).not.toBeInTheDocument()
  })
})
