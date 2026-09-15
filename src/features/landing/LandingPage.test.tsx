import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LandingPage } from './LandingPage'

describe('Clean Landing Page Redesign', () => {
  const setReducedMotion = (matches: boolean) => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion') && matches,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
  }

  beforeEach(() => {
    setReducedMotion(false)
    window.HTMLMediaElement.prototype.play = vi
      .fn()
      .mockResolvedValue(undefined)
    window.HTMLMediaElement.prototype.pause = vi.fn()
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('uses real section anchors and live authenticated application routes', () => {
    render(<LandingPage />)

    const navigation = screen.getByRole('navigation', {
      name: 'Primary navigation',
    })
    expect(
      within(navigation).getByRole('link', { name: 'About' }),
    ).toHaveAttribute('href', '#about')
    expect(
      within(navigation).getByRole('link', { name: 'How It Works' }),
    ).toHaveAttribute('href', '#how-it-works')
    expect(
      within(navigation).getByRole('link', { name: 'Impact' }),
    ).toHaveAttribute('href', '#impact')
    expect(
      within(navigation).getByRole('link', { name: /Login Secure/i }),
    ).toHaveAttribute('href', '/login')

    const commandCentreLinks = screen.getAllByRole('link', {
      name: /Start review intake|Enter Command Centre Live/i,
    })
    expect(commandCentreLinks.length).toBeGreaterThan(0)
    commandCentreLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/command-centre')
    })

    expect(
      screen.getByRole('link', { name: /Explore Demo Sign In/i }),
    ).toHaveAttribute('href', '/demo')
  })

  it('keeps a logical heading hierarchy and the complete semantic narrative', () => {
    render(<LandingPage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /A Decision-Support Layer for Watershed Monitoring/i,
    )

    for (const heading of [
      'The Data Already Exists. The Reasoning Layer Is Missing.',
      'Evidence Fusion Aligned by Work ID',
      'Every Reviewed Case Placed into Four States',
      'Evidence-Based Prioritisation at Scale',
    ]) {
      expect(
        screen.getByRole('heading', { level: 2, name: heading }),
      ).toBeInTheDocument()
    }

    expect(document.querySelector('#about')).toBeInTheDocument()
    expect(document.querySelector('#how-it-works')).toBeInTheDocument()
    expect(document.querySelector('#demo')).toBeInTheDocument()
    expect(document.querySelector('#impact')).toBeInTheDocument()
  })

  it('renders the background video asset with correct source and attributes', () => {
    render(<LandingPage />)

    const video = screen.getByTestId('hero-video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', '/ditther-150926-112600-720x404.mp4')
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('playsinline')
  })

  it('pauses background video when prefers-reduced-motion is true', () => {
    setReducedMotion(true)
    render(<LandingPage />)

    const video = screen.getByTestId('hero-video') as HTMLVideoElement
    expect(video.pause).toHaveBeenCalled()
  })

  it('renders the floating telemetry cards with active metrics', () => {
    render(<LandingPage />)

    expect(screen.getAllByText('1,220').length).toBeGreaterThan(0)
    expect(screen.getByText('Sanctioned Projects')).toBeInTheDocument()
    expect(screen.getAllByText('1.24 Lakh').length).toBeGreaterThan(0)
    expect(screen.getByText('Water Structures')).toBeInTheDocument()

    expect(screen.getByText('MH · RJ · MP · KA')).toBeInTheDocument()
    expect(screen.getByText('Coverage')).toBeInTheDocument()
    expect(screen.getByText('Remote')).toBeInTheDocument()
  })

  it('renders the three architectural tiers accurately', () => {
    render(<LandingPage />)

    expect(screen.getByText('Drishti Field Capture')).toBeInTheDocument()
    expect(screen.getByText('Srishti GIS Layers')).toBeInTheDocument()
    expect(screen.getByText('BHU-DRISHTI Reasoning')).toBeInTheDocument()
  })

  it('renders the four evidence sources and reasoning abstention rule', () => {
    render(<LandingPage />)

    expect(screen.getByText('Field Evidence')).toBeInTheDocument()
    expect(screen.getByText('Earth Observation')).toBeInTheDocument()
    expect(screen.getByText('Hydrometeorology')).toBeInTheDocument()
    expect(screen.getByText('Watershed Context')).toBeInTheDocument()
    expect(
      screen.getByText('"Insufficient Evidence" is a Valid Output'),
    ).toBeInTheDocument()
  })

  it('includes an accessible skip link for keyboard navigation', () => {
    render(<LandingPage />)

    const skipLink = screen.getByRole('link', { name: 'Skip to main content' })
    expect(skipLink).toHaveAttribute('href', '#about')
  })
})
