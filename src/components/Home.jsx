import { useSiteAnimations } from '../animations/useSiteAnimations'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import AiMotion from './AiMotion'
import AiTools from './AiTools'
import Advantages from './Advantages'
import Contact from './Contact'
import { aiMotion, aiTools } from '../data/content'

export default function Home() {
  useSiteAnimations()
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <AiMotion items={aiMotion} limit={4} />
      <AiTools items={aiTools} />
      <Advantages />
      <Contact />
    </main>
  )
}
