import React from 'react';
import { ChevronRight, PersonStanding, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PoseDetectionCard() {
  const navigate = useNavigate();

  return (
    <div className="group mt-14 min-h-[550px] w-full max-w-md bg-gradient-to-b from-purple-950/30 to-black/30 backdrop-blur-md
      rounded-2xl border border-purple-500/20 hover:border-purple-500/40 overflow-hidden
      transition-all duration-500 flex flex-col justify-between hover:shadow-xl relative
      hover:shadow-purple-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent"></div>

      <div className="p-8 relative z-10">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2"></div>

        {/* Hero Icon */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-purple-900/20
            rounded-2xl flex items-center justify-center transform rotate-3
            group-hover:rotate-6 transition-all duration-500 border border-purple-500/30">
            <Activity className="w-10 h-10 text-purple-400 group-hover:text-purple-300
              transition-colors duration-500" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500/10 rounded-lg blur-lg"></div>
        </div>

        {/* Content */}
        <h4 className="text-2xl font-bold mb-4 text-white tracking-tight">
          AI Pose Detection
        </h4>

        <p className="text-purple-200/80 text-base leading-relaxed mb-8">
          Perfect your form with real-time pose analysis. Get instant feedback on your
          workouts and prevent injuries with our advanced AI technology.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            'Real-time Analysis',
            'Form Correction',
            'Injury Prevention',
            'Progress Tracking'
          ].map((feature) => (
            <div key={feature}
              className="px-4 py-2.5 rounded-xl bg-purple-500/5 border border-purple-500/20
                hover:bg-purple-500/10 transition-colors duration-300 group/feature">
              <span className="text-sm font-medium text-purple-300 group-hover/feature:text-purple-200
                transition-colors duration-300">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="p-8 pt-0 relative z-10">
        <button className="bg-purple-950/60 text-gray-200 px-10 py-2 text-lg font-medium rounded-lg cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-purple-900/60 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/40 border border-purple-800/20"
        onClick={() => navigate('/workout-selector')}>
            Start Workout
          </button>
      </div>
    </div>
  );
}
