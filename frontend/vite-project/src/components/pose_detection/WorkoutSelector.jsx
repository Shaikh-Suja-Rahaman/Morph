import React from "react";
import { useNavigate } from "react-router-dom";

const WorkoutSelector = () => {
  const navigate = useNavigate();

  const exercises = [
    { name: "pushup", label: "Pushup" },
    { name: "squat", label: "Squat" },
    { name: "plank", label: "Plank" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-bl from-black to-purple-950 px-6">
      <h1 className="text-4xl font-bold text-gray-200 mb-12 text-center drop-shadow-lg">
        What do you wanna workout today?
      </h1>

      <div className="flex justify-between gap-8 max-w-4xl w-full">
        {exercises.map((exercise) => (
          <div
            key={exercise.name}
            onClick={() => navigate(`/${exercise.name}`)}
            className="cursor-pointer flex-1 h-40 bg-slate-900/30 backdrop-blur-lg border border-slate-700/20 hover:border-purple-500/40 transition-all duration-300 rounded-2xl flex items-center justify-center text-gray-300 hover:text-white text-xl font-semibold shadow-xl hover:shadow-purple-900/40 hover:scale-105"
          >
            {exercise.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutSelector;