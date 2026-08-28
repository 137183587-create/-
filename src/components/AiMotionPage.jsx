import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSiteAnimations } from '../animations/useSiteAnimations'
import { aiMotion } from '../data/content'
import VideoPlayer from './VideoPlayer'

const glowByCard = {
  gold: 'rgba(201, 169, 106, 0.16)',
  blue: 'rgba(86, 122, 168, 0.16)',
  warm: 'rgba(214, 138, 110, 0.16)',
  jade: 'rgba(120, 168, 140, 0.16)',
}

function offsetClass(index, activeIndex) {
  const offset = index - activeIndex
  if (Math.abs(offset) > 2) return 'ai-carousel__item--offset-far'
  return offset < 0
    ? `ai-carousel__item--offset-n${Math.abs(offset)}`
    : `ai-carousel__item--offset-${offset}`
}

// AI 动画独立页面：3D Coverflow 轮播 + 自定义视频播放器
export default function AiMotionPage() {
  useSiteAnimations()

  const [activeIndex, setActiveIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [playerIndex, setPlayerIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const carouselRef = useRef(null)
  const lastWheelTime = useRef(0)
  const videoRefs = useRef([])

  // 入场动画：先让所有卡片聚在中心，再散开
  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 60)
    return () => clearTimeout(t)
  }, [])

  // 监听轮播区是否占视口主体，决定是否接管滚轮
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setIsInView(entry.intersectionRatio > 0.55),
      { threshold: [0, 0.55, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // 鼠标滚轮切换；在边界处释放页面滚动
  useEffect(() => {
    if (!isInView) return
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 24) return

      const atFirst = activeIndex === 0
      const atLast = activeIndex === aiMotion.length - 1
      const goingDown = e.deltaY > 0

      // 到边界时让页面继续滚动，不卡死
      if ((goingDown && atLast) || (!goingDown && atFirst)) return

      const now = Date.now()
      if (now - lastWheelTime.current < 700) return

      e.preventDefault()
      lastWheelTime.current = now
      setActiveIndex((i) =>
        goingDown ? Math.min(aiMotion.length - 1, i + 1) : Math.max(0, i - 1),
      )
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isInView, activeIndex])

  // 窗口化加载：仅当前卡片及左右相邻各 1 个设置 src，其余不加载。
  // 大幅减少首屏并发请求；切换目标永远已被预载，首帧近乎即时。
  const loadedSet = useMemo(() => {
    const set = new Set()
    for (let d = -1; d <= 1; d++) {
      const idx = activeIndex + d
      if (idx >= 0 && idx < aiMotion.length) set.add(idx)
    }
    return set
  }, [activeIndex])

  // 单一播放：同一时间仅有一个视频在播放。
  // - 播放器打开时：暂停并复位所有轮播视频，释放解码/音频资源。
  // - 否则：仅 active 视频播放，其余一律暂停并回到开头（避免画面残留与声音叠加）。
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      const shouldPlay = !playerOpen && i === activeIndex && loadedSet.has(i)
      if (shouldPlay) {
        const p = video.play()
        if (p && p.catch) p.catch(() => {})
      } else {
        video.pause()
        // 复位到开头：停止解码占用，防止多个视频同时发声/渲染
        try {
          video.currentTime = 0
        } catch {
          /* 个别浏览器在 src 移除瞬间设时间会抛错，忽略 */
        }
      }
    })
  }, [activeIndex, loadedSet, playerOpen])

  // 键盘左右切换；播放器打开时不接管
  useEffect(() => {
    const onKey = (e) => {
      if (playerOpen) return
      if (e.key === 'ArrowLeft') setActiveIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setActiveIndex((i) => Math.min(aiMotion.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playerOpen])

  const activeItem = aiMotion[activeIndex]
  const glowColor = useMemo(
    () => glowByCard[activeItem?.card] || glowByCard.gold,
    [activeItem],
  )

  const openPlayer = (index) => {
    setPlayerIndex(index)
    setPlayerOpen(true)
  }

  const closePlayer = () => setPlayerOpen(false)

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const next = () => setActiveIndex((i) => Math.min(aiMotion.length - 1, i + 1))

  return (
    <main className="works-page ai-motion-page">
      {/* ---------------- Hero ---------------- */}
      <section className="works-hero">
        <div className="container works-hero__inner">
          <div className="works-hero__text">
            <Link to="/" className="works-hero__back">
              <span aria-hidden="true">←</span> 返回首页
            </Link>
            <span className="works-hero__eyebrow" data-anim="heading">
              AI MOTION
            </span>
            <h1 className="works-hero__title" data-anim="heading">
              AI 动画
            </h1>
            <p className="works-hero__sub" data-reveal>
              医学可视化、科普短片、片头动画……这里收录我用 AI 做过的动态作品。
              <br />
              滚动鼠标或点击两侧箭头切换，点击播放。
            </p>
            <div className="works-hero__actions" data-reveal>
              <Link to="/#contact" className="btn btn--solid">
                联系我
              </Link>
              <Link to="/#ai-motion" className="btn btn--ghost">
                返回精选
              </Link>
            </div>
          </div>
        </div>
        <div className="works-hero__glow" aria-hidden="true" />
      </section>

      {/* ---------------- 3D Coverflow 轮播 ---------------- */}
      <section
        ref={carouselRef}
        className="ai-carousel"
        aria-roledescription="carousel"
        aria-label="AI 动画作品"
      >
        <div
          className={`ai-carousel__stage ${isReady ? 'is-ready' : ''}`}
          style={{ '--glow-color': glowColor }}
        >
          <div className="ai-carousel__glow" aria-hidden="true" />

          {aiMotion.map((m, i) => {
            const isActive = i === activeIndex
            return (
              <div
                key={m.title}
                className={`ai-carousel__item ${offsetClass(i, activeIndex)} ${
                  isActive ? 'is-active' : ''
                }`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${aiMotion.length}`}
                aria-hidden={!isActive}
                onClick={() => !isActive && setActiveIndex(i)}
              >
                <div className={`ai-carousel__card card--${m.card}`}>
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    className="ai-carousel__video"
                    src={loadedSet.has(i) ? m.media : undefined}
                    preload="metadata"
                    muted
                    loop
                    playsInline
                  />
                  <div className="ai-carousel__overlay" />

                  {isActive ? (
                    <div className="ai-carousel__info" key={`info-${i}`}>
                      <span className="ai-carousel__tag">{m.tag}</span>
                      <h3 className="ai-carousel__title">{m.title}</h3>
                      <p className="ai-carousel__desc">{m.desc}</p>
                      <div className="ai-carousel__meta">
                        <span>{m.status}</span>
                        {m.year !== '—' && <span>{m.year}</span>}
                      </div>
                    </div>
                  ) : (
                    <h3 className="ai-carousel__side-title">{m.title}</h3>
                  )}

                  {isActive && (
                    <button
                      type="button"
                      className="ai-carousel__play"
                      onClick={(e) => {
                        e.stopPropagation()
                        openPlayer(i)
                      }}
                      aria-label={`播放 ${m.title}`}
                    >
                      ▶
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className="ai-carousel__arrow ai-carousel__arrow--prev"
          onClick={prev}
          disabled={activeIndex === 0}
          aria-label="上一个"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="ai-carousel__arrow ai-carousel__arrow--next"
          onClick={next}
          disabled={activeIndex === aiMotion.length - 1}
          aria-label="下一个"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="ai-carousel__dots" role="tablist" aria-label="轮播指示器">
          {aiMotion.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`第 ${i + 1} 个作品`}
              className={`ai-carousel__dot ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* ---------------- 视频播放器弹窗 ---------------- */}
      <VideoPlayer
        src={aiMotion[playerIndex]?.media}
        title={aiMotion[playerIndex]?.title}
        isOpen={playerOpen}
        onClose={closePlayer}
      />
    </main>
  )
}
