import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  getPathname,
  getSafeReturnPath,
  navigate,
  subscribeToLocation,
} from './navigation'

describe('navigation', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('updates the current route and notifies subscribers', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToLocation(listener)

    navigate('/command-centre')

    expect(getPathname()).toBe('/command-centre')
    expect(listener).toHaveBeenCalledOnce()
    unsubscribe()
  })

  it('accepts only same-origin return paths', () => {
    expect(getSafeReturnPath('?returnTo=%2Fdemo')).toBe('/demo')
    expect(getSafeReturnPath('?returnTo=https%3A%2F%2Fevil.example')).toBe(
      '/command-centre',
    )
    expect(getSafeReturnPath('?returnTo=%2F%2Fevil.example')).toBe(
      '/command-centre',
    )
  })
})
