// src/components/Features.jsx
import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "🎯",
      title: "Form Correction",
      description: "AI-powered real-time analysis of your exercise form with personalized improvement suggestions",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      icon: "📸",
      title: "Snap to Track",
      description: "Instantly analyze food nutrition by taking a photo - calories, macros, and health insights",
      gradient: "from-pink-600 to-purple-600"
    },
    {
      icon: "📊",
      title: "Progress Analytics",
      description: "Comprehensive tracking of your fitness journey with detailed progress reports",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: "🔥",
      title: "Calorie Tracking",
      description: "Accurate calorie counting with smart food recognition and portion estimation",
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: "💪",
      title: "Workout Plans",
      description: "Personalized workout routines adapted to your fitness level and goals",
      gradient: "from-green-600 to-teal-600"
    },
    {
      icon: "🏆",
      title: "Achievement System",
      description: "Gamified fitness experience with rewards and milestones to keep you motivated",
      gradient: "from-yellow-600 to-orange-600"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"> Every Goal</span>
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Discover how Morph's cutting-edge technology transforms your fitness and nutrition tracking experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-r from-purple-700 to-purple-500 rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-purple-200 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
