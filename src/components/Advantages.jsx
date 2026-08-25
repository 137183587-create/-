import { advantages } from '../data/content'

export default function Advantages() {
  return (
    <section id="advantages" className="section advantages">
      <div className="container">
        <div className="section__head" data-anim="heading">
          <span className="section__eyebrow">STRENGTHS</span>
          <h2 className="section__title">个人优势</h2>
        </div>

        <div className="advantages__grid" data-anim="stagger">
          {advantages.map((a, i) => (
            <article className="adv" key={a.title}>
              <span className="adv__no">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="adv__title">{a.title}</h3>
              <p className="adv__desc">{a.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
