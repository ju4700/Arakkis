import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="py-6">
        <Navbar />
      </div>
      <Hero />
    </div>
  </StrictMode>,
)
