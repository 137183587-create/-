import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 路由滚动管理：
 * - 带 hash（如 /#about）时，平滑滚动到对应板块
 * - 纯路由切换（如 / → /works）时回到顶部
 * 放在 Router 内部，监听 pathname / hash 变化。
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        const id = requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        })
        return () => cancelAnimationFrame(id)
      }
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return null
}
