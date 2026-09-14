interface MapFallbackProps {
  loading?: boolean
  poster?: boolean
  visible?: boolean
}

export function MapFallback({
  loading = false,
  poster = true,
  visible = true,
}: MapFallbackProps) {
  return (
    <div
      className="map-fallback"
      data-loading={loading}
      data-poster={poster}
      data-testid="map-fallback"
      data-visible={visible}
    >
      {loading ? (
        <div
          className="map-loader-frame"
          data-testid="map-loader"
          aria-hidden="true"
        >
          <span className="map-loader-frame__edge" />
        </div>
      ) : null}
      <img
        src="/images/india-story-poster.svg"
        alt="Prototype map of India shown as a neutral overview. Boundaries are illustrative and unverified."
        decoding="sync"
        draggable="false"
        fetchPriority="high"
      />
    </div>
  )
}
