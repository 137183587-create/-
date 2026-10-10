/**
 * SpinShutter —— 复刻 React Bits Pro「Spin Shutter」
 * 一圈照片/卡片沿轨道旋转，指哪儿哪儿被拉到焦点前。
 * 官方文档：https://pro.reactbits.dev/docs/components/spin-shutter
 *
 * 与官方版的核心差异：
 * - 官方用 WebGL/canvas 渲染；本站用纯 CSS 3D transform（rotateY 均分 + translateZ 环半径 +
 *   stage 级 tilt/roll）实现同样观感，零新增依赖，31 个 DOM 节点性能完全够用。
 * - 视频卡片做了窗口化挂载：只有聚焦卡及左右各 1 个真正挂 <video>，其余渲染静态占位，
 *   避免 31 个视频同时下载。
 *
 * 关键特性：**所有卡片同屏可见**（不像 Coverflow 只露 1 张），远端卡片按 haze/aperture
 * 淡出并失焦，聚焦卡被转到正前方。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
const TAU = Math.PI * 2

export default function SpinShutter({
  items = [],
  className = '',
  /* —— 官方 props 命名与默认值 —— */
  count = 0, // 0 = 每张照片只出现一次
  startIndex = 0,
  aspect = 16 / 9, // 本站视频是横版，故默认横版而非官方 1
  size = 0.34, // 卡片高度 / 环半径
  radius = 16, // 前方卡片圆角(px)，远端按 size 缩小
  tilt = 14, // 相机俯角(deg)：0=平视一排，越大越成环
  roll = -18, // 整环在页面上的旋转(deg)，让它沿对角线走
  distance = 3.2, // 相机距离(环半径倍数)
  scale = 1,
  cluster = 1,
  spread = 0.6,
  speed = 1.2, // 转速(转/分钟)，负值反向，0 静止
  aperture = 0.45, // 景深：越大远端越模糊，0 = 全清晰
  haze = 0.3, // 远端卡片向背景淡出的程度
  shadow = 0.35,
  intro = true, // 入场时从一叠展开
  pauseOnHover = true,
  draggable = true,
  wheel = true,
  captions = true,
  backgroundColor = 'transparent',
  paused = false,
  onFocusChange,
  onSelect,
}) {
  const total = items.length
  // count>0 时循环补足到 count 张，否则每张只出现一次
  const slots = useMemo(() => {
    if (!total) return []
    if (!count || count <= total) return items
    const out = []
    for (let i = 0; i < count; i++) out.push(items[i % total])
    return out
  }, [items, count, total])

  const n = slots.length

  const stageRef = useRef(null)
  const wrapRef = useRef(null)
  // 轨道角度（度）：0 表示 slots[0] 在正前方
  const angleRef = useRef(0)
  const [focusIndex, setFocusIndex] = useState(() =>
    clamp(startIndex, 0, Math.max(0, total - 1)),
  )
  const [introDone, setIntroDone] = useState(!intro)
  const [hovering, setHovering] = useState(false)
  const [dragging, setDragging] = useState(false)
  const velRef = useRef(0) // 拖拽惯性（度/帧）

  const spinPaused = paused || (pauseOnHover && hovering) || dragging
  const stepAngle = n ? 360 / n : 0

  /* ---------- 入场：短暂保持"一叠"态后展开（否则 is-intro 的 opacity:0 会一直挂着） ---------- */
  useEffect(() => {
    if (!intro) {
      setIntroDone(true)
      return
    }
    setIntroDone(false)
    const t = setTimeout(() => setIntroDone(true), 60)
    return () => clearTimeout(t)
  }, [intro])

  /* ---------- 聚焦索引：由轨道角度派生（角度写在 DOM 上，需主动同步到 state） ---------- */
  const syncFocus = useCallback(() => {
    if (!n) return
    const raw = Math.round(-angleRef.current / stepAngle)
    const idx = ((raw % n) + n) % n
    setFocusIndex((prev) => (prev === idx ? prev : idx))
  }, [n, stepAngle])

  /* ---------- 角速度：speed rpm → 度/秒 ---------- */
  useEffect(() => {
    if (spinPaused || !n) return
    let raf
    let last = performance.now()
    const degPerSec = (speed * 360) / 60
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      angleRef.current = (angleRef.current - degPerSec * dt) % 360
      if (stageRef.current) {
        stageRef.current.style.setProperty('--spin', `${angleRef.current.toFixed(3)}deg`)
      }
      syncFocus() // 内部仅在索引真变了才 setState
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [spinPaused, speed, n, syncFocus])

  useEffect(() => {
    if (onFocusChange) onFocusChange(slots[focusIndex], focusIndex)
  }, [focusIndex, slots, onFocusChange])

  /* ---------- 窗口化：仅聚焦 ±1 挂载视频 ---------- */
  const loadedSet = useMemo(() => {
    const s = new Set()
    for (let d = -1; d <= 1; d++) {
      const i = focusIndex + d
      if (i >= 0 && i < n) s.add(i)
    }
    return s
  }, [focusIndex, n])

  const videoRefs = useRef([])
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === focusIndex) {
        const p = v.play()
        if (p && p.catch) p.catch(() => {})
      } else {
        v.pause()
        try {
          v.currentTime = 0
        } catch {
          /* ignore */
        }
      }
    })
  }, [focusIndex, loadedSet])

  /* ---------- 滚轮：逐张转轨 ---------- */
  useEffect(() => {
    const el = wrapRef.current
    if (!el || !wheel) return
    const onWheel = (e) => {
      e.preventDefault()
      const dir = e.deltaY > 0 ? 1 : -1
      angleRef.current -= dir * stepAngle
      if (stageRef.current) {
        stageRef.current.style.setProperty('--spin', `${angleRef.current.toFixed(3)}deg`)
      }
      syncFocus()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [wheel, stepAngle, syncFocus])

  /* ---------- 拖拽转轨 + 惯性 ---------- */
  useEffect(() => {
    if (!draggable) return
    const onMove = (e) => {
      if (!dragging) return
      const dx = e.movementX || 0
      angleRef.current -= dx * 0.35
      velRef.current = dx * 0.35
      if (stageRef.current) {
        stageRef.current.style.setProperty('--spin', `${angleRef.current.toFixed(3)}deg`)
      }
      syncFocus()
    }
    const onUp = () => {
      if (!dragging) return
      setDragging(false)
      // 惯性滑行
      let v = velRef.current
      if (Math.abs(v) > 0.4) {
        const glide = () => {
          v *= 0.94
          angleRef.current -= v
          if (stageRef.current) {
            stageRef.current.style.setProperty('--spin', `${angleRef.current.toFixed(3)}deg`)
          }
          syncFocus()
          if (Math.abs(v) > 0.4) requestAnimationFrame(glide)
        }
        requestAnimationFrame(glide)
      }
      velRef.current = 0
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [draggable, dragging, syncFocus])

  /* ---------- 把某张转到正前方 ---------- */
  const show = useCallback(
    (i) => {
      const t = ((i % n) + n) % n
      angleRef.current = -t * stepAngle
      if (stageRef.current) {
        stageRef.current.style.setProperty('--spin', `${angleRef.current.toFixed(3)}deg`)
      }
      setFocusIndex(t)
    },
    [n, stepAngle],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') show(focusIndex + 1)
      if (e.key === 'ArrowRight') show(focusIndex - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focusIndex, show])

  const handleSelect = (i) => {
    // 已在焦点位的卡再次点击 → 触发选中（父组件通常在此打开播放器）
    if (i === focusIndex && onSelect) onSelect(slots[i], i)
    else show(i)
  }

  if (!n) return null

  // 环几何（关键：sz 是唯一的"卡高 / 环半径"比，卡宽 = 卡高 × aspect，不要再重复缩放）
  // 31 张整圈等分且互不遮挡 → 环半径需 ≥ n×卡宽×0.92/(2π)。取卡宽 300px → R ≈ 1362px。
  // 再用 --dist(perspective) 压扁纵深，横向跨度 2R 在 perspective 下视觉收窄，能装进版心。
  const cardW = 300
  const cardH = Math.round(cardW / aspect)
  const ringRadius = Math.ceil((n * cardW * 0.95) / (2 * Math.PI)) // px，实际环半径
  const sz = cardH / ringRadius // 供 CSS 用：translateZ(ring * sz) 等效 ringRadius

  return (
    <div
      ref={wrapRef}
      className={`spin ${className}`}
      style={{
        backgroundColor,
        '--tilt': `${tilt}deg`,
        '--roll': `${roll}deg`,
        '--dist': distance,
        '--sz': scale,
        '--aperture': aperture,
        '--haze': haze,
        '--shadow': shadow,
        '--card-w': `${cardW}px`,
        '--card-h': `${cardH}px`,
        '--ring': `${ringRadius}px`,
        '--n': n,
        '--step': stepAngle,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="AI 动画作品环轨"
    >
      <div className="spin__viewport">
        <div
          ref={stageRef}
          className={`spin__stage${intro && !introDone ? ' is-intro' : ''}`}
          onPointerDown={() => draggable && setDragging(true)}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        >
          {slots.map((m, i) => {
            // 每张卡在环上的**静态角度**（相对起点的固定偏移）。
            // 整体自转由父级 .spin__stage 的 rotateY(var(--spin)) 承担，
            // 因此这里只写一次固定角度即可，不必随 tick 重渲染。
            const staticOff = i * stepAngle
            // 当前是否在正前方：由聚焦索引判定（随 state 更新）
            const isFocus = ((focusIndex - i) % n + n) % n === 0
            return (
              <div
                key={`${m.title}-${i}`}
                className={`spin__item${isFocus ? ' is-focus' : ''}`}
                style={{
                  transform: `rotateY(${staticOff}deg) translateZ(var(--ring)) scale(var(--sz))`,
                }}
                onClick={() => handleSelect(i)}
              >
                <div
                  className="spin__card"
                  style={{ borderRadius: `${radius}px` }}
                >
                  {loadedSet.has(i) && m.media ? (
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      className="spin__video"
                      preload="metadata"
                      muted
                      loop
                      playsInline
                    >
                      <source src={m.media.replace(/\.mp4$/i, '.webm')} type="video/webm" />
                      <source src={m.media} type="video/mp4" />
                    </video>
                  ) : (
                    <span className="spin__ph" aria-hidden="true" />
                  )}
                  <div className="spin__shade" aria-hidden="true" />
                  <span className="spin__title">{m.title}</span>
                  {isFocus && (
                    <span className="spin__sub" aria-hidden="true">
                      {m.tag}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {captions && (
        <div className="spin__caption" key={focusIndex}>
          <strong>{slots[focusIndex]?.title}</strong>
          <span>{slots[focusIndex]?.tag}</span>
        </div>
      )}

      <div className="spin__dots" role="tablist" aria-label="选择作品">
        {slots.map((m, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === focusIndex}
            aria-label={m.title}
            className={`spin__dot${i === focusIndex ? ' is-on' : ''}`}
            onClick={() => show(i)}
          />
        ))}
      </div>
    </div>
  )
}
