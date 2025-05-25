// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Ultra from './components/Ultra';
import LoginModal from './LoginModal';
import Dashboard from './components/Dashboard'; // Create this component
import WorkoutSelector from './components/pose_detection/WorkoutSelector';
import PoseDetector from './components/pose_detection/PoseDetector';
// import './styles/globals.css';
import FeatureCards from './components/Feature/FeatureCard';
import MealLogingPage from './components/SnapToTrack/MealLoggingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-bl from-black to-purple-950">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
            <Ultra />
            <FeatureCards/>
            </>
            } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout-selector" element={<WorkoutSelector />} />
          <Route path="/pushup" element={<PoseDetector exercise="pushup" />} />
        <Route path="/squat" element={<PoseDetector exercise="squat" />} />
        <Route path="/plank" element={<PoseDetector exercise="plank" />} />
        <Route path='/meal-logging-page' element={<MealLogingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
