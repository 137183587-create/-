import { Link } from 'react-router-dom'
import { useSiteAnimations } from '../animations/useSiteAnimations'
import { aiMotion, comics } from '../data/content'
import AiMotionCarousel from './AiMotionCarousel'
import ComicsList from './ComicsList'

// 医学可视化插画 & AI 动画 聚合页面
export default function MedicalVisualizationPage() {
  useSiteAnimations()

  const featured = comics[0]

  return (
    <main className="works-page medical-visualization-page">
      {/* ---------------- Hero ---------------- */}
      <section className="comics-hero">
        <div className="comics-hero__bg">
          {featured?.cover ? (
            <img
              className="comics-hero__bg-img"
              src={featured.cover}
              alt=""
              loading="eager"
            />
          ) : (
            <img
              className="comics-hero__bg-img"
              src={featured?.images?.[0]}
              alt=""
              loading="eager"
            />
          )}
          <div className="comics-hero__bg-overlay" />
        </div>

        <div className="container comics-hero__inner">
          <div className="comics-hero__text">
            <Link to="/" className="comics-hero__back">
              <span aria-hidden="true">←</span> 返回首页
            </Link>
            <span className="comics-hero__eyebrow" data-anim="heading">
              MEDICAL VISUALIZATION
            </span>
            <h1 className="comics-hero__title" data-anim="heading">
              <span>医学可视化</span>
              <span>插画 & AI 动画</span>
            </h1>
            <p className="comics-hero__sub" data-reveal>
              在企业项目中负责医学类插画与 AI 动画设计。
              <br />
              部分内容受保密限制，仅展示脱敏片段。
            </p>
            <div className="comics-hero__actions" data-reveal>
              <Link to="/#contact" className="hero__btn-magic">
                <span className="bm__corner bm__corner--tl" />
                <span className="bm__corner bm__corner--tr" />
                <span className="bm__corner bm__corner--br" />
                <span className="bm__corner bm__corner--bl" />
                <span className="bm__label">联系我</span>
              </Link>
              <Link to="/#projects" className="hero__btn-magic">
                <span className="bm__corner bm__corner--tl" />
                <span className="bm__corner bm__corner--tr" />
                <span className="bm__corner bm__corner--br" />
                <span className="bm__corner bm__corner--bl" />
                <span className="bm__label">返回精选</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="works-hero__glow" aria-hidden="true" />
      </section>

      {/* ---------------- AI 动画 ---------------- */}
      <section className="medical-section medical-section--motion">
        <div className="container">
          <div className="section__head medical-section__head" data-anim="heading">
            <span className="section__eyebrow">AI MOTION</span>
            <h2 className="section__title">AI 动画</h2>
            <p className="medical-section__desc">
              医学可视化、科普短片、片头动画——滚动鼠标或点击两侧箭头切换，点击播放。
            </p>
          </div>
        </div>
        <AiMotionCarousel items={aiMotion} />
      </section>

      {/* ---------------- 医学插画 ---------------- */}
      <section className="medical-section medical-section--comics">
        <div className="container">
          <div className="section__head medical-section__head" data-anim="heading">
            <span className="section__eyebrow">MEDICAL ILLUSTRATION</span>
            <h2 className="section__title">公众号科普条漫</h2>
            <p className="medical-section__desc">
              用画面把复杂的医学知识讲成普通人能看懂的故事，点击封面查看完整长图。
            </p>
          </div>
        </div>
        <ComicsList />
      </section>
    </main>
  )
}
