import { useState, useEffect } from 'react'
import { site } from '../data/content'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#hero" className="nav__logo">
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
        <a href="#contact" className="btn btn--ghost nav__cta">
          联系
        </a>
      </div>
    </header>
  )
}
