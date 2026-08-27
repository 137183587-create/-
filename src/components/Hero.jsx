import { Link } from 'react-router-dom'
import { hero, site } from '../data/content'

export default function Hero() {
  const hasVideo = Boolean(site.heroVideo)
  return (
    <section id="hero" className="hero">
      {/* 开场幕布：从上揭开露出首屏 */}
      <div className="hero__curtain" aria-hidden="true" />
      {/* 视频背景：把 heroVideo 填上 mp4 路径后即生效；未填时显示动态渐变背景 */}
      {hasVideo && (
        <video className="hero__video" autoPlay muted loop playsInline>
          <source src={site.heroVideo} type="video/mp4" />
        </video>
      )}
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__fade-edge" aria-hidden="true" />

      <div className="hero__content container">
        <p className="hero__eyebrow">
          {hero.eyebrow}
        </p>
        <h1 className="hero__title">
          {hero.title.map((line, i) => (
            <span key={i} className="hero__title-mask">
              <span className="hero__title-line">{line}</span>
            </span>
          ))}
        </h1>
        <p className="hero__subtitle">
          {hero.subtitle}
        </p>

        <div className="hero__footer">
          <div className="hero__footer-left">
            <div className="hero__brand-mini">
              <span className="hero__brand-mark">{site.mark}</span>
              <span className="hero__brand-name">{site.name}</span>
            </div>
            <p className="hero__note">
              {hero.footer.note}
              <span className="hero__note-accent">{hero.footer.noteAccent}</span>
            </p>
            <div className="hero__actions">
              <a href="#contact" className="btn btn--solid">
                {hero.cta}
              </a>
              <Link to="/works" className="btn btn--ghost">
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="hero__footer-right">
            <button className="hero__reel" type="button" aria-label="播放作品 reel">
              <span className="hero__reel-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="hero__reel-info">
                <span className="hero__reel-label">{hero.footer.reelLabel}</span>
                <span className="hero__reel-duration">{hero.footer.reelDuration}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="向下滚动">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">SCROLL</span>
      </a>
    </section>
  )
}
