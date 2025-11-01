import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Bazar from './components/Bazar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-[#eff2f3]">
      <div className="py-6">
        <Navbar />
      </div>
      <Hero />
      <Bazar />
    </div>
  </StrictMode>,
)
