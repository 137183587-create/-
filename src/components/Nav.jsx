import { useState, useEffect } from 'react'
import { site } from '../data/content'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 菜单打开时锁定页面滚动，关闭时还原
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#hero" className="nav__logo" onClick={close}>
            <span className="nav__mark">{site.mark}</span>
            <span className="nav__name">{site.name}</span>
          </a>

          <nav className="nav__links">
            {site.nav.map((n) => (
              <a key={n.href} href={n.href} className="nav__link">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a href="#contact" className="btn btn--ghost nav__cta">
              联系
            </a>
            <button
              type="button"
              className={`nav__toggle ${open ? 'is-open' : ''}`}
              aria-label={open ? '关闭菜单' : '打开菜单'}
              aria-expanded={open}
              aria-controls="nav-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* 移动端全屏菜单：独立于 header，避免 nav 的 backdrop-filter 截断 fixed 全屏 */}
      <div
        id="nav-menu"
        className={`nav__menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <nav className="nav__menu-links">
          {site.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="nav__menu-link"
              onClick={close}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="btn btn--solid nav__menu-cta"
          onClick={close}
        >
          联系我
        </a>
      </div>
    </>
  )
}
