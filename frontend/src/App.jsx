import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Architecture from './components/Architecture';
import Pricing from './components/Pricing';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div id="app">
      <Header />
      <Hero />
      <main className="max-w-7xl mx-auto px-4">
        <Services />
        <Architecture />
        <Pricing />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;