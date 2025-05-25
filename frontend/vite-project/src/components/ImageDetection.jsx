import React from 'react';
import { Camera } from 'lucide-react';

export default function ImageDetectionCard() {
  const routeToImageUpload = () => {
    window.location.href = '/image-upload';
  };

  return (
    <div className="mt-8 min-h-[450px] w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/5 hover:opacity-90 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
          <Camera size={24} className="text-white" />
        </div>

        <h4 className="text-xl font-semibold mb-3 text-white">Image Detection</h4>

        <p className="text-purple-200 text-sm leading-relaxed mb-6">
          Snap photos of your meals and get instant nutrition analysis. Our AI recognizes ingredients and calculates macros automatically.
        </p>
      </div>

      <button 
        onClick={routeToImageUpload}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2 w-full justify-center"
      >
        <Camera size={16} />
        <span>Go to Image Upload</span>
      </button>
    </div>
  );
}
