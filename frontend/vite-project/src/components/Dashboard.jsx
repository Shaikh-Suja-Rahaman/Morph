import React from 'react';
import ImageDetectionCard from './ImageDetection';
import PoseDetectionCard from './PoseDetection';

const Dashboard = () => {
  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-gray-950">
      <div className="flex flex-wrap gap-6 justify-center items-start">
        <ImageDetectionCard />
        <PoseDetectionCard />
      </div>
    </div>
  );
};

export default Dashboard;
