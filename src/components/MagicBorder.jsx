export default function MagicBorder({ className = '', overlay = false, children, ...rest }) {
  const decor = (
    <>
      <span className="magic-border__layer" aria-hidden="true" />

      <svg
        className="magic-border__corner magic-border__corner--tl"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="magic-g-tl" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6e6b8" />
            <stop offset="50%" stopColor="#d4af6e" />
            <stop offset="100%" stopColor="#8a6d35" />
          </linearGradient>
        </defs>
        <path d="M2 14 V6 Q2 2 6 2 H14" stroke="url(#magic-g-tl)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M2 2 Q10 2 10 10" stroke="url(#magic-g-tl)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="3.6" cy="3.6" r="1.6" fill="#f3e2b0" stroke="#b8924f" strokeWidth="0.5" />
        <path d="M14 2 Q12 2 11 4" stroke="#d4af6e" strokeWidth="0.8" strokeLinecap="round" />
      </svg>

      <svg
        className="magic-border__corner magic-border__corner--tr"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="magic-g-tr" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6e6b8" />
            <stop offset="50%" stopColor="#d4af6e" />
            <stop offset="100%" stopColor="#8a6d35" />
          </linearGradient>
        </defs>
        <path d="M30 14 V6 Q30 2 26 2 H18" stroke="url(#magic-g-tr)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M30 2 Q22 2 22 10" stroke="url(#magic-g-tr)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="28.4" cy="3.6" r="1.6" fill="#f3e2b0" stroke="#b8924f" strokeWidth="0.5" />
        <path d="M18 2 Q20 2 21 4" stroke="#d4af6e" strokeWidth="0.8" strokeLinecap="round" />
      </svg>

      <svg
        className="magic-border__corner magic-border__corner--br"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="magic-g-br" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6e6b8" />
            <stop offset="50%" stopColor="#d4af6e" />
            <stop offset="100%" stopColor="#8a6d35" />
          </linearGradient>
        </defs>
        <path d="M30 18 V26 Q30 30 26 30 H18" stroke="url(#magic-g-br)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M30 30 Q22 30 22 22" stroke="url(#magic-g-br)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="28.4" cy="28.4" r="1.6" fill="#f3e2b0" stroke="#b8924f" strokeWidth="0.5" />
        <path d="M18 30 Q20 30 21 28" stroke="#d4af6e" strokeWidth="0.8" strokeLinecap="round" />
      </svg>

      <svg
        className="magic-border__corner magic-border__corner--bl"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="magic-g-bl" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6e6b8" />
            <stop offset="50%" stopColor="#d4af6e" />
            <stop offset="100%" stopColor="#8a6d35" />
          </linearGradient>
        </defs>
        <path d="M2 18 V26 Q2 30 6 30 H14" stroke="url(#magic-g-bl)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M2 30 Q10 30 10 22" stroke="url(#magic-g-bl)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="3.6" cy="28.4" r="1.6" fill="#f3e2b0" stroke="#b8924f" strokeWidth="0.5" />
        <path d="M14 30 Q12 30 11 28" stroke="#d4af6e" strokeWidth="0.8" strokeLinecap="round" />
      </svg>

      <svg
        className="magic-border__ornament magic-border__ornament--top"
        viewBox="0 0 56 18"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="magic-mid-g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a6d35" />
            <stop offset="50%" stopColor="#f6e6b8" />
            <stop offset="100%" stopColor="#8a6d35" />
          </linearGradient>
        </defs>
        <path d="M0 9 H13 M43 9 H56" stroke="url(#magic-mid-g)" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M28 4 L33 9 L28 14 L23 9 Z" stroke="#d4af6e" strokeWidth="0.9" strokeLinejoin="round" />
        <circle cx="28" cy="9" r="1.4" fill="#f3e2b0" />
        <path d="M13 9 Q17 5 19 9 Q17 13 13 9" stroke="#b8924f" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M43 9 Q39 5 37 9 Q39 13 43 9" stroke="#b8924f" strokeWidth="0.7" strokeLinecap="round" />
      </svg>

      <svg
        className="magic-border__ornament magic-border__ornament--bottom"
        viewBox="0 0 56 18"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="magic-mid-g-b" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a6d35" />
            <stop offset="50%" stopColor="#f6e6b8" />
            <stop offset="100%" stopColor="#8a6d35" />
          </linearGradient>
        </defs>
        <path d="M0 9 H13 M43 9 H56" stroke="url(#magic-mid-g-b)" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M28 4 L33 9 L28 14 L23 9 Z" stroke="#d4af6e" strokeWidth="0.9" strokeLinejoin="round" />
        <circle cx="28" cy="9" r="1.4" fill="#f3e2b0" />
        <path d="M13 9 Q17 5 19 9 Q17 13 13 9" stroke="#b8924f" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M43 9 Q39 5 37 9 Q39 13 43 9" stroke="#b8924f" strokeWidth="0.7" strokeLinecap="round" />
      </svg>
    </>
  )

  if (!overlay) {
    return (
      <div className={`magic-border ${className}`} {...rest}>
        {children}
        {decor}
      </div>
    )
  }

  return (
    <div className={`magic-border magic-border--overlay ${className}`} {...rest}>
      {decor}
    </div>
  )
}
