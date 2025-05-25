import React from 'react';
import { Activity } from 'lucide-react';

export default function PoseDetectionCard() {
  const routeToPoseDetection = () => {
    window.location.href = '/pose-detection';
  };

  return (
    <div className="mt-8 min-h-[450px] w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/5 hover:opacity-90 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mb-4">
          <Activity size={24} className="text-white" />
        </div>

        <h4 className="text-xl font-semibold mb-3 text-white">Pose Detection</h4>

        <p className="text-purple-200 text-sm leading-relaxed mb-6">
          Perfect your form with real-time pose analysis. Get instant feedback on your workouts and prevent injuries.
        </p>
      </div>

      <button 
        onClick={routeToPoseDetection}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 w-full justify-center"
      >
        <Activity size={16} />
        <span>Start Pose Detection</span>
      </button>
    </div>
  );
}
