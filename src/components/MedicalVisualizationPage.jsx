import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useSiteAnimations } from '../animations/useSiteAnimations'
import { aiMotion, comics } from '../data/content'
import MasonryCards from './MasonryCards'
import ComicsList from './ComicsList'
import VideoPlayer from './VideoPlayer'

// 医学可视化插画& AI 动画 聚合页面
export default function MedicalVisualizationPage() {
  useSiteAnimations()

  const featured = comics[0]

  // InfiniteGallery 需要 {url,title,alt,subtitle}；用视频抽帧缩略图作画廊图像
  // media 形如 /ai-motion/xxx.mp4 → 缩略图 /ai-motion/thumbs/xxx.webp
  const galleryImages = useMemo(
    () =>
      aiMotion
        .filter((m) => m.media)
        .map((m) => ({
          url: m.media.replace('/ai-motion/', '/ai-motion/thumbs/').replace(/\.mp4$/i, '.webp'),
          title: m.title,
          alt: m.title,
          subtitle: m.tag,
          media: m.media,
        })),
    [],
  )

  const [player, setPlayer] = useState({ open: false, index: 0 })
  const openPlayer = (index) => setPlayer({ open: true, index })
  const closePlayer = () => setPlayer((p) => ({ ...p, open: false }))

  return (
    <main className="works-page medical-visualization-page">
      {/* ---------------- Hero ---------------- */}
      <section className="hero page-hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__fade-edge" aria-hidden="true" />

        <div className="hero__content container">
          <p className="hero__eyebrow" data-anim="heading">
            MEDICAL VISUALIZATION
          </p>
          <h1 className="hero__title" data-anim="heading">
            <span className="hero__title-mask">
              <span className="hero__title-line hero__title-line--large">
                长图插画 & AI 辅助手绘修改
              </span>
            </span>
          </h1>
          <p className="hero__subtitle" data-reveal>
            在企业项目中负责医学类插画与 AI 动画设计。
            <br />
            部分内容受保密限制，仅展示脱敏片段。
          </p>
          <div className="hero__actions" data-reveal>
            <Link to="/#contact" className="hero__btn-magic">
              <span className="bm__corner bm__corner--tl" />
              <span className="bm__corner bm__corner--tr" />
              <span className="bm__corner bm__corner--br" />
              <span className="bm__corner bm__corner--bl" />
              <span className="bm__label">联系我</span>
            </Link>
            <Link to="/#projects" className="hero__btn-magic">
              <span className="bm__corner bm__corner--tl" />
              <span className="bm__corner bm__corner--tr" />
              <span className="bm__corner bm__corner--br" />
              <span className="bm__corner bm__corner--bl" />
              <span className="bm__label">返回精选</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- AI 动画：两列瀑布流 -----------------
          参考设计稿的错落卡片墙，纯 CSS columns 实现、不劫持滚动。
          原 3D 无限图像场 InfiniteGallery 已存档至 src/components/_archive/。 */}
      <section id="motion" className="medical-section medical-section--motion">
        <div className="container">
          <div className="section__head medical-section__head" data-anim="heading">
            <span className="section__eyebrow">AI MOTION</span>
            <h2 className="section__title">AI 动画</h2>
            <p className="medical-section__desc">
              医学可视化、科普短片、片头动画——两列错落铺陈，点击任意一张放大查看。
            </p>
          </div>

          <MasonryCards
            images={galleryImages}
            columns={2}
            gap={18}
            radius={14}
            showLabel
            allowFocusOnClick
            onPlay={(item) => {
              const i = aiMotion.findIndex((m) => m.media === item.media)
              if (i >= 0) openPlayer(i)
            }}
          />
        </div>

        <VideoPlayer
          src={aiMotion[player.index]?.media}
          title={aiMotion[player.index]?.title}
          isOpen={player.open}
          onClose={closePlayer}
        />
      </section>

      {/* ---------------- 医学插画 ---------------- */}
      <section id="comics" className="medical-section medical-section--comics">
        <div className="container">
          <div className="section__head medical-section__head" data-anim="heading">
            <span className="section__eyebrow">MEDICAL ILLUSTRATION</span>
            <h2 className="section__title">公众号科普条漫</h2>
            <p className="medical-section__desc">
              用画面把复杂的医学知识讲成普通人能看懂的故事，点击封面查看完整长图。
            </p>
          </div>
        </div>
        <ComicsList />
      </section>
    </main>
  )
}
