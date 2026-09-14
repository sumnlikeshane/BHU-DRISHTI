const NAVIGATION_EVENT = 'bhu-navigation'

export function navigate(to: string, replace = false) {
  if (replace) {
    window.history.replaceState(null, '', to)
  } else {
    window.history.pushState(null, '', to)
  }
  window.dispatchEvent(new Event(NAVIGATION_EVENT))
}

export function subscribeToLocation(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(NAVIGATION_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(NAVIGATION_EVENT, onChange)
  }
}

export function getPathname() {
  return window.location.pathname
}

export function getSafeReturnPath(search = window.location.search) {
  const requested = new URLSearchParams(search).get('returnTo')
  return requested?.startsWith('/') && !requested.startsWith('//')
    ? requested
    : '/command-centre'
}
