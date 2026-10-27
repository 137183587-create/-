import { useSiteAnimations } from '../animations/useSiteAnimations'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import AiMotion from './AiMotion'
import AiTools from './AiTools'
import ComicsFeatured from './ComicsFeatured'
import ScienceComics from './ScienceComics'
import Advantages from './Advantages'
import Contact from './Contact'
import { aiMotion, aiTools, comics, popularScienceComics } from '../data/content'

// 首页 AI 动画精选的展示层替换：把 PICC 槽位换成「多重用药」卡片。
// 仅影响首页展示，不改动全量 aiMotion 数据——医学可视化聚合页仍保留 PICC。
const HOME_SWAP_MEDIA = '/ai-motion/PICC.mp4'
const POLY_MEDIA = '/ai-motion/AI老年人多重用药3min（开头）.mp4'
const homeAiMotion = (() => {
  const poly = aiMotion.find((m) => m.media === POLY_MEDIA)
  if (!poly) return aiMotion
  return aiMotion.map((m) => (m.media === HOME_SWAP_MEDIA ? poly : m))
})()

// 首页「精选长图案例」：comics 中标记 featured 的精选子集
const featuredComics = comics.filter((c) => c.featured)

// 首页「公众号科普长图精选」：popularScienceComics 中标记 featured 的精选子集
const featuredScience = popularScienceComics.filter((c) => c.featured)

export default function Home() {
  useSiteAnimations()
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <AiMotion items={homeAiMotion} limit={5} />
      <ComicsFeatured items={featuredComics} />
      <ScienceComics
        items={featuredScience}
        id="science-featured"
        title="公众号科普长图精选"
        desc="公众号渠道的医学科普长图——检查、筛查与康复要点，一张图读完。"
        more={{ to: '/medical-visualization#science-comics', label: '查看全部科普长图 →' }}
      />
      <AiTools items={aiTools} />
      <Advantages />
      <Contact />
    </main>
  )
}
