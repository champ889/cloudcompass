import React, { useState, useEffect } from 'react';
// import cloudIcon from '../assets/cloud_icons.png';

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };
  
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden">
            <div className="theme-switch absolute top-4 right-4 z-50">
                <span className="text-yellow-500">🌞</span>
                <label className="switch">
                    <input type="checkbox" id="darkModeToggle" onChange={handleThemeChange} checked={theme === 'dark'} />
                    <span className="slider"></span>
                </label>
                <span className="text-blue-500">🌙</span>
            </div>
            
            <nav className="shadow-lg  w-full z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                {/* <img className="h-8 w-auto" src="/cloud_icons.png" alt="Cloud Providers"> */}
                            </div>
                        </div>
                         <div className="flex items-center space-x-4">
                          <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
                          <a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a>
                          <a href="#architecture" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('architecture'); }}>Architecture</a>
                          <a href="#pricing" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a>
                          <a href="#news" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('news'); }}>Updates</a>
                          <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
                        </div>
                    </div>
                </div>
            </nav>
    </div>
  );
};

export default Header;