import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import ContactModal from './ContactModal';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav_home'), path: "/" },
    { name: t('nav_work'), path: "/work" },
    { name: t('nav_resume'), path: "/resume" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
          scrolled ? "bg-bg/80 backdrop-blur-md border-b border-stroke py-3" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full accent-gradient p-[1px]">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-text-primary font-bold">
                NZ
              </div>
            </div>
            <span className="font-display italic text-xl text-text-primary group-hover:text-muted transition-colors">
              Nikita Zhorov
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors hover:text-text-primary",
                  isActive ? "text-text-primary" : "text-muted"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              className="text-xs font-bold px-2 py-1 rounded border border-stroke hover:border-text-primary transition-colors text-muted hover:text-text-primary uppercase"
            >
              {language === 'en' ? 'DE' : 'EN'}
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-2 rounded-full bg-text-primary text-bg text-sm font-bold hover:bg-muted transition-colors"
            >
              {t('nav_say_hi')}
            </button>
          </div>
        </div>
      </nav>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
