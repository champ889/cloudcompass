import React, { useState, useEffect, useRef } from 'react';
import useMediaQuery from './useMediaQuery';
// import cloudIcon from '../assets/cloud_icons.png';

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  const handleScroll = () => {
    if (isMobile) return;
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = (
    <>
      <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
      <a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a>
      <a href="#architecture" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('architecture'); }}>Architecture</a>
      <a href="#pricing" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a>
      <a href="#news" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('news'); }}>Updates</a>
      <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
    </>
  );

  return (
    <>
      <div className={`theme-switch fixed top-4 right-4 transition-transform duration-300 ease-in-out ${isNavbarVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <span className="text-yellow-500">🌞</span>
        <label className="switch">
          <input type="checkbox" id="darkModeToggle" onChange={handleThemeChange} checked={theme === 'dark'} />
          <span className="slider"></span>
        </label>
        <span className="text-blue-500">🌙</span>
      </div>
      <div className="relative overflow-hidden">
        
        {isMobile ? (
          <button className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
            ☰
          </button>
        ) : (
          <nav id="navbar" className={`shadow-lg w-full ${isNavbarVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-center h-16">
                <div className="flex items-center space-x-4">
                  {navLinks}
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="flex flex-col items-center space-y-4">
            {navLinks}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;