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

        <div className="hero__actions">
          <a href="#contact" className="hero__btn-magic">
            <span className="bm__corner bm__corner--tl" />
            <span className="bm__corner bm__corner--tr" />
            <span className="bm__corner bm__corner--br" />
            <span className="bm__corner bm__corner--bl" />
            <span className="bm__label">{hero.cta}</span>
          </a>
          <Link to="/works" className="hero__btn-magic">
            <span className="bm__corner bm__corner--tl" />
            <span className="bm__corner bm__corner--tr" />
            <span className="bm__corner bm__corner--br" />
            <span className="bm__corner bm__corner--bl" />
            <span className="bm__label">{hero.ctaSecondary}</span>
          </Link>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="向下滚动">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">SCROLL</span>
      </a>
    </section>
  )
}
