import { Link } from 'react-router-dom'
import SpotlightCard from './SpotlightCard'

const spotColor = {
  gold: 'rgba(201, 169, 106, 0.20)',
  blue: 'rgba(86, 122, 168, 0.22)',
  warm: 'rgba(214, 138, 110, 0.20)',
  jade: 'rgba(120, 168, 140, 0.20)',
}

// AI 动画展示：首页为精选（limit 控制数量），整页见 /ai-motion 路由。
// 首页与整页共享同一份 aiMotion 数据，改 content.js 即双向同步。
export default function AiMotion({ items, limit }) {
  const isTeaser = typeof limit === 'number'
  const shown = isTeaser ? items.slice(0, limit) : items

  return (
    <section id="ai-motion" className="section ai-motion">
      <div className="container">
        <div className="section__head" data-anim="heading">
          <span className="section__eyebrow">AI MOTION</span>
          <h2 className="section__title">AI 动画</h2>
        </div>

        <div className="ai-motion__grid" data-anim="stagger">
          {shown.map((m) => (
            <Link
              key={m.title}
              to="/ai-motion"
              className="ai-motion__link"
              aria-label={`查看动画：${m.title}`}
            >
              <SpotlightCard
                className={`ai-motion__card card--${m.card}`}
                spotlightColor={spotColor[m.card] || 'rgba(201, 169, 106, 0.18)'}
              >
                <div className="project__media ai-motion__media" data-anim="reveal">
                  {m.media ? (
                    <video
                      className="ai-motion__video"
                      src={m.media}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <span className="ai-motion__play" aria-hidden="true">
                      ▶
                    </span>
                  )}
                  <span className="project__status">{m.status}</span>
                  {m.year !== '—' && <span className="project__year">{m.year}</span>}
                </div>
                <div className="project__body">
                  <span className="project__tag">{m.tag}</span>
                  <h3 className="project__title">{m.title}</h3>
                  <p className="project__desc">{m.desc}</p>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>

        {isTeaser && (
          <div className="ai-motion__more" data-reveal>
            <Link to="/ai-motion" className="btn btn--ghost">
              查看全部 AI 动画 →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
