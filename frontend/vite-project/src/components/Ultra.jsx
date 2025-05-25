import React from 'react';
import fitnessImg from '../assets/fitness.png';
// import Carousel from '../Carousel/Carousel'
import ReviewCarousel from './ReviewCarousel';

const Ultra = () => {


  const reviews = [
  
    {
      id: 2,
      name: "Michael Chen",
      role: "Personal Trainer",
      company: "FitLife Gym",
      content: "As a trainer, I recommend Morph to all my clients. The AI-powered form analysis is incredibly accurate",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Nutritionist",
      company: "Wellness Center",
      content: "The snap-to-track feature is a game changer! My clients love how easy it is to log their meals. It's made nutrition coaching so much more effective and engaging.",
      rating: 4.5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Marathon Runner",
      company: "Running Club",
      content: "Morph helped me perfect my running form and optimize my nutrition strategy. I've shaved minutes off my marathon time thanks to the detailed analytics and feedback.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center p-0 m-0">
      <div className="flex items-center justify-between w-[95%] max-w-7xl gap-20">
        {/* Text Section */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            Track your fitness smarter
            <br />
            <span className="bg-gradient-to-r text-6xl from-purple-400 to-purple-200 bg-clip-text text-transparent">
            From Posture to Plate
            </span>
            <br />

          </h1>

          <p className="text-lg text-purple-200/80 mb-10 leading-relaxed max-w-lg">
            From perfect form to precise nutrition tracking, elevate your fitness game with AI-powered insights.
          </p>

          <button className="bg-purple-950/60 text-gray-200 px-10 py-4 text-lg font-medium rounded-lg cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-purple-900/60 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/40 border border-purple-800/20">
            Get Started →
          </button>
        </div>

        {/* Image Section with Overlapping Carousel */}
        <div className="relative flex-1 flex justify-center items-center">
          {/* Main Image Container */}
          <div className="w-[40vw] h-[65vh] bg-black/70 rounded-2xl flex items-center justify-center backdrop-blur-sm overflow-hidden relative
            shadow-[0_0_50px_-12px] shadow-purple-900/50
            ring-1 ring-purple-950/50
            after:absolute after:inset-0 after:rounded-2xl after:shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]">
            <img
              src={fitnessImg}
              alt="Fitness"
              className="object-cover w-full h-full mix-blend-luminosity opacity-90 brightness-140"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/80 via-purple-900/60 to-purple-950/70 mix-blend-multiply" />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

          </div>

          {/* Overlapping Carousel */}
          <div className="scale-90 absolute bottom-0 right-50 translate-y-1/4 w-full max-w-[80%] z-10">
            <ReviewCarousel
          reviews={reviews}
          autoplay={true}
          autoplayDelay={5000}
          pauseOnHover={true}
          showDots={true}
          showArrows={true}
        />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Ultra;
