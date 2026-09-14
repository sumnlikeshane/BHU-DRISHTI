import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LandingPage } from './LandingPage'

describe('Phase 3 landing page', () => {
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
    setReducedMotion(true)
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
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

    expect(
      screen.getByRole('link', { name: /Enter Command Centre Live/i }),
    ).toHaveAttribute('href', '/command-centre')
    expect(
      screen.getByRole('link', { name: /Explore Demo Sign in/i }),
    ).toHaveAttribute('href', '/demo')
    expect(
      screen.getByRole('link', { name: /View Architecture Preview/i }),
    ).toHaveAttribute('href', '#how-it-works')
  })

  it('keeps a logical heading hierarchy and the complete semantic narrative', () => {
    render(<LandingPage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'From geo-coded evidence to watershed decisions.',
    )

    for (const heading of [
      'Collection is designed in. Interpretation is still the hard part.',
      'Add reasoning between evidence systems and field action.',
      'Give every signal a job—and a boundary.',
      'Validate, align, compare—then decide whether to speak.',
      'Return an evidence packet, not a mystery score.',
      'Make escalation rules explicit.',
      'Use automation to allocate attention, not declare truth.',
      'A change is observed. An impact must be demonstrated.',
      'Keep an auditable chain from capture to closure.',
      'One evidence model, four distinct decisions.',
      'Move from geographic overview to site evidence.',
      'Integrate through records, not a replacement platform.',
      'Design the output around the decision owner.',
      'Count the work. Then test whether land, water, farms, and livelihoods changed.',
      'The claims behind this concept are inspectable.',
    ]) {
      expect(
        screen.getByRole('heading', { level: 2, name: heading }),
      ).toBeInTheDocument()
    }

    expect(document.querySelector('#about')).toBeInTheDocument()
    expect(document.querySelector('#how-it-works')).toBeInTheDocument()
    expect(document.querySelector('#impact')).toBeInTheDocument()
    expect(document.querySelector('#research-basis')).toBeInTheDocument()
  })

  it('pairs every operational status with a symbol, label, and text cue', () => {
    render(<LandingPage />)

    const statusKey = screen.getAllByRole('list', {
      name: 'Operational status examples',
    })[0]
    for (const status of [
      [
        '✓',
        'No current flag',
        'Screened signals remain within the monitored baseline',
      ],
      ['◷', 'Monitor', 'Observe the next evidence cycle'],
      ['!', 'High priority', 'Inspection recommended'],
      ['?', 'Evidence gap', 'Evidence is missing, stale, or contradictory'],
    ]) {
      expect(within(statusKey).getByText(status[0])).toBeInTheDocument()
      expect(within(statusKey).getByText(status[1])).toBeInTheDocument()
      expect(within(statusKey).getByText(status[2])).toBeInTheDocument()
    }
  })

  it('renders equivalent semantic content and a poster when motion is reduced', () => {
    render(<LandingPage />)

    expect(
      screen.getByRole('link', { name: 'Skip interactive map story' }),
    ).toHaveAttribute('href', '#static-story')
    expect(screen.getByTestId('map-fallback')).toHaveAttribute(
      'data-visible',
      'true',
    )
    expect(
      screen.getAllByAltText(/Prototype map of India/i).length,
    ).toBeGreaterThan(0)
    expect(document.querySelector('.map-experience')).toHaveAttribute(
      'data-fallback-reason',
      'reduced-motion',
    )
    expect(
      screen.getByText(/Final release geometry requires Survey of India/i),
    ).toBeInTheDocument()
    expect(document.querySelector('canvas')).not.toBeInTheDocument()
    expect(document.querySelector('.pin-spacer')).not.toBeInTheDocument()
  })

  it('keeps the poster visible while the renderer initializes', () => {
    setReducedMotion(false)
    render(<LandingPage />)

    expect(screen.getByTestId('map-fallback')).toHaveAttribute(
      'data-visible',
      'true',
    )
    expect(document.querySelector('.map-experience')).toHaveAttribute(
      'data-fallback-only',
      'false',
    )
    expect(
      screen.getAllByText('A national evidence estate, already in motion.')
        .length,
    ).toBeGreaterThan(0)
  })

  it('declares a map-first mobile-safe composition hook', () => {
    render(<LandingPage />)

    expect(
      document.querySelector('[data-mobile-layout="map-first"]'),
    ).toBeInTheDocument()
  })

  it('does not expose implementation annotations in the interface', () => {
    render(<LandingPage />)

    for (const annotation of [
      'Interactive 3D geometry',
      'Loading interactive 3D geometry',
      'Prototype intelligence markers · illustrative only',
      'Prototype administrative geometry projected at build time.',
    ]) {
      expect(screen.queryByText(annotation)).not.toBeInTheDocument()
    }
    expect(document.querySelector('.closing-marker')).not.toBeInTheDocument()
  })

  it('updates header story state only at chapter boundaries', () => {
    render(<LandingPage />)
    const header = document.querySelector('.site-header')
    expect(header).toHaveAttribute('data-story-chapter', '1')

    fireEvent(
      window,
      new CustomEvent('bhu-story-chapter', {
        detail: { label: 'nashik-focus', index: 4 },
      }),
    )

    expect(header).toHaveAttribute('data-story-active', 'true')
    expect(header).toHaveAttribute('data-story-chapter', '5')
  })

  it('closes the mobile menu on Escape and returns focus to its toggle', () => {
    render(<LandingPage />)
    const toggle = screen.getByRole('button', {
      name: 'Open navigation menu',
    })

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(window, { key: 'Escape' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('visibly classifies every metric rendered on the page', () => {
    render(<LandingPage />)
    const metrics = Array.from(document.querySelectorAll('.metric'))
    expect(metrics.length).toBeGreaterThan(0)
    metrics.forEach((metric) => {
      expect(metric.querySelector('.data-label')).toBeInTheDocument()
    })
  })
})
