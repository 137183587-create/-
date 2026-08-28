import { useEffect, useRef, useState } from 'react'

function formatTime(t) {
  if (!Number.isFinite(t) || Number.isNaN(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

// 自定义视频播放器弹窗：播放/暂停、进度拖拽、音量、全屏、关闭
export default function VideoPlayer({ src, title, isOpen, onClose }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const progressRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // 打开/关闭时控制播放；切换视频时自动播放新视频
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isOpen) {
      video.volume = volume
      const play = () => video.play().catch(() => {})
      // 等视频元数据加载后再播更稳
      if (video.readyState >= 2) play()
      else video.addEventListener('loadeddata', play, { once: true })
    } else {
      video.pause()
      video.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [isOpen, src])

  // 键盘：ESC 关闭，空格播放/暂停（不在 range 上时）
  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === ' ' && e.target.tagName !== 'INPUT') {
        e.preventDefault()
        togglePlay()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  // 监听全屏状态变化
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    if (!video) return
    const value = parseFloat(e.target.value)
    video.currentTime = value
    setCurrentTime(value)
  }

  const handleVolume = (e) => {
    const video = videoRef.current
    if (!video) return
    const value = parseFloat(e.target.value)
    video.volume = value
    setVolume(value)
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) container.requestFullscreen().catch(() => {})
    else document.exitFullscreen().catch(() => {})
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  if (!isOpen) return null

  return (
    <div className="video-player" ref={containerRef}>
      <div className="video-player__backdrop" onClick={onClose} />

      <button
        type="button"
        className="video-player__close"
        onClick={onClose}
        aria-label="关闭播放器"
      >
        ×
      </button>

      <div className="video-player__container">
        {title && <div className="video-player__title">{title}</div>}

        <video
          ref={videoRef}
          className="video-player__video"
          src={src}
          playsInline
          onTimeUpdate={(e) => {
            if (!isDragging) setCurrentTime(e.currentTarget.currentTime)
          }}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onDurationChange={(e) => setDuration(e.currentTarget.duration || 0)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
        />

        <div className="video-player__controls">
          <button
            type="button"
            className="video-player__btn video-player__btn--play"
            onClick={togglePlay}
            aria-label={isPlaying ? '暂停' : '播放'}
          >
            {isPlaying ? (
              <span style={{ letterSpacing: '2px', fontWeight: 700 }}>||</span>
            ) : (
              '▶'
            )}
          </button>

          <span className="video-player__time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <input
            ref={progressRef}
            type="range"
            className="video-player__progress"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onChange={handleSeek}
            style={{ '--progress': `${progressPercent}%` }}
            aria-label="进度条"
          />

          <div className="video-player__volume">
            <svg
              className="video-player__volume-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              {volume === 0 ? (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
              ) : volume < 0.5 ? (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              )}
            </svg>
            <input
              type="range"
              className="video-player__volume-slider"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={handleVolume}
              aria-label="音量"
            />
          </div>

          <button
            type="button"
            className="video-player__btn video-player__btn--fs"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? '退出全屏' : '全屏'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {isFullscreen ? (
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              ) : (
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
