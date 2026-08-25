import { useSiteAnimations } from './animations/useSiteAnimations'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Advantages from './components/Advantages'
import Contact from './components/Contact'

export default function App() {
  useSiteAnimations()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Advantages />
        <Contact />
      </main>
    </>
  )
}
