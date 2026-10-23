import { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageLightbox from './ImageLightbox'

const cardPalette = [
  { accent: '#c9a96a', glow: 'rgba(201, 169, 106, 0.22)' },
  { accent: '#567aa8', glow: 'rgba(86, 122, 168, 0.24)' },
  { accent: '#d68a6e', glow: 'rgba(214, 138, 110, 0.22)' },
  { accent: '#78a88c', glow: 'rgba(120, 168, 140, 0.22)' },
]

// 首页「精选长图案例」：封面网格 + 点击灯箱看全图
// items 由 Home 传入（comics 中 featured 标记的精选子集）
export default function ComicsFeatured({ items = [] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState('')
  const [lightboxAlt, setLightboxAlt] = useState('')

  const openLightbox = (src, alt) => {
    setLightboxSrc(src)
    setLightboxAlt(alt)
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)

  if (!items.length) return null

  return (
    <section id="comics-featured" className="section comics-featured">
      <div className="container">
        <div className="section__head" data-anim="heading">
          <span className="section__eyebrow">LONG-FORM COMICS</span>
          <h2 className="section__title">精选长图案例</h2>
        </div>

        <div className="comics-featured__grid" data-anim="stagger">
          {items.map((item, i) => {
            const palette = cardPalette[i % cardPalette.length]
            const cover = item.cover || item.images[0]
            return (
              <article
                key={item.id}
                className="cf-card"
                style={{ '--cf-accent': palette.accent, '--cf-glow': palette.glow }}
                role="button"
                tabIndex={0}
                aria-label={`查看 ${item.title}`}
                onClick={() => openLightbox(item.images[0], item.title)}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') &&
                  openLightbox(item.images[0], item.title)
                }
              >
                <div className="cf-card__media">
                  <img
                    className="cf-card__img"
                    src={cover}
                    alt={item.title}
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <span className="cf-card__hint">点击展开</span>
                </div>
                <div className="cf-card__body">
                  <div className="cf-card__meta">
                    <span className="cf-card__tag">{item.tag}</span>
                    <span className="cf-card__cat">{item.category}</span>
                  </div>
                  <h3 className="cf-card__title">{item.title}</h3>
                  <p className="cf-card__desc">{item.desc}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="comics-featured__more" data-reveal>
          <Link to="/illustrations" className="btn btn--ghost">
            查看全部长图 →
          </Link>
        </div>
      </div>

      <ImageLightbox
        src={lightboxSrc}
        alt={lightboxAlt}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </section>
  )
}
