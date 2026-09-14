import { FinalCta } from '../components/FinalCta'
import { footerDetails, landingStory } from '../content/landingStory'

export function ClosingIndiaSection() {
  return (
    <section className="closing-section" aria-labelledby="closing-heading">
      <div>
        <p className="eyebrow">{landingStory.closing.eyebrow}</p>
        <h2 id="closing-heading">{landingStory.closing.heading}</h2>
        <p>{landingStory.closing.body}</p>
        <FinalCta />
      </div>
      <figure className="closing-map">
        <img
          src="/images/india-story-poster.svg"
          alt="Overview map of India."
        />
      </figure>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>BHU-DRISHTI</strong>
        <span>Watershed intelligence layer</span>
      </div>
      <ul>
        {footerDetails.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <p>Preview environment · boundary data pending official validation.</p>
    </footer>
  )
}
