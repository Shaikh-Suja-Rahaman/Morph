// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Ultra from './components/Ultra';
import LoginModal from './LoginModal';
import Dashboard from './components/Dashboard'; // Create this component
// import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-bl from-black to-purple-950">
        <Header />
        <Routes>
          <Route path="/" element={<Ultra/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
