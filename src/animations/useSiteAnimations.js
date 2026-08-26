import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 缓动：丝滑、慢节奏、无廉价弹跳
const EASE = 'power3.out'
const EASE_HERO = 'power4.out'
const EASE_SMOOTH = 'power2.out'

/**
 * 全站动效中枢：
 * - 首屏 opening：幕布揭开 + 标题遮罩/位移/压缩归位 + 导航/副标/底栏依次进场
 * - 滚动进场：大标题 dramatic 揭幕，卡片 stagger，图片 reveal/clip，轻微 parallax
 * 仅在 transform/opacity/clipPath 上做动画，保证性能；尊重 reduced-motion。
 */
export function useSiteAnimations() {
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // 降级（系统开启“减少动态效果”时）：
    // 首屏温和淡入交由 CSS（prefers-reduced-motion 媒体查询）驱动，避免 JS ticker
    // 受限时元素卡在隐藏态导致空白；滚动进场仅做轻淡入，且 immediateRender:false
    // 保证元素初始可见，进入视口才淡入，绝不留下永久隐藏的区块。
    if (prefersReduced) {
      gsap.set('.hero__curtain', { scaleY: 0 })

      const fade = (target, opts = {}) =>
        gsap.from(target, {
          opacity: 0,
          duration: 0.8,
          immediateRender: false,
          scrollTrigger: { trigger: target, start: 'top 92%' },
          ...opts,
        })

      gsap.utils.toArray('[data-anim="heading"]').forEach((el) => {
        const eyebrow = el.querySelector('.section__eyebrow, .contact__eyebrow')
        const title = el.querySelector('.section__title, .contact__title')
        if (eyebrow) fade(eyebrow)
        if (title) fade(title)
      })
      gsap.utils.toArray('[data-anim="stagger"]').forEach((group) => {
        if (!group.children.length) return
        gsap.from(group.children, {
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: group, start: 'top 92%' },
        })
      })
      gsap.utils.toArray('[data-anim="reveal"]').forEach((el) => fade(el))
      gsap.utils.toArray('[data-reveal]:not([data-anim])').forEach((el) => fade(el))
      fade('.about__grid')

      ScrollTrigger.refresh()
      return
    }

    const ctx = gsap.context(() => {
      /* ===================== 首屏 OPENING ===================== */
      const heroTl = gsap.timeline({ defaults: { ease: EASE_HERO } })

      // 1) 幕布从上揭开，露出首屏
      heroTl.fromTo(
        '.hero__curtain',
        { scaleY: 1, transformOrigin: 'top center' },
        { scaleY: 0, duration: 1.15, ease: 'power3.inOut' },
        0,
      )

      // 2) 导航下沉入场
      heroTl.from('.nav', { y: -48, opacity: 0, duration: 1.0 }, 0.25)

      // 3) 眉标淡入
      heroTl.from('.hero__eyebrow', { y: 22, opacity: 0, duration: 0.9 }, 0.55)

      // 4) 标题每行：遮罩内上移 + 压缩(scaleY 0.82)后归位
      heroTl.from(
        '.hero__title-line',
        {
          yPercent: 120,
          scaleY: 0.82,
          transformOrigin: 'bottom center',
          opacity: 0,
          duration: 1.4,
          stagger: 0.14,
          ease: EASE_HERO,
        },
        0.6,
      )

      // 5) 副标题 / 底栏 / 滚动提示依次上浮
      heroTl
        .from('.hero__subtitle', { y: 32, opacity: 0, duration: 1.0 }, 1.0)
        .from('.hero__footer', { y: 46, opacity: 0, duration: 1.1 }, 1.15)
        .from('.hero__scroll', { opacity: 0, y: 10, duration: 0.8 }, 1.5)

      // 首屏视差：下滚时内容/视频轻微错速
      gsap.to('.hero__content', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      if (document.querySelector('.hero__video')) {
        gsap.to('.hero__video', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      /* Hero 整体随滚动进度向上渐隐：作为最上层，下移后显出下层内容，按钮不会被遮挡 */
      gsap.to('.hero', {
        opacity: 0,
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      /* ===================== About 区域缓慢浮现（与 Hero 底边无缝衔接） ===================== */
      gsap.fromTo(
        '.about__grid',
        { y: 52, opacity: 0.22 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about',
            start: 'top 88%',
            end: 'top 42%',
            scrub: 0.6,
          },
        },
      )

      /* ===================== 大标题 dramatic 进场 ===================== */
      const heads = gsap.utils.toArray('[data-anim="heading"]')
      heads.forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
        if (el.matches('.section__title, .contact__title')) {
          tl.from(el, {
            yPercent: 34,
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.25,
            ease: EASE_HERO,
          })
        } else if (el.matches('.section__eyebrow, .contact__eyebrow')) {
          tl.from(el, { y: 26, opacity: 0, duration: 0.9, ease: EASE })
        } else {
          // 容器（.section__head）：眉标 + 标题一起
          const eyebrow = el.querySelector(
            '.section__eyebrow, .contact__eyebrow',
          )
          const title = el.querySelector('.section__title, .contact__title')
          if (eyebrow)
            tl.from(eyebrow, { y: 26, opacity: 0, duration: 0.9 }, 0)
          if (title)
            tl.from(
              title,
              {
                yPercent: 34,
                opacity: 0,
                clipPath: 'inset(0 0 100% 0)',
                duration: 1.25,
                ease: EASE_HERO,
              },
              0.12,
            )
        }
      })

      /* ===================== 卡片 stagger ===================== */
      gsap.utils.toArray('[data-anim="stagger"]').forEach((group) => {
        const items = group.children
        if (!items.length) return
        gsap.from(items, {
          y: 90,
          opacity: 0,
          scale: 0.95,
          duration: 1.15,
          ease: EASE,
          stagger: 0.13,
          scrollTrigger: { trigger: group, start: 'top 82%' },
        })
      })

      /* ===================== 图片 reveal / clip 揭幕 ===================== */
      gsap.utils.toArray('[data-anim="reveal"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)', y: 34, opacity: 0.35 },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            opacity: 1,
            duration: 1.35,
            ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 86%' },
          },
        )
      })

      /* ===================== 通用上浮进场 ===================== */
      gsap.utils.toArray('[data-reveal]:not([data-anim])').forEach((el) => {
        gsap.from(el, {
          y: 42,
          opacity: 0,
          duration: 1.0,
          ease: EASE_SMOOTH,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      /* ===================== 轻微 parallax ===================== */
      gsap.utils.toArray('[data-anim="parallax"]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    })

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    // 资源（字体/图）加载后刷新一次，避免位置计算偏差
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.removeEventListener('load', onLoad)
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [])
}
