/**
 * MasonryCards —— 两列瀑布流卡片（按参考图实现）
 *
 * 设计要点：
 * 1. **真 masonry 布局**：用 CSS `columns: 2` + `break-inside: avoid`，
 *    浏览器自动把卡片分配到较矮的一列，形成错落堆叠效果。
 *    比 flex/grid 手动算高度简单得多，且天然响应式（窄屏自动变单列）。
 * 2. **完整显示视频**：前景图用 object-fit contain（绝不裁切），
 *    卡片比例在图片 onLoad 后按**视频真实宽高比**修正 → contain 时零浪费。
 *    比例相同时瀑布流靠「偶数项极小纵向偏移」保持错落节奏（避免太规整）。
 * 3. **进场动效**：复用GSAP `data-reveal` 上浮进场（走useSiteAnimations 的 REPLAY 约定）。
 * 4. **点击放大**：聚焦层显示大图 + 标题 + 播放按钮，与流式版一致。
 * 5. **完全不劫持滚动**：纯静态布局，页面滚动永远正常。
 *
 * 性能：静态 DOM，无逐帧计算、无 setState。
 */
import { useCallback, useMemo, useState } from 'react'

/** 默认比例兜底；图片 onLoad 后按**视频真实宽高比**修正 → contain 显示时零浪费 */
const DEFAULT_ASPECT = 16 / 9

export default function MasonryCards({
  images = [],
  columns = 2, // 列数（CSS columns；≤1 时退化为单列）
  gap = 18, // 卡片间距（px）
  radius = 14, // 卡片圆角
  showLabel = true, // 是否显示底部标题条
  allowFocusOnClick = true, // 点击放大
  className = '',
  onPlay,
}) {
  const [focusIdx, setFocusIdx] = useState(-1)

  const total = images.length

  /* 每张卡的展示比例：按索引循环取ASPECTS，保证稳定不闪跳 */
  const items = useMemo(
    () =>
      images.map((item, i) => ({
        ...item,
        aspect: DEFAULT_ASPECT,
        key: `${item.url || item.title}-${i}`,
      })),
    [images],
  )

  const handleClick = useCallback(
    (idx) => {
      if (!allowFocusOnClick) return
      setFocusIdx((prev) => (prev === idx ? -1 : idx))
    },
    [allowFocusOnClick],
  )

  if (!total) return null

  const focusItem = focusIdx >= 0 ? images[focusIdx] : null

  return (
    <div
      className={`ms ${className}`}
      style={{
        '--ms-cols': columns,
        '--ms-gap': `${gap}px`,
        '--ms-radius': `${radius}px`,
      }}
      role="list"
      aria-label="AI 动画作品瀑布流"
    >
      {items.map((it, i) => (
        <figure
          key={it.key}
          className={`ms__item${focusIdx === i ? ' is-focus' : ''}${i % 2 ? ' ms__item--alt' : ''}`}
          data-reveal
          role="listitem"
        >
          <button
            type="button"
            className="ms__card"
            style={{ '--ms-aspect': it.aspect }}
            onClick={() => handleClick(i)}
            aria-label={it.title || '作品'}
          >
            {/* 背景层：同图放大虚化，填充 contain 留下的空档（避免黑边突兀） */}
            <img className="ms__img--bg" src={it.url} alt="" aria-hidden="true" />
            {/* 前景层：contain 完整显示视频画面，绝不裁切 */}
            <img
              className="ms__img--fg"
              src={it.url}
              alt={it.alt || ''}
              loading="lazy"
              onLoad={(e) => {
                // 读到视频真实宽高比 → 卡片按真实比例自适应，竖屏也不会被裁
                const img = e.currentTarget
                if (img.naturalWidth && img.naturalHeight) {
                  const r = img.naturalWidth / img.naturalHeight
                  it.aspect = r
                  e.currentTarget.parentElement?.style.setProperty('--ms-aspect', String(r))
                }
              }}
            />
            {/* 参考图里卡片右下角的「···」标记 */}
            <span className="ms__dots" aria-hidden="true">
              ···
            </span>
            {showLabel && it.title && <span className="ms__label">{it.title}</span>}
          </button>
        </figure>
      ))}

      {focusItem && (
        <div className="ms__focus" onClick={() => setFocusIdx(-1)}>
          <div className="ms__focus-stage" onClick={(e) => e.stopPropagation()}>
            {focusItem.media ? (
              /* 就地播放：视频元素直接放在聚焦层里，不跳弹窗。
                 双源 webm 在前 / mp4 兜底 Safari；**不写 src 属性**，否则会覆盖 source 列表。 */
              <video
                key={focusItem.media}
                className="ms__focus-video"
                autoPlay
                playsInline
                controls
                preload="metadata"
                poster={focusItem.url}
                onClick={(e) => e.stopPropagation()}
              >
                {/\.mp4$/i.test(focusItem.media) && (
                  <>
                    <source
                      src={focusItem.media.replace(/\.mp4$/i, '.webm')}
                      type="video/webm"
                    />
                    <source src={focusItem.media} type="video/mp4" />
                  </>
                )}
                {!/\.mp4$/i.test(focusItem.media) && <source src={focusItem.media} />}
              </video>
            ) : (
              <img
                className="ms__focus-img"
                src={focusItem.url}
                alt={focusItem.alt || ''}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>

          <div className="ms__focus-bar" onClick={(e) => e.stopPropagation()}>
            <strong>{focusItem.title}</strong>
            <span>{focusItem.subtitle}</span>
            {/* 仅提示，不再跳转弹窗 */}
            <p className="ms__focus-tip">点击空白处关闭</p>
          </div>
        </div>
      )}
    </div>
  )
}
