import { useEffect, useMemo, useRef, useState } from 'react'
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

// 可复用的 3D Coverflow 轮播 + 自定义视频播放器
export default function AiMotionCarousel({ items, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [playerIndex, setPlayerIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef(null)
  const lastWheelTime = useRef(0)
  const videoRefs = useRef([])

  // 入场动画
  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 60)
    return () => clearTimeout(t)
  }, [])

  // 鼠标悬停时滚轮只控制轮播，不滚动页面
  useEffect(() => {
    if (!isHovered) return
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 24) return

      const goingDown = e.deltaY > 0
      const now = Date.now()
      if (now - lastWheelTime.current < 700) {
        e.preventDefault()
        return
      }

      e.preventDefault()
      lastWheelTime.current = now
      setActiveIndex((i) =>
        goingDown ? Math.min(items.length - 1, i + 1) : Math.max(0, i - 1),
      )
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isHovered, items.length])

  // 窗口化加载：仅当前卡片及左右相邻各 1 个设置 src
  const loadedSet = useMemo(() => {
    const set = new Set()
    for (let d = -1; d <= 1; d++) {
      const idx = activeIndex + d
      if (idx >= 0 && idx < items.length) set.add(idx)
    }
    return set
  }, [activeIndex, items.length])

  // 单一播放：同一时间仅有一个视频在播放
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      const shouldPlay = !playerOpen && i === activeIndex && loadedSet.has(i)
      if (shouldPlay) {
        const p = video.play()
        if (p && p.catch) p.catch(() => {})
      } else {
        video.pause()
        try {
          video.currentTime = 0
        } catch {
          /* ignore */
        }
      }
    })
  }, [activeIndex, loadedSet, playerOpen])

  // 键盘左右切换；播放器打开时不接管
  useEffect(() => {
    const onKey = (e) => {
      if (playerOpen) return
      if (e.key === 'ArrowLeft') setActiveIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setActiveIndex((i) => Math.min(items.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playerOpen, items.length])

  const activeItem = items[activeIndex]
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
  const next = () => setActiveIndex((i) => Math.min(items.length - 1, i + 1))

  return (
    <>
      <section
        ref={carouselRef}
        className={`ai-carousel ${className}`}
        aria-roledescription="carousel"
        aria-label="AI 动画作品"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`ai-carousel__stage ${isReady ? 'is-ready' : ''}`}
          style={{ '--glow-color': glowColor }}
        >
          <div className="ai-carousel__glow" aria-hidden="true" />

          {items.map((m, i) => {
            const isActive = i === activeIndex
            return (
              <div
                key={m.title}
                className={`ai-carousel__item ${offsetClass(i, activeIndex)} ${
                  isActive ? 'is-active' : ''
                }`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${items.length}`}
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
          disabled={activeIndex === items.length - 1}
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
          {items.map((_, i) => (
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

      <VideoPlayer
        src={items[playerIndex]?.media}
        title={items[playerIndex]?.title}
        isOpen={playerOpen}
        onClose={closePlayer}
      />
    </>
  )
}
