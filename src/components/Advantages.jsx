import { advantages } from '../data/content'
import MagicBorder from './MagicBorder'

function StarBottleIcon() {
  return (
    <svg viewBox="0 0 120 160" fill="none" aria-hidden="true" className="adv-icon">
      <defs>
        <radialGradient id="sb-glow" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#4facfe" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#2b32b2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0.9" />
        </radialGradient>
        <linearGradient id="sb-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.14)" />
        </linearGradient>
      </defs>
      <path d="M42 42 L42 24 Q42 14 52 14 H68 Q78 14 78 24 V42" stroke="url(#gold-stroke)" strokeWidth="2" fill="none" />
      <rect x="48" y="8" width="24" height="12" rx="3" fill="#d4af6e" />
      <path d="M60 42 C36 42 28 68 28 96 C28 132 42 146 60 146 C78 146 92 132 92 96 C92 68 84 42 60 42 Z" fill="url(#sb-glow)" stroke="url(#gold-stroke)" strokeWidth="2" />
      <path d="M60 42 C36 42 28 68 28 96 C28 132 42 146 60 146 C78 146 92 132 92 96 C92 68 84 42 60 42 Z" fill="url(#sb-glass)" />
      <circle cx="48" cy="88" r="1.6" fill="#a8d8ff" />
      <circle cx="72" cy="76" r="1.2" fill="#a8d8ff" />
      <circle cx="60" cy="112" r="1.8" fill="#f6e6b8" />
      <path d="M56 64 L60 56 L64 64 L60 72 Z" fill="#f6e6b8" opacity="0.85" />
      <path d="M44 118 L48 110 L52 118 L48 126 Z" fill="#a8d8ff" opacity="0.7" />
      <ellipse cx="38" cy="92" rx="5" ry="16" fill="rgba(255,255,255,0.08)" />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 140 140" fill="none" aria-hidden="true" className="adv-icon">
      <defs>
        <radialGradient id="cp-face" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a2542" />
          <stop offset="80%" stopColor="#0d1321" />
          <stop offset="100%" stopColor="#070a10" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="70" r="64" stroke="url(#gold-stroke)" strokeWidth="2.5" fill="url(#cp-face)" />
      <circle cx="70" cy="70" r="56" stroke="rgba(212,175,110,0.35)" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="70" cy="70" r="8" fill="#d4af6e" />
      <path d="M70 18 L74 34 L70 30 L66 34 Z" fill="#f6e6b8" />
      <path d="M70 122 L74 106 L70 110 L66 106 Z" fill="#8a6d35" />
      <path d="M22 70 L38 74 L34 70 L38 66 Z" fill="#8a6d35" />
      <path d="M118 70 L102 74 L106 70 L102 66 Z" fill="#8a6d35" />
      <path d="M70 30 L84 70 L70 110 L56 70 Z" fill="url(#gold-stroke)" opacity="0.18" />
      <path d="M70 30 L84 70 L70 110 L56 70 Z" stroke="#d4af6e" strokeWidth="1.2" fill="none" />
      <circle cx="70" cy="70" r="3" fill="#f6e6b8" />
      <path d="M70 40 V70 L88 88" stroke="#d4af6e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CrystalIcon() {
  return (
    <svg viewBox="0 0 120 140" fill="none" aria-hidden="true" className="adv-icon">
      <defs>
        <linearGradient id="cr-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="cr-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path d="M60 10 L90 50 L80 110 L60 130 L40 110 L30 50 Z" fill="url(#cr-body)" stroke="url(#gold-stroke)" strokeWidth="1.8" />
      <path d="M60 10 L60 50 L30 50" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <path d="M60 50 L90 50 L80 110" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <path d="M60 50 L60 130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <path d="M30 50 L40 110 L60 130" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <path d="M60 10 L40 50 L60 50 Z" fill="url(#cr-light)" />
      <path d="M25 90 L35 70 L42 95 L32 115 Z" fill="#8b5cf6" stroke="url(#gold-stroke)" strokeWidth="1" />
      <path d="M85 85 L95 68 L102 92 L92 112 Z" fill="#7c3aed" stroke="url(#gold-stroke)" strokeWidth="1" />
      <path d="M50 118 L58 98 L66 120 L58 132 Z" fill="#6d28d9" stroke="url(#gold-stroke)" strokeWidth="1" />
      <ellipse cx="60" cy="130" rx="28" ry="6" fill="rgba(124,58,237,0.25)" />
    </svg>
  )
}

function SpellbookIcon() {
  return (
    <svg viewBox="0 0 150 130" fill="none" aria-hidden="true" className="adv-icon">
      <defs>
        <linearGradient id="bk-cover" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2e1a12" />
          <stop offset="100%" stopColor="#1a0f0a" />
        </linearGradient>
        <linearGradient id="bk-page" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f3e7d0" />
          <stop offset="100%" stopColor="#d8c9a8" />
        </linearGradient>
      </defs>
      <path d="M20 20 H70 C85 20 90 30 90 45 V110 C90 120 85 125 75 125 H20 C14 125 10 121 10 115 V30 C10 24 14 20 20 20 Z" fill="url(#bk-cover)" stroke="url(#gold-stroke)" strokeWidth="2" />
      <path d="M90 45 C90 30 95 20 110 20 H135 C141 20 145 24 145 30 V115 C145 121 141 125 135 125 H110 C100 125 90 120 90 110 V45 Z" fill="url(#bk-cover)" stroke="url(#gold-stroke)" strokeWidth="2" />
      <path d="M22 35 H70 C78 35 82 40 82 48 V110 C82 114 78 117 72 117 H22 C18 117 16 114 16 110 V40 C16 36 18 35 22 35 Z" fill="url(#bk-page)" />
      <path d="M128 35 H110 C102 35 98 40 98 48 V110 C98 114 102 117 108 117 H128 C132 117 134 114 134 110 V40 C134 36 132 35 128 35 Z" fill="url(#bk-page)" />
      <path d="M42 55 H62 M42 70 H62 M42 85 H58" stroke="#8a6d35" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M108 55 H124 M108 70 H124 M108 85 H120" stroke="#8a6d35" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M75 12 L120 4 L118 14 L130 16 L85 26 Z" fill="#d4af6e" stroke="#8a6d35" strokeWidth="1" />
      <circle cx="75" cy="19" r="3" fill="#f6e6b8" />
    </svg>
  )
}

function WandIcon() {
  return (
    <svg viewBox="0 0 120 160" fill="none" aria-hidden="true" className="adv-icon">
      <defs>
        <linearGradient id="wd-shaft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5c4033" />
          <stop offset="50%" stopColor="#8b6239" />
          <stop offset="100%" stopColor="#4a3025" />
        </linearGradient>
        <radialGradient id="wd-gem" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
      </defs>
      <path d="M58 44 L62 44 L60 140 L56 150 L52 140 L54 44 Z" fill="url(#wd-shaft)" stroke="#3e271d" strokeWidth="1" />
      <path d="M54 44 L60 44 L62 140 L52 140 Z" fill="rgba(255,255,255,0.08)" />
      <path d="M60 22 L70 34 L64 48 L56 48 L50 34 Z" fill="url(#wd-gem)" stroke="url(#gold-stroke)" strokeWidth="1.8" />
      <path d="M60 22 L65 34 L60 48 L55 34 Z" fill="rgba(255,255,255,0.25)" />
      <circle cx="60" cy="34" r="3" fill="#a8d8ff" />
      <path d="M48 42 C44 38 44 30 48 26" stroke="url(#gold-stroke)" strokeWidth="1.2" fill="none" />
      <path d="M72 42 C76 38 76 30 72 26" stroke="url(#gold-stroke)" strokeWidth="1.2" fill="none" />
      <path d="M60 12 L64 20 L72 20 L66 26 L68 34 L60 30 L52 34 L54 26 L48 20 L56 20 Z" fill="#f6e6b8" opacity="0.9" />
    </svg>
  )
}

const ICONS = {
  'star-bottle': StarBottleIcon,
  compass: CompassIcon,
  crystal: CrystalIcon,
  spellbook: SpellbookIcon,
  wand: WandIcon,
}

export default function Advantages() {
  return (
    <section id="advantages" className="section advantages">
      <svg className="adv-sprite" aria-hidden="true" width="0" height="0">
        <defs>
          <linearGradient id="gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6e6b8" />
            <stop offset="50%" stopColor="#d4af6e" />
            <stop offset="100%" stopColor="#8a6d35" />
          </linearGradient>
        </defs>
      </svg>
      <div className="container advantages__container">
        <div className="advantages__inner">
          <div className="advantages__text" data-anim="heading">
            <span className="advantages__eyebrow">MAGIC · STRENGTHS</span>
            <h2 className="advantages__title">
              魔法·优势<span className="advantages__title-star" aria-hidden="true">✦</span>
            </h2>
            <p className="advantages__lead">每一笔，都是魔法世界的低语。</p>
            <span className="advantages__divider" aria-hidden="true">
              <i className="advantages__divider-dot" />
            </span>
            <div className="advantages__footer">
              <span className="advantages__moon" aria-hidden="true">☽</span>
              <span className="advantages__dots" aria-hidden="true">···</span>
            </div>
          </div>

          <div className="advantages__cards" data-anim="stagger">
            {advantages.map((a, i) => {
              const Icon = ICONS[a.key]
              return (
                <article className={`adv-card adv-card--${i + 1}`} key={a.key}>
                  <MagicBorder overlay />
                  <div className="adv-card__inner">
                    <div className="adv-card__visual">
                      {Icon ? <Icon /> : null}
                    </div>
                    <span className="adv-card__symbol">{a.symbol}</span>
                    <h3 className="adv-card__title">{a.title}</h3>
                    <p className="adv-card__desc">{a.desc}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
