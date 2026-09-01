import { Link } from 'react-router-dom'
import { useSiteAnimations } from '../animations/useSiteAnimations'
import { comics } from '../data/content'
import ComicsList from './ComicsList'

// 医学可视化插画 / 公众号科普条漫 独立页面
export default function ComicsPage() {
  useSiteAnimations()

  const featured = comics[0]

  return (
    <main className="works-page comics-page">
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
            <Link to="/" className="works-hero__back">
              <span aria-hidden="true">←</span> 返回首页
            </Link>
            <span className="works-hero__eyebrow" data-anim="heading">
              MEDICAL ILLUSTRATION
            </span>
            <h1 className="works-hero__title" data-anim="heading">
              医学可视化插画
            </h1>
            <p className="works-hero__sub" data-reveal>
              公众号科普条漫 · 用画面把复杂的医学知识讲成普通人能看懂的故事。
              <br />
              点击封面查看完整长图。
            </p>
            <div className="works-hero__actions" data-reveal>
              <Link to="/#contact" className="btn btn--solid">
                联系我
              </Link>
              <Link to="/#projects" className="btn btn--ghost">
                返回精选
              </Link>
            </div>
          </div>
        </div>
        <div className="works-hero__glow" aria-hidden="true" />
      </section>

      <ComicsList />
    </main>
  )
}
