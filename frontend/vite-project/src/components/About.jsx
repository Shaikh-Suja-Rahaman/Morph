// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Why Choose
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"> Morph?</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Precision</h3>
                  <p className="text-purple-200">Advanced machine learning algorithms provide accurate form analysis and nutrition tracking</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Real-Time Feedback</h3>
                  <p className="text-purple-200">Instant corrections and suggestions to improve your workout effectiveness</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Tracking</h3>
                  <p className="text-purple-200">Monitor both fitness performance and nutritional intake in one seamless app</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-black via-purple-900/60 to-black rounded-3xl p-8 backdrop-blur-sm border border-purple-700/30">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900/80 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">99%</div>
                  <div className="text-purple-200 text-sm">Accuracy Rate</div>
                </div>
                <div className="bg-gray-900/80 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">50K+</div>
                  <div className="text-purple-200 text-sm">Active Users</div>
                </div>
                <div className="bg-gray-900/80 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">1M+</div>
                  <div className="text-purple-200 text-sm">Workouts Tracked</div>
                </div>
                <div className="bg-gray-900/80 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">4.9★</div>
                  <div className="text-purple-200 text-sm">App Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
