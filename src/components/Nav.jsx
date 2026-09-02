import { useState, useEffect } from 'react'
import { site } from '../data/content'
import BubbleMenu from './BubbleMenu'

// 顶部导航的主色调：暗玻璃 + 金色
const BUBBLE_BG = 'rgba(10, 11, 14, 0.82)'
const BUBBLE_COLOR = '#f6e6b8'

// 为每个菜单项生成 hover 配色（金色渐变 + 单点彩色点缀）
const hoverPalette = [
  { bgColor: '#d4af6e', textColor: '#0a0b0e' }, // 金
  { bgColor: '#e4c893', textColor: '#0a0b0e' }, // 浅金
  { bgColor: '#b89456', textColor: '#ffffff' }, // 古铜
  { bgColor: '#d4af6e', textColor: '#0a0b0e' },
  { bgColor: '#e4c893', textColor: '#0a0b0e' },
  { bgColor: '#b89456', textColor: '#ffffff' },
  { bgColor: '#d4af6e', textColor: '#0a0b0e' },
  { bgColor: '#e4c893', textColor: '#0a0b0e' }
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 菜单展开时锁定页面滚动
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // 将 site.nav 映射成 BubbleMenu 的 items
  const items = site.nav.map((n, i) => ({
    label: n.label,
    href: `/${n.href}`,
    ariaLabel: n.label,
    rotation: i % 2 === 0 ? -4 : 4,
    hoverStyles: hoverPalette[i % hoverPalette.length]
  }))

  const logo = (
    <>
      <span className="bubble-menu__mark">{site.mark}</span>
      <span className="bubble-menu__name">{site.name}</span>
    </>
  )

  return (
    <>
      {/* 气泡冒出时同步出现的背景模糊遮罩：点击空白处可关闭菜单 */}
      <div
        className={`nav__scrim ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <BubbleMenu
        open={menuOpen}
        logo={logo}
        items={items}
        onMenuClick={setMenuOpen}
        menuAriaLabel={menuOpen ? '关闭菜单' : '打开菜单'}
        menuBg={BUBBLE_BG}
        menuContentColor={BUBBLE_COLOR}
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.55}
        staggerDelay={0.09}
        className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}
        style={{ top: 18 }}
      />
    </>
  )
}