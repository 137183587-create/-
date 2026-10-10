import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GradientCarousel from './GradientCarousel'
import { advantages } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Advantages() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  /* ---------- 整块入场 + 滚出淡出（可逆重播） ---------- */
  useEffect(() => {
    const el = sectionRef.current
    if (!el || reducedMotion()) return

    const ctx = gsap.context(() => {
      // 入场：从下方上浮进场；不设 clearProps，reverse 才能还原并重播
      gsap.from('.gcar', {
        y: 90,
        opacity: 0,
        duration: 1.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // 滚出：scrub 连续可逆的退场视差
      gsap.to('.gcar', {
        yPercent: -10,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '#advantages',
          start: 'bottom 62%',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const images = advantages.map((a) => a.image).filter(Boolean)
  const tints = advantages.map((a) => a.tint)

  // 每张卡的叠加内容：卡名（叠在卡图自带标签条上）+ 聚焦时才显示描述
  const renderOverlay = (i, isActive) => {
    const a = advantages[i]
    if (!a) return null
    return (
      <>
        <span className="gcar__name" style={{ '--nb': a.nameBottom }}>
          {a.title}
        </span>
        {isActive && (
          <div className="gcar__info">
            <span className="gcar__sym">{a.symbol}</span>
            <p>{a.desc}</p>
          </div>
        )}
      </>
    )
  }

  return (
    <section id="advantages" className="section advantages" ref={sectionRef}>
      <div className="advantages__bg" aria-hidden="true" />

      <div className="advantages__inner container">
        <div className="advantages__text" data-anim="heading">
          <span className="advantages__eyebrow">MAGIC · STRENGTHS</span>
          <h2 className="advantages__title">
            魔法·优势<span className="advantages__title-star" aria-hidden="true">✦</span>
          </h2>
          <p className="advantages__lead">
            不只会用 AI，还会亲手把想法做成能运行的东西。
            <br />
            每一张卡，都是一段走过来的路。
          </p>
          <span className="advantages__divider" aria-hidden="true">
            <i className="advantages__divider-dot" />
          </span>
          <div className="advantages__footer">
            <span className="advantages__moon" aria-hidden="true">☽</span>
            <span className="advantages__dots" aria-hidden="true">···</span>
          </div>
          <span className="advantages__hint">滚轮 / 拖拽环视 · ← → 切换</span>
        </div>

        <div className="advantages__carousel">
          <GradientCarousel
            images={images}
            tints={tints}
            renderOverlay={renderOverlay}
            onCardChange={setActiveIndex}
            /* 参数取官网默认值，再按本站暗色魔法风微调：
               旋转/深度略收敛、渐变更柔、卡比例改 0.72 竖版更贴卡牌原图 */
            maxRotationDegrees={26}
            maxDepthPx={150}
            minScale={0.86}
            cardGap={18}
            frictionFactor={0.9}
            wheelSensitivity={0.7}
            dragSensitivity={1.0}
            backgroundBlur={40}
            gradientSize={0.7}
            gradientIntensity={0.55}
            enableKeyboard
            cardAspectRatio={0.72}
            initialIndex={0}
          />
        </div>
      </div>
    </section>
  )
}