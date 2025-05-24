// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Ultra from './components/Ultra';
import LoginModal from './LoginModal';
// import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-black to-purple-950">
      <Header />
      <Ultra/>



      {/* <Hero /> */}

      {/* <Features />
      <About />
      <CTA />
      <Footer /> */}
    </div>
  );
}

export default App;
