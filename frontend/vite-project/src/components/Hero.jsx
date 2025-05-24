// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Transform Your
            <span className="bg-gradient-to-r from-purple-800 to-purple-950 bg-clip-text text-transparent"> Fitness Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-400 mb-8 max-w-3xl mx-auto">
            Perfect your form and track your nutrition with AI-powered precision.
            Morph helps you achieve your fitness goals with intelligent feedback and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-purple-900 to-purple-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-950 hover:to-purple-900 transition-all transform hover:scale-105 shadow-2xl">
              Start Your Journey
            </button>
            <button className="border-2 border-purple-900 text-purple-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-900 hover:text-white transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-black via-purple-950/60 to-black rounded-3xl p-8 backdrop-blur-sm border border-purple-900/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-gray-900/80 rounded-2xl p-6 border border-purple-900/30">
                  <h3 className="text-xl font-semibold text-white mb-3">📱 Form Detector</h3>
                  <p className="text-purple-400">Real-time exercise form analysis with AI-powered corrections</p>
                </div>
                <div className="bg-gray-900/80 rounded-2xl p-6 border border-purple-900/30">
                  <h3 className="text-xl font-semibold text-white mb-3">📸 Snap to Track</h3>
                  <p className="text-purple-400">Instant nutrition analysis from food photos</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-64 h-96 mx-auto bg-gradient-to-b from-purple-900 to-black rounded-3xl shadow-2xl border border-purple-900/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-800 to-purple-950 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">M</span>
                    </div>
                    <p className="text-purple-400">App Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
