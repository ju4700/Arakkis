import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Bazar from './components/Bazar'
import Footer from './components/Footer'
import Info from './components/Info'
import Contact from './components/Contact'
import AmarDokan from './components/AmarDokan'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'market' | 'info' | 'contact' | 'myshop'>('home');

  const handleNavigate = (view: 'home' | 'market' | 'info' | 'contact' | 'myshop') => {
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

  const handleQuickLinkClick = (linkId: number) => {
    if (linkId === 1) {
      // আমার দোকান clicked
      setCurrentView('myshop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#eff2f3] flex flex-col">
        <div className="py-6">
          <Navbar onNavigate={handleNavigate} />
        </div>
        
        <div className="flex-grow">
          {currentView === 'home' ? (
            <>
              <Hero onQuickLinkClick={handleQuickLinkClick} />
              <Bazar showAll={false} onShowMore={handleShowMore} />
            </>
          ) : currentView === 'market' ? (
            <Bazar showAll={true} onShowMore={handleShowMore} />
          ) : currentView === 'info' ? (
            <Info />
          ) : currentView === 'myshop' ? (
            <AmarDokan onShopCreated={() => setCurrentView('home')} />
          ) : (
            <Contact />
          )}
        </div>
        
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
