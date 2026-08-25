import { contact } from '../data/content'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__bg" aria-hidden="true" />
      <div className="container contact__inner">
        <p className="contact__eyebrow" data-anim="heading">
          GET IN TOUCH
        </p>
        <h2 className="contact__title" data-anim="heading">
          {contact.title}
        </h2>
        <p className="contact__sub" data-reveal>
          {contact.sub}
        </p>

        <ul className="contact__links" data-anim="stagger">
          {contact.links.map((l) => (
            <li className="contact__link" key={l.label}>
              <span className="contact__link-label">{l.label}</span>
              <span className="contact__link-value">{l.value}</span>
            </li>
          ))}
        </ul>

        <p className="contact__copy" data-reveal>
          {contact.copyright}
        </p>
      </div>
    </section>
  )
}
