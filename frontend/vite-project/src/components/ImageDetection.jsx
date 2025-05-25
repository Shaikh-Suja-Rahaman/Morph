import React from 'react';
import { Camera, ChevronRight, Utensils, Scan, BarChart3 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom'
import MealLogingPage from '../components/SnapToTrack/MealLoggingPage';

export default function ImageDetectionCard() {
  const routeToImageUpload = () => {
    window.location.href = '/meal-logging-page';
  };

  return (
    <div className="group mt-14 min-h-[550px] w-full max-w-md bg-gradient-to-b from-purple-950/30 to-black/30 backdrop-blur-md
      rounded-2xl border border-purple-500/20 hover:border-purple-500/40 overflow-hidden
      transition-all duration-500 flex flex-col justify-between hover:shadow-xl relative
      hover:shadow-purple-500/10">
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/5 to-transparent"></div>

      <div className="p-8 relative z-10">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl transform -translate-y-1/2 -translate-x-1/2"></div>

        {/* Hero Icon - Updated with Lucide */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-purple-900/20
            rounded-2xl flex items-center justify-center transform -rotate-3
            group-hover:-rotate-6 transition-all duration-500 border border-purple-500/30">
            <Utensils className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors duration-500" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-500/10 rounded-lg blur-lg"></div>
        </div>

        {/* Content */}
        <h4 className="text-2xl font-bold mb-4 text-white tracking-tight">
          Food Analysis AI
        </h4>

        <p className="text-purple-200/80 text-base leading-relaxed mb-8">
          Transform your nutrition tracking with AI-powered food recognition. Simply snap
          a photo and get detailed macro breakdowns instantly.
        </p>

        {/* Steps - Updated with Lucide icons */}
       <div className="grid grid-cols-3 gap-4 mb-6">
  {[
    {
      icon: Camera,
      text: 'Snap',
    },
    {
      icon: Scan,
      text: 'Analyze',
    },
    {
      icon: BarChart3,
      text: 'Track',
    },
  ].map(({ icon: Icon, text }) => (
    <div
      key={text}
      className="px-4 py-3 rounded-xl bg-purple-500/5 border border-purple-500/20
        hover:bg-purple-500/10 transition-all duration-300 group/feature
        flex flex-col items-center gap-2"
    >
      <Icon className="w-5 h-5 text-purple-400 group-hover/feature:text-purple-300 transition-colors duration-300" />
      <span className="text-sm font-medium text-purple-300 group-hover/feature:text-purple-200 transition-colors duration-300">
        {text}
      </span>
    </div>
  ))}
</div>

      </div>

      {/* Button - Updated with Lucide Camera icon */}
      <div className="p-8 pt-0 relative z-10">
        <button className="bg-purple-950/60 text-gray-200 px-10 py-2 text-lg font-medium rounded-lg cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-purple-900/60 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/40 border border-purple-800/20"
        onClick={routeToImageUpload}
        >
            Snap To Track
          </button>
      </div>
    </div>
  );
}
