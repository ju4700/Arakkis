import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Bazar from './components/Bazar'
import Footer from './components/Footer'
import Info from './components/Info'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'market' | 'info'>('home');

  const handleNavigate = (view: 'home' | 'market' | 'info') => {
    setCurrentView(view);
    
    // Scroll to top when changing views
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (view === 'market') {
      // Scroll to bazar section
      setTimeout(() => {
        const bazarElement = document.getElementById('bazar-section');
        if (bazarElement) {
          bazarElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleShowMore = () => {
    setCurrentView('market');
  };

  return (
    <div className="min-h-screen bg-[#eff2f3]">
      <div className="py-6">
        <Navbar onNavigate={handleNavigate} />
      </div>
      
      {currentView === 'home' ? (
        <>
          <Hero />
          <Bazar showAll={false} onShowMore={handleShowMore} />
        </>
      ) : currentView === 'market' ? (
        <Bazar showAll={true} onShowMore={handleShowMore} />
      ) : (
        <Info />
      )}
      
      <Footer />
    </div>
  );
}

export default App;
