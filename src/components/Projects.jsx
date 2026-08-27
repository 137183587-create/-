import { Link } from 'react-router-dom'
import { projects } from '../data/content'
import SpotlightCard from './SpotlightCard'

const spotColor = {
  gold: 'rgba(201, 169, 106, 0.20)',
  blue: 'rgba(86, 122, 168, 0.22)',
  warm: 'rgba(214, 138, 110, 0.20)',
  jade: 'rgba(120, 168, 140, 0.20)',
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section__head" data-anim="heading">
          <span className="section__eyebrow">SELECTED WORK</span>
          <h2 className="section__title">精选项目</h2>
        </div>

        <div className="projects__grid" data-anim="stagger">
          {projects.map((p) => (
            <Link
              key={p.title}
              to="/works"
              className="project-link"
              aria-label={`查看作品：${p.title}`}
            >
              <SpotlightCard
                className={`project ${p.featured ? 'project--featured' : ''} card--${p.card}`}
                spotlightColor={spotColor[p.card] || 'rgba(201, 169, 106, 0.18)'}
              >
                <div className="project__media" data-anim="reveal">
                  <span className="project__status">{p.status}</span>
                  {p.year !== '—' && <span className="project__year">{p.year}</span>}
                </div>
                <div className="project__body">
                  <span className="project__tag">{p.tag}</span>
                  <h3 className="project__title">{p.title}</h3>
                  <p className="project__desc">{p.desc}</p>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>

        <div className="projects__more" data-reveal>
          <Link to="/works" className="btn btn--ghost">
            查看全部作品 →
          </Link>
        </div>
      </div>
    </section>
  )
}
