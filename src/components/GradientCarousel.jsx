/**
 * GradientCarousel —— 复刻 React Bits Pro「Gradient Carousel」
 * 3D 环视轮播：从每张卡提取主色，染出对应的动态渐变背景。
 * 官方文档：https://pro.reactbits.dev/docs/components/gradient-carousel
 *
 * 与官方版对齐：卡片沿弧线排布，偏移决定旋转/深度/缩放；滚轮与拖拽都能推动轮播，
 * 带速度与摩擦衰减；背景随聚焦卡渐变；支持键盘切换。
 * 差异：官方运行时从图片提取主色，本站构建期用 sharp 预提取好写在 content.js 的 tint，
 * 运行时零采样开销，效果一致。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
const lerp = (a, b, t) => a + (b - a) * t

export default function GradientCarousel({
  images = [],
  className = '',
  maxRotationDegrees = 28,
  maxDepthPx = 140,
  minScale = 0.92,
  cardGap = 28,
  frictionFactor = 0.9,
  wheelSensitivity = 0.6,
  dragSensitivity = 1.0,
  backgroundBlur = 24,
  gradientSize = 0.65,
  gradientIntensity = 0.7,
  enableKeyboard = true,
  cardAspectRatio = 0.8, // 4/5 竖版
  initialIndex = 0,
  onCardChange,
  tints = [],
  renderOverlay,
}) {
  const count = images.length
  const wrapRef = useRef(null)
  const [offset, setOffset] = useState(clamp(initialIndex, 0, Math.max(0, count - 1)))
  const offsetRef = useRef(offset)
  const velRef = useRef(0)
  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const startOffsetRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTRef = useRef(0)
  const rafRef = useRef(0)
  const targetRef = useRef(clamp(initialIndex, 0, Math.max(0, count - 1)))
  const followRafRef = useRef(0)

  useEffect(() => { offsetRef.current = offset }, [offset])

  /* ---------- 平滑追随：渲染值 offset 每帧缓动逼近目标 targetRef ---------- */
  useEffect(() => {
    const step = () => {
      const cur = offsetRef.current
      const tgt = targetRef.current
      const diff = tgt - cur
      if (Math.abs(diff) < 0.0004) {
        offsetRef.current = tgt
        setOffset(tgt)
        followRafRef.current = requestAnimationFrame(step)
        return
      }
      // 指数缓动逼近，ease 越小越慢越柔（0.09 ≈ 顺滑跟手但不飘）
      const next = cur + diff * 0.09
      offsetRef.current = next
      setOffset(next)
      followRafRef.current = requestAnimationFrame(step)
    }
    followRafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(followRafRef.current)
  }, [])

  // 聚焦索引：连续偏移取整并环绕
  const activeIndex = useMemo(() => {
    if (!count) return 0
    const n = Math.round(offset)
    return ((n % count) + count) % count
  }, [offset, count])

  useEffect(() => {
    if (onCardChange) onCardChange(activeIndex)
  }, [activeIndex, onCardChange])

  const goTo = useCallback((i) => {
    const t = count ? clamp(i, 0, count - 1) : 0
    targetRef.current = t
    offsetRef.current = t
    setOffset(t)
    velRef.current = 0
  }, [count])

  /* ---------- 键盘切换 ---------- */
  useEffect(() => {
    if (!enableKeyboard) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1)
      if (e.key === 'ArrowRight') goTo(activeIndex + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enableKeyboard, activeIndex, goTo])

  /* ---------- 滚轮：推动目标值（渲染值由上面的缓动循环平滑追随） ---------- */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      // 单次事件限幅：避免触控板/鼠标大 delta 一次跳太远
      const raw = (e.deltaY + e.deltaX) * wheelSensitivity * 0.012
      const delta = clamp(raw, -0.34, 0.34)
      targetRef.current += delta
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [wheelSensitivity])

  /* ---------- 拖拽 + 惯性（frictionFactor）---------- */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onDown = (e) => {
      draggingRef.current = true
      startXRef.current = e.clientX
      startOffsetRef.current = targetRef.current
      lastXRef.current = e.clientX
      lastTRef.current = performance.now()
      velRef.current = 0
      cancelAnimationFrame(rafRef.current)
      el.setPointerCapture?.(e.pointerId)
    }
    const onMove = (e) => {
      if (!draggingRef.current) return
      const w = el.offsetWidth || 1
      const next = startOffsetRef.current - ((e.clientX - startXRef.current) / w) * dragSensitivity * 2.2
      targetRef.current = next
      // 记录瞬时速度（用于松手后的惯性）
      const now = performance.now()
      const dt = Math.max(1, now - lastTRef.current)
      const step = -((e.clientX - lastXRef.current) / w) * dragSensitivity * 2.2
      velRef.current = step * (1000 / dt)
      lastXRef.current = e.clientX
      lastTRef.current = now
    }
    const onUp = (e) => {
      if (!draggingRef.current) return
      draggingRef.current = false
      try { el.releasePointerCapture?.(e.pointerId) } catch { /* ignore */ }
      // 惯性：速度按摩擦衰减推动目标值，渲染值再由缓动循环平滑追上
      const glide = () => {
        velRef.current *= frictionFactor
        if (Math.abs(velRef.current) < 0.0006) {
          targetRef.current = Math.round(targetRef.current)
          return
        }
        targetRef.current += velRef.current
        rafRef.current = requestAnimationFrame(glide)
      }
      rafRef.current = requestAnimationFrame(glide)
    }
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [dragSensitivity, frictionFactor])

  // 循环距离：把 i - offset 折到 [-count/2, count/2]，实现首尾相接
  const relPos = (i) => {
    if (!count) return 0
    let d = i - offset
    const wrapped = (((d % count) + count * 1.5) % count) - count * 0.5
    return wrapped
  }

  const tintOf = (i, idx) => (tints[i] && tints[i][idx]) || 'hsl(260 32% 26%)'

  return (
    <div className={`gcar ${className}`} ref={wrapRef}>
      {/* 背景染色渐变：跟随聚焦卡平滑过渡 */}
      <div
        className="gcar__bg"
        style={{
          '--g-from': tintOf(activeIndex, 0),
          '--g-to': tintOf(activeIndex, 1),
          '--g-blur': `${backgroundBlur}px`,
          '--g-size': `${Math.round(gradientSize * 100)}%`,
          '--g-intensity': gradientIntensity,
        }}
        aria-hidden="true"
      />

      <div className="gcar__stage">
        {images.map((src, i) => {
          const d = relPos(i)
          const absD = Math.abs(d)
          if (absD > 3.2) return null

          const rotY = -d * maxRotationDegrees * 0.55
          const z = -absD * maxDepthPx * 0.5
          const scale = lerp(1, minScale, Math.min(1, absD / 2))
          const x = d * (cardGap + 150)
          const opacity = clamp(1.15 - absD * 0.26, 0, 1)
          const zIndex = 100 - Math.round(absD * 10)
          const isActive = absD < 0.5

          return (
            <div
              key={src + i}
              className="gcar__item"
              style={{
                transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
              onClick={() => goTo(i)}
            >
              <div className="gcar__card" style={{ aspectRatio: String(cardAspectRatio) }}>
                <img className="gcar__img" src={src} alt="" draggable={false} loading="lazy" />
                {renderOverlay && renderOverlay(i, isActive)}
              </div>
            </div>
          )
        })}
      </div>

      <div className="gcar__dots" role="tablist" aria-label="卡片指示器">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`第 ${i + 1} 张`}
            className={`gcar__dot${i === activeIndex ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}