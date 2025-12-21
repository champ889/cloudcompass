import React, { useState, useEffect, useRef } from 'react';
import useMediaQuery from './useMediaQuery';
import cloudCompassLogo from '../assets/cloud-compass-logo.png';

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobile, isMobileMenuOpen]);

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
      <div className="relative">
        {isMobile ? (
          /* Mobile Header */
          // Added z-50 to ensure this header (and the close button) stays ON TOP of the menu overlay
          <div className="flex justify-between items-center h-16 px-4 relative z-50">
            
            {/* 1. Left Spacer (keeps layout balanced if not using absolute, but here just empty) */}
            <div className="w-8"></div> 

            {/* 2. Logo - Absolutely centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img src={cloudCompassLogo} alt="Cloud Compass Logo" className="h-16" />
            </div>
            
            {/* 3. Right Side - Just the Hamburger now (Switcher moved to menu) */}
            <div className="flex items-center z-50">
               <button 
                 className="hamburger-menu text-2xl p-2 focus:outline-none" 
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                 aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
               >
                 {isMobileMenuOpen ? '✕' : '☰'}
               </button>
            </div>
          </div>
        ) : (
          /* Desktop Header */
          <nav 
            id="navbar" 
            className={`fixed top-0 left-0 w-full shadow-lg transition-transform duration-300 z-40 bg-opacity-95 backdrop-blur-sm
            ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}
          >
            <div className="mx-auto px-2 sm:px-6 lg:px-4 w-full">
              <div className="flex items-center h-20 ">
                
                {/* Logo Section */}
                <div className="flex-1 flex justify-start">
                  <img src={cloudCompassLogo} alt="Cloud Compass Logo" className="h-20" />
                </div>

                {/* Links Section */}
                <div className="hidden md:flex items-center space-x-8">
                  {navLinks}
                </div>

                {/* Theme Switcher Section */}
                <div className="flex-1 flex justify-end">
                    <div className="theme-switch flex items-center">
                        <span className="text-yellow-500 mr-2">🌞</span>
                        <label className="switch">
                        <input type="checkbox" id="darkModeToggle" onChange={handleThemeChange} checked={theme === 'dark'} />
                        <span className="slider"></span>
                        </label>
                        <span className="text-blue-500 ml-2">🌙</span>
                    </div>
                </div>

              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-40 bg-black bg-opacity-95 pt-24 pb-8 px-6 flex flex-col h-screen">
          
          {/* Nav Links */}
          <div className="flex flex-col items-center space-y-8 text-xl w-full">
            {navLinks}
          </div>

          {/* Footer Section: Switcher & Close Button */}
          <div className="mt-auto flex flex-col items-center gap-6 w-full border-t border-gray-800 pt-8">
            
            {/* Relocated Theme Switcher */}
            <div className="theme-switch flex items-center p-3 rounded-lg bg-gray-900 bg-opacity-50">
                <span className="text-yellow-500 mr-3 text-lg">🌞</span>
                <label className="switch scale-125">
                <input type="checkbox" onChange={handleThemeChange} checked={theme === 'dark'} />
                <span className="slider"></span>
                </label>
                <span className="text-blue-500 ml-3 text-lg">🌙</span>
            </div>

            {/* Explicit Close Button (Optional, since top X works, but requested) */}
            <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white text-sm uppercase tracking-widest"
            >
                Close Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
