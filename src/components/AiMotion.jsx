import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const glowByCard = {
  gold: 'rgba(201, 169, 106, 0.18)',
  blue: 'rgba(86, 122, 168, 0.18)',
  warm: 'rgba(214, 138, 110, 0.18)',
  jade: 'rgba(120, 168, 140, 0.18)',
}

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 偏移档位：d = i - activeIndex（超过 2 档视为"环外"，淡出隐藏）
function offsetKey(i, activeIndex) {
  const d = i - activeIndex
  if (Math.abs(d) > 2) return 'far'
  return d < 0 ? `n${-d}` : `${d}`
}

/**
 * AI 动画 · 伪3D球面环视
 * - 卡片沿浅弧面排布：中间最前最高，两侧按角度后退、旋转、下沉（球/柱面环视感）
 * - 鼠标移动 → 整环轻微转动 + 各层按深度做「纵深平移」视差（越靠后位移越大）
 * - 鼠标滚轮（悬停区内）→ 切换聚焦卡，并隔离页面滚动；到首/尾自动释放，不把人"卡"在该区块
 * - 视频窗口化加载（仅聚焦 ±1）；不自动播放，点击卡片/播放键手动播放与暂停，
 *   播放时文案与压暗层淡出、画面留白；暂停或播完回到封面态
 * 首页传 limit 取精选，整页路由见 /ai-motion。
 */
