import { useState } from 'react'
import { Link } from 'react-router-dom'
import { popularScienceComics } from '../data/content'
import ImageLightbox from './ImageLightbox'

const cardPalette = [
  { accent: '#c9a96a', glow: 'rgba(201, 169, 106, 0.22)' },
  { accent: '#567aa8', glow: 'rgba(86, 122, 168, 0.24)' },
  { accent: '#d68a6e', glow: 'rgba(214, 138, 110, 0.22)' },
  { accent: '#78a88c', glow: 'rgba(120, 168, 140, 0.22)' },
]

/**
 * 「公众号科普长图」类目：封面网格 + 点击灯箱看完整长图
 * 复用首页 ComicsFeatured 的 .cf-* 视觉语言，保证整站卡片同调。
 *
 * 两处复用：
 *   - 医学可视化页：全量 8 条（用默认 props）
 *   - 首页：featured 精选子集 + 「查看全部」入口
 * aiAssisted 的条目会在封面角标 + 卡片正文双重声明 AI 辅助制作。
 */
export default function ScienceComics({
  items = popularScienceComics,
  id = 'science-comics',
  eyebrow = 'POPULAR SCIENCE',
  title = '公众号科普长图',
  desc = '面向公众号读者的医学科普长图，把检查、筛查与康复要点拉成一条能一口气读完的图，点击封面查看完整长图。',
  more = null,
}) {
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
    <section id={id} className="section comics-featured science-comics">
      <div className="container">
        <div className="section__head" data-anim="heading">
          <span className="section__eyebrow">{eyebrow}</span>
          <h2 className="section__title">{title}</h2>
          {desc && <p className="medical-section__desc">{desc}</p>}
        </div>

        <div className="comics-featured__grid" data-anim="stagger">
          {items.map((item, i) => {
            const palette = cardPalette[i % cardPalette.length]
            const cover = item.cover || item.images[0]
            return (
              <article
                key={item.id}
                className={`cf-card${item.aiAssisted ? ' cf-card--ai' : ''}`}
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
                  {item.aiAssisted && (
                    <span className="cf-card__ai" title={item.aiNote}>
                      AI 辅助制作
                    </span>
                  )}
                  <span className="cf-card__hint">点击展开</span>
                </div>
                <div className="cf-card__body">
                  <div className="cf-card__meta">
                    <span className="cf-card__tag">{item.tag}</span>
                    <span className="cf-card__cat">{item.category}</span>
                  </div>
                  <h3 className="cf-card__title">{item.title}</h3>
                  <p className="cf-card__desc">{item.desc}</p>
                  {item.aiAssisted && item.aiNote && (
                    <p className="cf-card__note">※ {item.aiNote}</p>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {more && (
          <div className="comics-featured__more" data-reveal>
            <Link to={more.to} className="btn btn--ghost">
              {more.label}
            </Link>
          </div>
        )}
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
