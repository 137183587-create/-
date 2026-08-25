import { about } from '../data/content'
import Particles from './Particles'

export default function About() {
  return (
    <section id="about" className="section about">
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

      <div className="container">
        <div className="section__head" data-anim="heading">
          <span className="section__eyebrow">ABOUT</span>
          <h2 className="section__title">关于我</h2>
        </div>

        <div className="about__grid">
          <aside className="about__side" data-reveal>
            <div className="avatar" data-anim="reveal">
              <span className="avatar__mono">{about.monogram}</span>
              <span className="avatar__ring" aria-hidden="true" />
            </div>
            <ul className="about__contact">
              <li>
                <span className="about__contact-label">微信</span>
                <span className="about__contact-value">{about.contact.wechat}</span>
              </li>
              <li>
                <span className="about__contact-label">电话</span>
                <span className="about__contact-value">{about.contact.phone}</span>
              </li>
              <li>
                <span className="about__contact-label">邮箱</span>
                <span className="about__contact-value">{about.contact.email}</span>
              </li>
              <li>
                <span className="about__contact-label">现居</span>
                <span className="about__contact-value">{about.contact.location}</span>
              </li>
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
