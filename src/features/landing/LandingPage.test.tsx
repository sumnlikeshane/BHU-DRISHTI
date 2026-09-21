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
      within(navigation).getByRole('link', { name: 'HOME' }),
    ).toHaveAttribute('href', '#top')
    expect(
      within(navigation).getByRole('link', { name: 'ECOSYSTEM' }),
    ).toHaveAttribute('href', '#ecosystem')
    expect(
      within(navigation).getByRole('link', { name: 'WATERSHED' }),
    ).toHaveAttribute('href', '#land')
    expect(
      within(navigation).getByRole('link', { name: 'EVIDENCE' }),
    ).toHaveAttribute('href', '#evidence')
    expect(
      within(navigation).getByRole('link', { name: 'DECISION' }),
    ).toHaveAttribute('href', '#decision')
    expect(
      within(navigation).getByRole('link', { name: 'SCALE' }),
    ).toHaveAttribute('href', '#scale')

    const commandCentreLinks = screen.getAllByRole('link', {
      name: /COMMAND CENTRE/i,
    })
    expect(commandCentreLinks.length).toBeGreaterThan(0)
    commandCentreLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/command-centre')
    })

    const officerLoginLinks = screen.getAllByRole('link', {
      name: /OFFICER LOGIN/i,
    })
    expect(officerLoginLinks.length).toBeGreaterThan(0)
    officerLoginLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/login')
    })
  })

  it('keeps a logical heading hierarchy and the complete semantic narrative', () => {
    render(<LandingPage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /FROM TERRAIN/i,
    )

    for (const heading of [
      'THE LAND',
      'THE EVIDENCE',
      'THE REASONING',
      'THE DECISION',
      'THE SCALE',
      'THE OUTCOME',
    ]) {
      expect(
        screen.getByRole('heading', { level: 2, name: heading }),
      ).toBeInTheDocument()
    }

    expect(document.querySelector('#ecosystem')).toBeInTheDocument()
    expect(document.querySelector('#land')).toBeInTheDocument()
    expect(document.querySelector('#evidence')).toBeInTheDocument()
    expect(document.querySelector('#decision')).toBeInTheDocument()
    expect(document.querySelector('#scale')).toBeInTheDocument()
    expect(document.querySelector('#outcome')).toBeInTheDocument()
  })

  it('renders the background video asset with correct source and attributes', () => {
    render(<LandingPage />)

    const video = screen.getByTestId('hero-video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', '/hero.mp4')
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('playsinline')
  })

  it('pauses background video when prefers-reduced-motion is true', () => {
    setReducedMotion(true)
    render(<LandingPage />)

    const video = screen.getByTestId('hero-video') as HTMLVideoElement
    expect(video.pause).toHaveBeenCalled()
  })

  it('renders the official 1 Sep 2026 scale figures', () => {
    render(<LandingPage />)

    expect(screen.getAllByText('1,220').length).toBeGreaterThan(0)
    expect(screen.getByText('SANCTIONED WATERSHED PROJECTS')).toBeInTheDocument()
    expect(screen.getAllByText('52.93 LAKH HA').length).toBeGreaterThan(0)
    expect(screen.getAllByText('1.24 LAKH').length).toBeGreaterThan(0)
    expect(screen.getAllByText('28.50 LAKH').length).toBeGreaterThan(0)
  })

  it('renders the 4 operational review triage queues', () => {
    render(<LandingPage />)

    expect(screen.getByText('Recollect Evidence')).toBeInTheDocument()
    expect(screen.getByText('Analyst Review')).toBeInTheDocument()
    expect(screen.getByText('Field Inspection')).toBeInTheDocument()
    expect(screen.getByText('Routine Monitoring')).toBeInTheDocument()
  })

  it('renders the value proposition section with 4 watershed structure cutaway specimens', () => {
    render(<LandingPage />)

    expect(screen.getByText('OUR VALUE PROPOSITION')).toBeInTheDocument()
    expect(screen.getByText('Redefining watershed verification.')).toBeInTheDocument()
    expect(screen.getByText('Exhaustive coverage')).toBeInTheDocument()
    expect(screen.getByText('Greater accuracy')).toBeInTheDocument()
    expect(screen.getByText('Faster verification')).toBeInTheDocument()
    expect(screen.getByText('Focused expenditure')).toBeInTheDocument()

    const images = screen.getAllByRole('img')
    const watershedImageSrcs = images.map((img) => img.getAttribute('src'))
    expect(watershedImageSrcs).toContain('/images/watershed/check-dam.jpg')
    expect(watershedImageSrcs).toContain('/images/watershed/percolation-pond.jpg')
    expect(watershedImageSrcs).toContain('/images/watershed/contour-trench.jpg')
    expect(watershedImageSrcs).toContain('/images/watershed/recharge-shaft.jpg')
  })

  it('includes an accessible skip link for keyboard navigation', () => {
    render(<LandingPage />)

    const skipLink = screen.getByRole('link', { name: 'Skip to main content' })
    expect(skipLink).toHaveAttribute('href', '#ecosystem')
  })
})
