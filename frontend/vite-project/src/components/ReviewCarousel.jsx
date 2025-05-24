// components/ReviewCarousel.jsx
import React, { useState, useEffect } from 'react';

const ReviewCarousel = ({
  reviews,
  autoplay = true,
  autoplayDelay = 4000,
  pauseOnHover = true,
  showDots = true,
  showArrows = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [isPlaying, autoplay, autoplayDelay, reviews.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && autoplay) setIsPlaying(true);
  };

  if (!reviews || reviews.length === 0) {
    return <div className="text-center text-purple-200">No reviews available</div>;
  }

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main carousel container */}
      <div className="px-6 relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="w-full flex-shrink-0 p-6">
              <div className="flex flex-col max-w-2xl mx-auto">
                {/* Header with avatar and rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full border border-purple-400/30 object-cover"
                    />
                    <div>
                      <h4 className="text-white font-medium text-sm">{review.name}</h4>
                      <p className="text-purple-200 text-xs">{review.role}</p>
                    </div>
                  </div>

                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-purple-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <blockquote className="text-sm text-white/90 leading-relaxed">
                  "{review.content}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - Made smaller and more subtle */}
      {showArrows && reviews.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
            aria-label="Previous review"
          >
            <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
            aria-label="Next review"
          >
            <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots indicator - Made smaller */}
      {showDots && reviews.length > 1 && (
        <div className="flex justify-center mt-4 space-x-1.5">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-purple-400 scale-110'
                  : 'bg-purple-600/30 hover:bg-purple-500/50'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress bar - Made thinner */}

    </div>
  );
};

export default ReviewCarousel;
