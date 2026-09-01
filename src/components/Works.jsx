import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSiteAnimations } from '../animations/useSiteAnimations'
import { projects } from '../data/content'
import SpotlightCard from './SpotlightCard'
import MagicBorder from './MagicBorder'

const spotColor = {
  gold: 'rgba(201, 169, 106, 0.20)',
  blue: 'rgba(86, 122, 168, 0.22)',
  warm: 'rgba(214, 138, 110, 0.20)',
  jade: 'rgba(120, 168, 140, 0.20)',
}

const cardGlow = {
  gold: 'rgba(201, 169, 106, 0.55)',
  blue: 'rgba(86, 122, 168, 0.55)',
  warm: 'rgba(214, 138, 110, 0.55)',
  jade: 'rgba(120, 168, 140, 0.55)',
}

const marqueeItems = [
  '手作素材库',
  '医学可视化',
  'AI 动画',
  '治愈系插画',
  '编绳手作',
  '玉石平安扣',
  '自研工具',
  '持续生长',
]

export default function Works() {
  useSiteAnimations()

  const featuredIndex = useMemo(
    () => projects.findIndex((p) => p.featured) || 0,
    [],
  )
  const [selectedIndex, setSelectedIndex] = useState(featuredIndex)
  const selected = projects[selectedIndex]

  return (
    <main className="works-page">
      {/* ---------------- Hero ---------------- */}
      <section className="works-hero">
        <div className="container works-hero__inner">
          <div className="works-hero__text">
            <Link to="/" className="works-hero__back">
              <span aria-hidden="true">←</span> 返回首页
            </Link>
            <span className="works-hero__eyebrow" data-anim="heading">
              PORTFOLIO
            </span>
            <h1 className="works-hero__title" data-anim="heading">
              ALL WORKS
            </h1>
            <p className="works-hero__sub" data-reveal>
              这里收录我做过、正在做、和想做的事——插画、AI 动画、自研工具与手作。
              <br />
              点击下方卡片，查看每个项目的细节。
            </p>
            <div className="works-hero__actions" data-reveal>
              <Link to="/#contact" className="btn btn--solid">
                联系我
              </Link>
              <Link to="/#projects" className="btn btn--ghost">
                返回精选
              </Link>
            </div>
          </div>
        </div>
        <div className="works-hero__glow" aria-hidden="true" />
      </section>

      {/* ---------------- Marquee ---------------- */}
      <div className="works-marquee" aria-hidden="true">
        <div className="works-marquee__track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, i) => (
            <span key={i} className="works-marquee__item">
              {text}
              <span className="works-marquee__dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- Gallery ---------------- */}
      <section className="works-gallery">
        <div className="container">
          <div className="section__head works-gallery__head" data-anim="heading">
            <span className="section__eyebrow">PROJECTS</span>
            <h2 className="section__title">作品画廊</h2>
          </div>

          <div className="works-gallery__grid" data-anim="stagger">
            {projects.map((p, i) => (
              <div
                key={p.title}
                role="button"
                tabIndex={0}
                className={`works-card ${selectedIndex === i ? 'is-active' : ''}`}
                onClick={() => setSelectedIndex(i)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedIndex(i)}
                aria-pressed={selectedIndex === i}
                aria-label={`查看 ${p.title}`}
              >
                <SpotlightCard
                  className={`work-card card--${p.card}`}
                  spotlightColor={spotColor[p.card] || 'rgba(201, 169, 106, 0.18)'}
                >
                  <div className="work-card__media">
                    {p.media && (
                      <>
                        {p.media.endsWith('.mp4') ? (
                          <video
                            className="work-card__video"
                            src={p.media}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            autoPlay
                          />
                        ) : (
                          <img className="work-card__img" src={p.media} alt="" loading="lazy" />
                        )}
                        <div className="work-card__media-overlay" />
                      </>
                    )}
                    <span className="work-card__status">{p.status}</span>
                    {p.year !== '—' && <span className="work-card__year">{p.year}</span>}
                  </div>
                  <div className="work-card__body">
                    <span className="work-card__tag">{p.tag}</span>
                    <h3 className="work-card__title">{p.title}</h3>
                    <p className="work-card__desc">{p.desc}</p>
                  </div>
                  <MagicBorder overlay />
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Detail ---------------- */}
      <section className="works-detail" key={selected.title}>
        <div className="container">
          <div className="works-detail__grid">
            <div className="works-detail__text" data-anim="heading">
              <span className="works-detail__eyebrow">PROJECT DETAIL</span>
              <h2 className="works-detail__title">{selected.title}</h2>
              <p className="works-detail__desc">{selected.desc}</p>
              <Link to="/#contact" className="btn btn--solid works-detail__cta">
                一起聊聊
              </Link>
            </div>

            <div className="works-detail__media" data-anim="reveal">
              <div
                className="works-detail__frame"
                style={{ '--detail-glow': cardGlow[selected.card] || cardGlow.gold }}
              >
                <span className="works-detail__placeholder">
                  {selected.title.split(' · ').map((s) => s.trim()).slice(0, 2).join(' · ')}
                </span>
                <span className="works-detail__year">{selected.year}</span>
              </div>
            </div>

            <div className="works-detail__meta" data-anim="stagger">
              <div className="meta-line">
                <span className="meta-dot" style={{ background: cardGlow[selected.card] }} />
                <span className="meta-label">状态</span>
                <span className="meta-value">{selected.status}</span>
              </div>
              <div className="meta-line">
                <span className="meta-dot" style={{ background: cardGlow[selected.card] }} />
                <span className="meta-label">年份</span>
                <span className="meta-value">{selected.year}</span>
              </div>
              <div className="meta-line">
                <span className="meta-dot" style={{ background: cardGlow[selected.card] }} />
                <span className="meta-label">类型</span>
                <span className="meta-value">{selected.tag}</span>
              </div>
              <div className="meta-line">
                <span className="meta-dot" style={{ background: cardGlow[selected.card] }} />
                <span className="meta-label">亮点</span>
                <span className="meta-value">{selected.featured ? '精选作品' : '持续更新'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
