// src/components/CTA.jsx
import React from 'react';

const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-black via-purple-900/60 to-black rounded-3xl p-12 backdrop-blur-sm border border-purple-700/30 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already improved their fitness journey with Morph's intelligent tracking and feedback system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-purple-700 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-800 hover:to-purple-600 transition-all transform hover:scale-105 shadow-2xl">
              Download Now
            </button>
            <button className="border-2 border-purple-400 text-purple-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-400 hover:text-purple-900 transition-all">
              Learn More
            </button>
          </div>
          <div className="mt-8 flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Free</div>
              <div className="text-purple-200 text-sm">Download</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">iOS & Android</div>
              <div className="text-purple-200 text-sm">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-purple-200 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
