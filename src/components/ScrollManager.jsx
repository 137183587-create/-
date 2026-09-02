import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 路由滚动管理：
 * - 带 hash（如 /#about）时，平滑滚动到对应板块
 * - 纯路由切换（如 / → /works）时回到顶部
 * 放在 Router 内部，监听 pathname / hash 变化。
 *
 * 重试机制：目标页面首次挂载时，锚点元素可能尚未渲染（子组件异步初始化、
 * 图片/视频懒加载）。找不到元素时会在 5 秒内重试，且首次命中后再延时一次，
 * 等轮播/图片布局稳定后重新对齐。
 */
const NAV_HEIGHT = 90
const MAX_ATTEMPTS = 50
const RETRY_DELAY = 100
const STABILIZE_DELAY = 320

export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 })
      return
    }

    const targetId = hash.slice(1)
    let attempts = 0
    let timer = null
    let stabilizeTimer = null

    const scrollToEl = (el, behavior = 'smooth') => {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
      window.scrollTo({ top, left: 0, behavior })
    }

    const tryScroll = () => {
      const el = document.getElementById(targetId)
      if (!el) {
        if (++attempts < MAX_ATTEMPTS) {
          timer = setTimeout(tryScroll, RETRY_DELAY)
        } else {
          window.scrollTo({ top: 0, left: 0 })
        }
        return
      }

      // 首次命中即滚动，避免用户长时间等待
      scrollToEl(el)

      // 延迟再对齐一次，等轮播/图片 lazy load 布局稳定
      stabilizeTimer = setTimeout(() => {
        const stableEl = document.getElementById(targetId)
        if (stableEl) scrollToEl(stableEl, 'smooth')
      }, STABILIZE_DELAY)
    }

    // 用 rAF 确保在 React 首次 paint 之后开始查找
    const rafId = requestAnimationFrame(tryScroll)

    return () => {
      cancelAnimationFrame(rafId)
      if (timer) clearTimeout(timer)
      if (stabilizeTimer) clearTimeout(stabilizeTimer)
    }
  }, [pathname, hash])

  return null
}
