import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollManager from './components/ScrollManager'
import Nav from './components/Nav'
import BackToTop from './components/BackToTop'
import MagicBackground from './components/MagicBackground'
import Home from './components/Home'
import Works from './components/Works'
import MedicalVisualizationPage from './components/MedicalVisualizationPage'

export default function App() {
  return (
    <>
      <MagicBackground />
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/medical-visualization" element={<MedicalVisualizationPage />} />
        <Route
          path="/ai-motion"
          element={<Navigate to="/medical-visualization#motion" replace />}
        />
        <Route
          path="/illustrations"
          element={<Navigate to="/medical-visualization#comics" replace />}
        />
      </Routes>
      <BackToTop />
    </>
  )
}
