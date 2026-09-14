import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { EvidenceRail } from './EvidenceRail'
import { evidenceRailItems } from './evidenceRailData'

function setReducedMotion(matches: boolean) {
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

describe('evidence rail', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('provides a persistent Pause and Play control', () => {
    setReducedMotion(false)
    render(<EvidenceRail />)

    const pause = screen.getByRole('button', { name: 'Pause evidence rail' })
    expect(pause).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(pause)

    const play = screen.getByRole('button', { name: 'Play evidence rail' })
    expect(play).toHaveAttribute('aria-pressed', 'true')
    expect(document.querySelector('.evidence-rail')).toHaveAttribute(
      'data-playing',
      'false',
    )
  })

  it('renders one static wrapped vocabulary for reduced motion', () => {
    setReducedMotion(true)
    render(<EvidenceRail />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(document.querySelector('.evidence-rail--static')).toBeInTheDocument()
    evidenceRailItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
    expect(
      document.querySelector('[aria-hidden="true"] .evidence-rail__items'),
    ).not.toBeInTheDocument()
  })

  it('hides the duplicated moving content from assistive technology', () => {
    setReducedMotion(false)
    render(<EvidenceRail />)
    expect(
      document.querySelectorAll('.evidence-rail__items[aria-hidden="true"]'),
    ).toHaveLength(1)
  })
})
