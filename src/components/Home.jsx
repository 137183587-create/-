import { useSiteAnimations } from '../animations/useSiteAnimations'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Advantages from './Advantages'
import Contact from './Contact'

export default function Home() {
  useSiteAnimations()
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Advantages />
      <Contact />
    </main>
  )
}
