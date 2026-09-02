import { about } from '../data/content'
import { showToast } from '../utils/toast'

const icons = {
  wechat: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="about__icon-wechat">
      <defs>
        <mask id="wechat-mask">
          <rect width="24" height="24" fill="white" />
          <circle cx="7.2" cy="7.4" r="0.75" fill="black" />
          <circle cx="11.0" cy="7.0" r="0.7" fill="black" />
          <circle cx="14.0" cy="13.8" r="0.65" fill="black" />
          <circle cx="17.2" cy="13.4" r="0.6" fill="black" />
        </mask>
      </defs>
      <g mask="url(#wechat-mask)">
        <ellipse cx="9.2" cy="8.5" rx="5.2" ry="4.3" />
        <polygon points="6.6,12.2 2.8,14.5 4.7,10.65" />
        <ellipse cx="15.6" cy="14.6" rx="4.4" ry="3.5" />
        <polygon points="18.97,16.85 20.5,19.5 17.10,17.89" />
      </g>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="m2 5 10 7 10-7" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  ),
}

function ContactItem({ icon, label, value, href, onCopy }) {
  const content = (
    <>
      <span className="about__contact-icon">{icon}</span>
      <span className="about__contact-body">
        <span className="about__contact-label">{label}</span>
        <span className="about__contact-value">{value}</span>
      </span>
    </>
  )

  if (href) {
    return (
      <li className="about__contact-item">
        <a className="about__contact-link" href={href}>{content}</a>
      </li>
    )
  }

  return (
    <li className="about__contact-item">
      <button type="button" className="about__contact-link about__copy" onClick={onCopy}>
        {content}
      </button>
    </li>
  )
}

export default function About() {
  const copy = (label, value) => async () => {
    try {
      await navigator.clipboard.writeText(value)
      showToast(`已复制${label} ✓`)
    } catch {
      showToast('复制失败，请手动复制')
    }
  }

  return (
    <section id="about" className="section about about--magic">
      {/* 视频背景：上下羽化，与 Hero / 精选项目无缝衔接 */}
      <div className="about__video-wrap" aria-hidden="true">
        <video
          className="about__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/backgrounds/magic-sky.jpg"
        >
          <source src="/videos/about-magic.mp4" type="video/mp4" />
        </video>
        <span className="about__video-overlay" />
      </div>

      {/* 星空前景装饰 */}
      <div className="about__magic-bg" aria-hidden="true">
        <div className="about__magic-stars" />
      </div>

      <div className="container about__container">
        <div className="about__grid">
          <aside className="about__side" data-reveal>
            {/* 魔法头像框 */}
            <div className="avatar avatar--magic" data-anim="reveal">
              {/* 内层裁切器：专门负责圆形裁切，让头像完整显示 */}
              <div className="avatar__clip">
                {about.avatar ? (
                  <img className="avatar__img" src={about.avatar} alt="房子翔头像" />
                ) : (
                  <span className="avatar__mono">{about.monogram}</span>
                )}
              </div>
              {/* 双层金色光环 */}
              <span className="avatar__ring" aria-hidden="true" />
              <span className="avatar__ring avatar__ring--outer" aria-hidden="true" />
              {/* 4 方位星标 */}
              <span className="avatar__spark avatar__spark--n" aria-hidden="true">✦</span>
              <span className="avatar__spark avatar__spark--e" aria-hidden="true">✦</span>
              <span className="avatar__spark avatar__spark--s" aria-hidden="true">✦</span>
              <span className="avatar__spark avatar__spark--w" aria-hidden="true">✦</span>
              {/* 环上刻度 */}
              <span className="avatar__tick" aria-hidden="true" />
            </div>
            {/* 头像下方装饰 */}
            <span className="avatar__ornament" aria-hidden="true" />

            {/* 联系方式 */}
            <ul className="about__contact">
              <ContactItem
                icon={icons.wechat}
                label="微信"
                value={about.contact.wechat}
                onCopy={copy('微信', about.contact.wechat)}
              />
              <ContactItem
                icon={icons.phone}
                label="电话"
                value={about.contact.phone}
                onCopy={copy('电话', about.contact.phone)}
              />
              <ContactItem
                icon={icons.email}
                label="邮箱"
                value={about.contact.email}
                href={`mailto:${about.contact.email}`}
              />
              <ContactItem
                icon={icons.location}
                label="现居"
                value={about.contact.location}
              />
            </ul>
          </aside>

          {/* 带魔法边框的介绍面板 */}
          <div className="about__main" data-reveal>
            <span className="about__frame about__frame--corner" aria-hidden="true" />
            <span className="about__frame about__frame--star" aria-hidden="true">✦</span>
            <div className="about__title-wrap" data-anim="heading">
              <h2 className="about__title">我是房子翔<span className="about__title-star" aria-hidden="true">✦</span></h2>
              <span className="about__title-line" aria-hidden="true">
                <i className="about__title-line-dot" />
              </span>
            </div>
            <div className="about__intro">
              {about.intro.map((p, i) => (
                <p key={i} className="about__para">{p}</p>
              ))}
            </div>
            <span className="about__frame about__frame--bottom" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="about__fade-edge" aria-hidden="true" />
    </section>
  )
}
