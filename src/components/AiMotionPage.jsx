import { Link } from 'react-router-dom'
import { useSiteAnimations } from '../animations/useSiteAnimations'
import { aiMotion } from '../data/content'
import AiMotionCarousel from './AiMotionCarousel'

// AI 动画独立页面：hero + 复用轮播
export default function AiMotionPage() {
  useSiteAnimations()

  return (
    <main className="works-page ai-motion-page">
      {/* ---------------- Hero ---------------- */}
      <section className="works-hero">
        <div className="container works-hero__inner">
          <div className="works-hero__text">
            <Link to="/" className="works-hero__back">
              <span aria-hidden="true">←</span> 返回首页
            </Link>
            <span className="works-hero__eyebrow" data-anim="heading">
              AI MOTION
            </span>
            <h1 className="works-hero__title" data-anim="heading">
              AI 动画
            </h1>
            <p className="works-hero__sub" data-reveal>
              医学可视化、科普短片、片头动画……这里收录我用 AI 做过的动态作品。
              <br />
              滚动鼠标或点击两侧箭头切换，点击播放。
            </p>
            <div className="works-hero__actions" data-reveal>
              <Link to="/#contact" className="btn btn--solid">
                联系我
              </Link>
              <Link to="/#ai-motion" className="btn btn--ghost">
                返回精选
              </Link>
            </div>
          </div>
        </div>
        <div className="works-hero__glow" aria-hidden="true" />
      </section>

      <AiMotionCarousel items={aiMotion} />
    </main>
  )
}
