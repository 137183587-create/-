import { about } from '../data/content'
import { showToast } from '../utils/toast'

function AboutRow({ label, value }) {
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
      <li className="about__contact-row">
        <span className="about__contact-label">{label}</span>
        <a className="about__contact-value" href={`mailto:${value}`}>
          {value}
        </a>
      </li>
    )
  }
  return (
    <li className="about__contact-row">
      <span className="about__contact-label">{label}</span>
      <button type="button" className="about__contact-value about__copy" onClick={copy}>
        {value}
      </button>
    </li>
  )
}

export default function About() {
  return (
    <section id="about" className="section about about--magic">
      {/* 星空背景 */}
      <div className="about__magic-bg" aria-hidden="true">
        <div className="about__magic-stars" />
      </div>

      <div className="container about__container">
        <div className="about__grid">
          <aside className="about__side" data-reveal>
            <div className="avatar avatar--magic" data-anim="reveal">
              {about.avatar ? (
                <img className="avatar__img" src={about.avatar} alt="房子翔头像" />
              ) : (
                <span className="avatar__mono">{about.monogram}</span>
              )}
              <span className="avatar__ring" aria-hidden="true" />
              <span className="avatar__ring avatar__ring--outer" aria-hidden="true" />
            </div>
            <ul className="about__contact about__contact--magic">
              <AboutRow label="微信" value={about.contact.wechat} />
              <AboutRow label="电话" value={about.contact.phone} />
              <AboutRow label="邮箱" value={about.contact.email} />
              <AboutRow label="现居" value={about.contact.location} />
            </ul>
          </aside>

          <div className="about__main" data-reveal>
            <div className="about__title-wrap" data-anim="heading">
              <span className="about__eyebrow">ABOUT</span>
              <h2 className="about__title">关于我</h2>
            </div>
            {about.intro.map((p, i) => (
              <p key={i} className={`about__para ${i === 0 ? 'about__para--lead' : ''}`}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="stats stats--magic" data-reveal>
          <span className="stats__corner stats__corner--tl" />
          <span className="stats__corner stats__corner--tr" />
          <span className="stats__corner stats__corner--br" />
          <span className="stats__corner stats__corner--bl" />
          {about.stats.map((s) => (
            <div className="stat stat--magic" key={s.label}>
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="about__fade-edge" aria-hidden="true" />
    </section>
  )
}
