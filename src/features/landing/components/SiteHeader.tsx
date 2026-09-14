import { useEffect, useRef, useState } from 'react'

import { navigationLinks, previewActions } from '../content/landingStory'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [storyIndex, setStoryIndex] = useState(0)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onChapter = (event: Event) => {
      const detail = (event as CustomEvent<{ index: number }>).detail
      setStoryIndex(detail.index)
    }
    window.addEventListener('bhu-story-chapter', onChapter)
    return () => window.removeEventListener('bhu-story-chapter', onChapter)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      toggle.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header
      className="site-header"
      data-story-active={storyIndex > 0}
      data-story-chapter={storyIndex + 1}
    >
      <a className="brand" href="#top" aria-label="BHU-DRISHTI home">
        <span className="brand-mark" aria-hidden="true">
          भू
        </span>
        <span>
          <strong>BHU-DRISHTI</strong>
          <small>Watershed intelligence layer</small>
        </span>
      </a>

      <button
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        ref={toggle}
        type="button"
      >
        <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        Menu
      </button>

      <nav
        aria-label="Primary navigation"
        data-open={menuOpen}
        id="primary-navigation"
      >
        {navigationLinks.map((item) => (
          <a
            href={item.href}
            key={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          className="preview-nav"
          href={previewActions.login.href}
          onClick={() => setMenuOpen(false)}
        >
          {previewActions.login.label}{' '}
          <span>{previewActions.login.qualifier}</span>
        </a>
      </nav>
    </header>
  )
}
