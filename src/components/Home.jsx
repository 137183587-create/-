import { useSiteAnimations } from '../animations/useSiteAnimations'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import AiMotion from './AiMotion'
import AiTools from './AiTools'
import Advantages from './Advantages'
import Contact from './Contact'
import { aiMotion, aiTools } from '../data/content'

// 首页 AI 动画精选的展示层替换：把 PICC 槽位换成「多重用药」卡片。
// 仅影响首页展示，不改动全量 aiMotion 数据——医学可视化聚合页仍保留 PICC。
const HOME_SWAP_MEDIA = '/ai-motion/PICC.mp4'
const POLY_MEDIA = '/ai-motion/AI老年人多重用药3min（开头）.mp4'
const homeAiMotion = (() => {
  const poly = aiMotion.find((m) => m.media === POLY_MEDIA)
  if (!poly) return aiMotion
  return aiMotion.map((m) => (m.media === HOME_SWAP_MEDIA ? poly : m))
})()

export default function Home() {
  useSiteAnimations()
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <AiMotion items={homeAiMotion} limit={5} />
      <AiTools items={aiTools} />
      <Advantages />
      <Contact />
    </main>
  )
}
