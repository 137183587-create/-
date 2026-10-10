import { useEffect, useRef, useState } from 'react'

// 懒加载视频：仅当进入视口附近时才挂载并播放，
// 避免一打开页面就并发下载 /ai-motion 下大量视频，保证首屏快速加载。
// 自动为 mp4 源派生同名的 .webm（VP9+Opus）作为优先源，Safari / 弹窗回退 mp4。
export default function LazyVideo({ src, poster, className, loop = true }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // 占位阶段：仅显示 poster，不发起任何下载
  if (!inView) {
    return (
      <video
        ref={ref}
        className={className}
        poster={poster}
        preload="none"
        muted
        loop={loop}
        playsInline
      />
    )
  }

  // 进入视口：挂载带 source 的 video，浏览器按序选择 webm 优先
  const webm = src ? src.replace(/\.mp4$/i, '.webm') : null
  return (
    <video
      key="loaded"
      className={className}
      poster={poster}
      preload="none"
      muted
      loop={loop}
      autoPlay
      playsInline
    >
      {webm && <source src={webm} type="video/webm" />}
      {src && <source src={src} type="video/mp4" />}
    </video>
  )
}
