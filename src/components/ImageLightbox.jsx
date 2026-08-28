import { useEffect } from 'react'

// 条漫长图查看器：点击封面后弹出，可滚动浏览完整长图
export default function ImageLightbox({ src, alt, isOpen, onClose }) {
  // ESC 关闭
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !src) return null

  return (
    <div className="comic-lightbox" role="dialog" aria-modal="true" aria-label="查看完整条漫">
      <div className="comic-lightbox__backdrop" onClick={onClose} aria-hidden="true" />
      <button
        type="button"
        className="comic-lightbox__close"
        onClick={onClose}
        aria-label="关闭"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="comic-lightbox__scroll">
        <img className="comic-lightbox__img" src={src} alt={alt || '条漫长图'} />
      </div>
    </div>
  )
}
