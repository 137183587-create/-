import { useEffect, useRef } from 'react'

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v))
}

export default function MagicBackground() {
  const imgRef = useRef(null)
  const state = useRef({ scroll: 0, mouse: 0, target: 50, current: 50 })

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    let raf = 0
    const update = () => {
      const winH = window.innerHeight || 1
      const docH = document.documentElement.scrollHeight || winH
      const maxScroll = Math.max(1, docH - winH)
      const scrollRatio = state.current.scroll / maxScroll

      // 页面滚动贡献 12% 的垂直偏移，鼠标 Y 贡献 ±3%
      const scrollOffset = scrollRatio * 12
      const mouseOffset = state.current.mouse * 3
      state.current.target = 50 + scrollOffset + mouseOffset
      state.current.target = clamp(state.current.target, 38, 62)

      state.current.current += (state.current.target - state.current.current) * 0.06
      img.style.objectPosition = `50% ${state.current.current.toFixed(2)}%`
      raf = requestAnimationFrame(update)
    }

    const onScroll = () => {
      state.current.scroll = window.scrollY || window.pageYOffset || 0
    }
    const onMouseMove = (e) => {
      const h = window.innerHeight || 1
      state.current.mouse = (e.clientY / h - 0.5) * 2 // -1 ~ 1
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    raf = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="magic-bg" aria-hidden="true">
      <img
        ref={imgRef}
        className="magic-bg__img"
        src="/images/backgrounds/magic-sky.jpg"
        alt=""
        loading="eager"
        draggable={false}
      />
      <div className="magic-bg__overlay" />
    </div>
  )
}
