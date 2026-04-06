import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import Resume from './pages/Resume';
import CaseStudyDetail from './components/CaseStudyDetail';
import NeoAICaseStudy from './pages/NeoAICaseStudy';

import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="relative bg-bg min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/case-study/neo-ai" element={<NeoAICaseStudy />} />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
