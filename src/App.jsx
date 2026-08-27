import { Routes, Route } from 'react-router-dom'
import ScrollManager from './components/ScrollManager'
import Nav from './components/Nav'
import BackToTop from './components/BackToTop'
import Home from './components/Home'
import Works from './components/Works'

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
      </Routes>
      <BackToTop />
    </>
  )
}
