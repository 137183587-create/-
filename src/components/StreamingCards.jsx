/**
 * StreamingCards —— 流式卡片展示（替代 InfiniteGallery）
 * 官方文档：https://pro.reactbits.dev/docs/components/infinite-gallery
 *
 * 设计要点（与 InfiniteGallery 的关键差异）：
 * 1. **多行错速横向流动**：每行一个方向 + 不同速度，形成「流」而非整体平移。
 *    纯 CSS `@keyframes` + 变量控制时长，每行内容复制一份实现无缝循环。
 * 2. **内容取模循环**：每行按 `startIndex` 顺序取图，取完回到开头继续——
 *    **有规律的无限循环**（不是随机），符合「无限长廊」的诉求。
 * 3. **不劫持页面滚动**：hover 暂停，`pauseOnHover` 可选；页面滚动永远正常。
 * 4. **行整体 hover 加速 + 卡片抬升**：用 CSS 变量控制，避免 JS 逐帧计算。
 * 5. **点击放大**：聚焦层显示大图 + 标题 + 播放按钮（复用 VideoPlayer 的用法）。
 *
 * 性能：动画全部交给 CSS transform（GPU 合成），JS 零逐帧计算、零 setState。
 */
import { useCallback, useMemo, useRef, useState } from 'react'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
/** 确定性伪随机：同一 seed 永远返回同一值（0~1） */
const rand = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export default function StreamingCards({
  images = [],
  rows = 3, // 行数
  perRow = 8, // 每行卡片数（内容循环单元）
  direction = 'auto', // 'left' | 'right' | 'auto'（auto = 逐行交替）
  baseDuration = 46, // 基础循环时长（秒），实际按行错开
  durationStep = 7, // 每行时长递增量（秒），制造速度差
  gap = 22, // 卡片间距（px）
  cardWidth = 268, // 卡片宽
  aspect = 16 / 9, // 卡片高宽比
  tilt = 0, // 卡片静态倾斜角（deg）
  radius = 14, // 卡片圆角
  pauseOnHover = true, // 悬停暂停
  imageRadius = 0, // 缩略图圆角（0 = 直角）
  allowFocusOnClick = true, // 点击放大
  backgroundColor = 'transparent',
  onPlay,
}) {
  const wrapRef = useRef(null)
  const [focusIdx, setFocusIdx] = useState(-1)
  const total = images.length

  /* ---------- 每行的内容：按 startIndex 顺序取图，取模循环 ----------
     用 useMemo 一次性算好，避免渲染时反复计算。
     每行复制 2 份内容（第二份用于无缝衔接），CSS 动画走 -50% 即为循环。 */
  const rowsData = useMemo(() => {
    if (!total) return []
    const h = Math.round(cardWidth / aspect)
    return Array.from({ length: rows }, (_, r) => {
      const seed = r * 137 + 11
      const dir = direction === 'auto' ? (r % 2 === 0 ? 'left' : 'right') : direction
      // 每行起点错开 → 各行内容不重复，观感更丰富
      const startIndex = Math.abs(Math.round(rand(seed) * total)) % total
      const items = Array.from({ length: perRow }, (_, k) => {
        const idx = (startIndex + k) % total
        const item = images[idx]
        // 轻微的缩放与垂直错位 → 有「流」的层次感，但同一张图恒定（不闪跳）
        const scale = 0.88 + rand(seed + k * 7) * 0.26
        const yOff = (rand(seed + k * 13) - 0.5) * 26
        return { ...item, idx, scale, yOff }
      })
      return {
        key: `row-${r}`,
        dir,
        duration: baseDuration + r * durationStep,
        items,
        h,
      }
    })
  }, [images, total, rows, perRow, direction, baseDuration, durationStep, aspect, cardWidth])

  const handleClick = useCallback(
    (idx) => {
      if (!allowFocusOnClick) return
      setFocusIdx((prev) => (prev === idx ? -1 : idx))
    },
    [allowFocusOnClick],
  )

  if (!total) return null

  const focusItem = focusIdx >= 0 ? images[focusIdx] : null
  const h = rowsData[0]?.h ?? 150

  return (
    <div
      ref={wrapRef}
      className={`sc${pauseOnHover ? ' sc--pauseable' : ''}`}
      style={{
        backgroundColor,
        '--sc-gap': `${gap}px`,
        '--sc-w': `${cardWidth}px`,
        '--sc-h': `${h}px`,
        '--sc-radius': `${radius}px`,
        '--sc-tilt': `${tilt}deg`,
        '--sc-img-radius': `${imageRadius}px`,
      }}
      role="region"
      aria-label="AI 动画作品流式展示"
    >
      {rowsData.map((row) => (
        <div
          key={row.key}
          className="sc__row"
          data-dir={row.dir}
          style={{
            '--sc-dur': `${row.duration}s`,
            '--sc-row-h': `${row.h}px`,
          }}
        >
          {/* 渲染两份内容实现无缝循环；aria-hidden 避免读屏重复朗读 */}
          {[0, 1].map((copy) => (
            <div className="sc__track" key={copy} aria-hidden={copy === 1}>
              {row.items.map((it) => (
                <button
                  key={`${copy}-${it.idx}-${it.title}`}
                  type="button"
                  className={`sc__card${focusIdx === it.idx ? ' is-focus' : ''}`}
                  style={{
                    '--sc-item-scale': it.scale,
                    '--sc-item-y': `${it.yOff}px`,
                  }}
                  onClick={() => handleClick(it.idx)}
                  aria-label={it.title || '作品'}
                >
                  <img className="sc__img" src={it.url} alt={it.alt || ''} loading="lazy" />
                  <span className="sc__label" aria-hidden="true">
                    {it.title}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}

      {focusItem && (
        <div className="sc__focus" onClick={() => setFocusIdx(-1)}>
          <img
            className="sc__focus-img"
            src={focusItem.url}
            alt={focusItem.alt || ''}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="sc__focus-bar" onClick={(e) => e.stopPropagation()}>
            <strong>{focusItem.title}</strong>
            <span>{focusItem.subtitle}</span>
            {focusItem.media && (
              <button
                type="button"
                className="sc__focus-play"
                onClick={(e) => {
                  e.stopPropagation()
                  setFocusIdx(-1)
                  if (onPlay) onPlay(focusItem)
                }}
              >
                ▶ 播放视频
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
