import { contact } from '../data/content'
import { showToast } from '../utils/toast'

function ContactRow({ label, value }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      showToast(`已复制${label} ✓`)
    } catch {
      showToast('复制失败，请手动复制')
    }
  }

  if (label === '邮箱') {
    return (
      <li className="contact__link">
        <span className="contact__link-label">{label}</span>
        <a className="contact__link-value" href={`mailto:${value}`}>
          {value}
        </a>
      </li>
    )
  }
  // 微信 / 电话 / 社交：点击复制
  return (
    <li className="contact__link">
      <span className="contact__link-label">{label}</span>
      <button type="button" className="contact__link-value contact__link-copy" onClick={copy}>
        {value}
      </button>
    </li>
  )
}

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
            <ContactRow key={l.label} label={l.label} value={l.value} />
          ))}
        </ul>

        <p className="contact__copy" data-reveal>
          {contact.copyright}
        </p>
      </div>
    </section>
  )
}
