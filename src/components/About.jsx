import { about } from '../data/content'
import Particles from './Particles'
import { showToast } from '../utils/toast'

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
      <li>
        <span className="about__contact-label">{label}</span>
        <a className="about__contact-value" href={`mailto:${value}`}>
          {value}
        </a>
      </li>
    )
  }
  // 微信 / 电话 / 现居：点击复制
  return (
    <li>
      <span className="about__contact-label">{label}</span>
      <button type="button" className="about__contact-value about__copy" onClick={copy}>
        {value}
      </button>
    </li>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      {!prefersReduced && (
        <Particles
          className="about__particles"
          particleColors={['#c9a96a', '#e4c893', '#a9b0bd']}
          particleCount={180}
          particleSpread={8}
          speed={0.05}
          particleBaseSize={130}
          alphaParticles={true}
          moveParticlesOnHover={false}
          sizeRandomness={1}
          cameraDistance={15}
          disableRotation={false}
          pixelRatio={Math.min(typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1, 2)}
        />
      )}

      <div className="container">
        <div className="section__head" data-anim="heading">
          <span className="section__eyebrow">ABOUT</span>
          <h2 className="section__title">关于我</h2>
        </div>

        <div className="about__grid">
          <aside className="about__side" data-reveal>
            <div className="avatar" data-anim="reveal">
              {about.avatar ? (
                <img className="avatar__img" src={about.avatar} alt="房子翔头像" />
              ) : (
                <span className="avatar__mono">{about.monogram}</span>
              )}
              <span className="avatar__ring" aria-hidden="true" />
            </div>
            <ul className="about__contact">
              <AboutRow label="微信" value={about.contact.wechat} />
              <AboutRow label="电话" value={about.contact.phone} />
              <AboutRow label="邮箱" value={about.contact.email} />
              <AboutRow label="现居" value={about.contact.location} />
            </ul>
          </aside>

          <div className="about__main" data-reveal>
            {about.intro.map((p, i) => (
              <p key={i} className="about__para">
                {p}
              </p>
            ))}

            <div className="stats">
              {about.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat__value">{s.value}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
