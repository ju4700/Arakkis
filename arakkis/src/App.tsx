import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Bazar from './components/Bazar'
import Footer from './components/Footer'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'market'>('home');

  const handleNavigate = (view: 'home' | 'market') => {
    setCurrentView(view);
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
      ) : (
        <Bazar showAll={true} onShowMore={handleShowMore} />
      )}
      
      <Footer />
    </div>
  );
}

export default App;
