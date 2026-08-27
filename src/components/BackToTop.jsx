import { useState, useEffect } from 'react'

/** 悬浮回到顶部：滚动超过阈值后淡入，点击平滑回顶；尺寸小巧、暗金风格。 */
export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  return (
    <button
      type="button"
      className={`back-to-top ${show ? 'is-visible' : ''}`}
      aria-label="回到顶部"
      onClick={toTop}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V6" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
