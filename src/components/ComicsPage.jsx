import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSiteAnimations } from '../animations/useSiteAnimations'
import { comics } from '../data/content'
import ImageLightbox from './ImageLightbox'

const cardPalette = [
  { accent: '#c9a96a', glow: 'rgba(201, 169, 106, 0.22)' },
  { accent: '#567aa8', glow: 'rgba(86, 122, 168, 0.24)' },
  { accent: '#d68a6e', glow: 'rgba(214, 138, 110, 0.22)' },
  { accent: '#78a88c', glow: 'rgba(120, 168, 140, 0.22)' },
]

function padNumber(i) {
  return String(i + 1).padStart(2, '0')
}

// 医学可视化插画 / 公众号科普条漫 独立页面
export default function ComicsPage() {
  useSiteAnimations()

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState('')
  const [lightboxAlt, setLightboxAlt] = useState('')

  const featured = comics[0]

  const openLightbox = (src, alt) => {
    setLightboxSrc(src)
    setLightboxAlt(alt)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  return (
    <main className="works-page comics-page">
      {/* ---------------- Hero ---------------- */}
      <section className="comics-hero">
        <div className="comics-hero__bg">
          {featured?.cover ? (
            <img
              className="comics-hero__bg-img"
              src={featured.cover}
              alt=""
              loading="eager"
            />
          ) : (
            <img
              className="comics-hero__bg-img"
              src={featured?.images?.[0]}
              alt=""
              loading="eager"
            />
          )}
          <div className="comics-hero__bg-overlay" />
        </div>

        <div className="container comics-hero__inner">
          <div className="comics-hero__text">
            <Link to="/" className="works-hero__back">
              <span aria-hidden="true">←</span> 返回首页
            </Link>
            <span className="works-hero__eyebrow" data-anim="heading">
              MEDICAL ILLUSTRATION
            </span>
            <h1 className="works-hero__title" data-anim="heading">
              医学可视化插画
            </h1>
            <p className="works-hero__sub" data-reveal>
              公众号科普条漫 · 用画面把复杂的医学知识讲成普通人能看懂的故事。
              <br />
              点击封面查看完整长图。
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

      {/* ---------------- Comics list ---------------- */}
      <section className="comics-list">
        <div className="container">
          {comics.map((item, i) => {
            const palette = cardPalette[i % cardPalette.length]
            const isReversed = i % 2 === 1
            const imageSrc = item.cover || item.images[0]

            return (
              <article
                key={item.id}
                className={`comic-item ${isReversed ? 'comic-item--reverse' : ''}`}
                data-anim="reveal"
              >
                <div className="comic-item__text">
                  <span
                    className="comic-item__number"
                    style={{ color: palette.accent }}
                  >
                    {padNumber(i)}
                  </span>
                  <div className="comic-item__meta">
                    <span className="comic-item__tag">{item.tag}</span>
                    <span className="comic-item__year">{item.year}</span>
                  </div>
                  <h2 className="comic-item__title">{item.title}</h2>
                  <p className="comic-item__desc">{item.desc}</p>
                  <button
                    type="button"
                    className="comic-item__view"
                    onClick={() => openLightbox(item.images[0], item.title)}
                    style={{ '--comic-accent': palette.accent }}
                  >
                    查看完整条漫
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className="comic-item__media">
                  <div
                    className="comic-item__frame"
                    style={{ '--comic-glow': palette.glow }}
                    onClick={() => openLightbox(item.images[0], item.title)}
                    role="button"
                    tabIndex={0}
                    aria-label={`查看 ${item.title}`}
                    onKeyDown={(e) =>
                      (e.key === 'Enter' || e.key === ' ') &&
                      openLightbox(item.images[0], item.title)
                    }
                  >
                    <img
                      className="comic-item__img"
                      src={imageSrc}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className="comic-item__img-overlay" />
                    <span className="comic-item__hint">点击展开</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ---------------- Lightbox ---------------- */}
      <ImageLightbox
        src={lightboxSrc}
        alt={lightboxAlt}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </main>
  )
}