export default function AiMotion({ items, limit }) {
  const isTeaser = typeof limit === 'number'
  const shown = isTeaser ? items.slice(0, limit) : items
  const count = shown.length

  const [activeIndex, setActiveIndex] = useState(0)
  // 聚焦卡是否正在播放；手动点击切换，不再自动播放
  const [playing, setPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const stageRef = useRef(null)
  const lastWheel = useRef(0)
  const videoRefs = useRef([])

  /* ---------- 鼠标纵深视差：把归一化鼠标位置写进 --mx / --my（-1..1）---------- */
  useEffect(() => {
    const el = stageRef.current
    if (!el || reducedMotion()) return
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    let raf
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.055
      cur.y += (target.y - cur.y) * 0.055
      el.style.setProperty('--mx', cur.x.toFixed(4))
      el.style.setProperty('--my', cur.y.toFixed(4))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* ---------- 滚轮：悬停区内切换聚焦卡（隔离页面滚动）；边界处释放 ---------- */
  useEffect(() => {
    if (!isHovered) return
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 20) return
      const down = e.deltaY > 0
      const atEdge = down ? activeIndex >= count - 1 : activeIndex <= 0
      if (atEdge) return // 到边界不拦截 → 页面继续滚动，避免被"锁"在本区块

      e.preventDefault()
      const now = Date.now()
      if (now - lastWheel.current < 620) return
      lastWheel.current = now
      setPlaying(false)
      setActiveIndex((i) => (down ? Math.min(count - 1, i + 1) : Math.max(0, i - 1)))
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isHovered, activeIndex, count])

  /* ---------- 窗口化加载：仅聚焦卡及左右各 1 个挂载视频源 ---------- */
  const loadedSet = useMemo(() => {
    const set = new Set()
    for (let d = -1; d <= 1; d++) {
      const idx = activeIndex + d
      if (idx >= 0 && idx < count) set.add(idx)
    }
    return set
  }, [activeIndex, count])

  /* ---------- 单一播放：不自动播放，仅聚焦卡在用户点击后播放 ----------
     默认静置：展示缩略图 poster + 文案；点击卡片/播放键才播放，
     播放时文案淡出、画面提亮；暂停或播完回到封面态。 */
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      const shouldPlay = i === activeIndex && playing
      video.muted = !shouldPlay
      video.loop = false
      video.controls = false
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
  }, [activeIndex, loadedSet, playing])

  /* ---------- 键盘左右切换 ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        setPlaying(false)
        setActiveIndex(activeIndex - 1)
      }
      if (e.key === 'ArrowRight' && activeIndex < count - 1) {
        setPlaying(false)
        setActiveIndex(activeIndex + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, count])

  const activeItem = shown[activeIndex]
  const glowColor = glowByCard[activeItem?.card] || glowByCard.gold

  // 切换聚焦卡：一律回到封面态（不自动播放）
  const goTo = (i) => {
    if (i === activeIndex || i < 0 || i >= count) return
    setPlaying(false)
    setActiveIndex(i)
  }
  const goPrev = () => goTo(activeIndex - 1)
  const goNext = () => goTo(activeIndex + 1)

  return (
    <>
      <section id="ai-motion" className="section ai-motion ai-ring">
        <div className="ai-ring__bg" aria-hidden="true" />

        <div className="container">
          <div className="section__head ai-ring__head" data-anim="heading">
            <span className="section__eyebrow">AI MOTION</span>
            <h2 className="section__title">AI 动画</h2>
          </div>
        </div>

        <div
          className="ai-ring__viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="AI 动画作品 · 环视"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="ai-ring__stage"
            ref={stageRef}
            style={{ '--glow-color': glowColor }}
          >
            <div className="ai-ring__glow" aria-hidden="true" />

            {shown.map((m, i) => {
              const isActive = i === activeIndex
              return (
                <div
                  key={m.title}
                  className={`ai-ring__item ai-ring__item--d${offsetKey(i, activeIndex)} ${
                    isActive ? 'is-active' : ''
                  }`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${count}`}
                  onClick={() => {
                    // 聚焦卡：点击切换播放/暂停；非聚焦卡：切换聚焦（回封面态）
                    if (isActive) {
                      setPlaying((v) => !v)
                    } else {
                      goTo(i)
                    }
                  }}
                >
                  <div className="ai-ring__para">
                    <div className={`ai-ring__card ${isActive && playing ? 'is-playing' : ''}`}>
                      {loadedSet.has(i) && m.media ? (
                        <video
                          ref={(el) => (videoRefs.current[i] = el)}
                          className="ai-ring__video"
                          preload="metadata"
                          playsInline
                          poster={m.media
                            .replace('/ai-motion/', '/ai-motion/thumbs/')
                            .replace(/\.mp4$/i, '.webp')}
                          onEnded={() => setPlaying(false)}
                        >
                          {/* webm(VP9) 优先，mp4 兜底 —— 与 LazyVideo 同一套双源规格 */}
                          <source src={m.media.replace(/\.mp4$/i, '.webm')} type="video/webm" />
                          <source src={m.media} type="video/mp4" />
                        </video>
                      ) : (
                        <span className="ai-ring__ph" aria-hidden="true" />
                      )}

                      <div className="ai-ring__shade" aria-hidden="true" />

                      {isActive ? (
                        <div className="ai-ring__info" key={`info-${i}`}>
                          <span className="ai-ring__tag">{m.tag}</span>
                          <h3 className="ai-ring__title">{m.title}</h3>
                          <p className="ai-ring__desc">{m.desc}</p>
                          <div className="ai-ring__meta">
                            <span>{m.status}</span>
                            {m.year !== '—' && <span>{m.year}</span>}
                          </div>
                        </div>
                      ) : (
                        <h3 className="ai-ring__side-title">{m.title}</h3>
                      )}

                      {/* 播放/暂停切换：播放中按钮淡出，仅悬停卡片时浮现，避免遮挡画面 */}
                      {isActive && (
                        <button
                          type="button"
                          className={`ai-ring__play ${playing ? 'is-playing' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setPlaying((v) => !v)
                          }}
                          aria-label={`${playing ? '暂停' : '播放'} ${m.title}`}
                        >
                          {playing ? (
                            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="6.6" y="5" width="3.6" height="14" rx="1.2" fill="currentColor" />
                              <rect x="13.8" y="5" width="3.6" height="14" rx="1.2" fill="currentColor" />
                            </svg>
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8 5.4v13.2L19 12z" fill="currentColor" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="ai-ring__arrow ai-ring__arrow--prev"
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="上一个"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="ai-ring__arrow ai-ring__arrow--next"
            onClick={goNext}
            disabled={activeIndex === count - 1}
            aria-label="下一个"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 5L16 12L9 19"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="ai-ring__dots" role="tablist" aria-label="环视指示器">
            {shown.map((m, i) => (
              <button
                key={m.title}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`第 ${i + 1} 个作品`}
                className={`ai-ring__dot ${i === activeIndex ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <span className="ai-ring__hint" aria-hidden="true">滚轮环视 · 点击播放</span>
        </div>

        {isTeaser && (
          <div className="container">
            <div className="ai-motion__more" data-reveal>
              <Link to="/ai-motion" className="btn btn--ghost">
                查看全部 AI 动画 →
              </Link>
            </div>
          </div>
        )}
      </section>

    </>
  )
}
