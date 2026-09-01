import MagicBorder from './MagicBorder'

// 我造的 AI 工具 / Skill：卡片网格，含标签 / 状态 / 可选外链
export default function AiTools({ items }) {
  return (
    <section id="ai-tools" className="section ai-tools">
      <div className="container">
        <div className="section__head" data-anim="heading">
          <span className="section__eyebrow">AI TOOLS · SKILLS</span>
          <h2 className="section__title">我造的 AI 工具 / Skill</h2>
        </div>

        <div className="ai-tools__grid" data-anim="stagger">
          {items.map((t) => (
            <article className={`ai-tool card--${t.card}`} key={t.name}>
              <div className="ai-tool__top">
                <span className="ai-tool__chip">{t.tag}</span>
                <span className="ai-tool__status">{t.status}</span>
              </div>
              <h3 className="ai-tool__name">{t.name}</h3>
              <p className="ai-tool__desc">{t.desc}</p>
              {t.link ? (
                <a
                  className="ai-tool__link"
                  href={t.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  打开 →
                </a>
              ) : (
                <span className="ai-tool__link ai-tool__link--muted">
                  内部 / 演示中
                </span>
              )}
              <MagicBorder overlay />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
