import React, { useState, useEffect } from 'react';
import { Camera, Upload, ArrowLeft, Utensils, Zap, Dumbbell, Droplets, User, Check, Plus } from 'lucide-react';

// Meal Card Component for displaying prediction results
function MealCard({ prediction, image }) {
  const formatFoodName = (foodName) => {
    return foodName.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 0.8) return 'text-emerald-600';
    if (probability >= 0.6) return 'text-amber-600';
    return 'text-orange-600';
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-900/40 hover:bg-black/50 transition-all duration-300">
      {/* Image */}
      {image && (
        <div className="mb-6">
          <img
            src={image}
            alt="Detected food"
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Food Name & Confidence */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <Utensils className="mr-2 text-purple-400" size={24} />
            {formatFoodName(prediction.food)}
          </h3>
          <span className={`text-sm font-medium ${getProbabilityColor(prediction.probability)}`}>
            {Math.round(prediction.probability * 100)}% confidence
          </span>
        </div>
        <div className="w-full bg-purple-900/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-800 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${prediction.probability * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Nutrition Info Grid - Updated with darker colors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {/* Calories */}
        <div className="bg-gradient-to-br from-orange-950/40 to-red-950/40 rounded-xl p-4 border border-orange-900/20">
          <div className="flex items-center mb-2">
            <Zap className="text-orange-600" size={20} />
            <span className="text-orange-500 text-sm font-medium">Calories</span>
          </div>
          <p className="text-2xl font-bold text-white">{prediction.calories}</p>
          <p className="text-orange-400 text-xs">kcal</p>
        </div>

        {/* Protein */}
        <div className="bg-gradient-to-br from-purple-950/40 to-indigo-950/40 rounded-xl p-4 border border-purple-900/20">
          <div className="flex items-center mb-2">
            <Dumbbell className="text-purple-600" size={20} />
            <span className="text-purple-500 text-sm font-medium">Protein</span>
          </div>
          <p className="text-2xl font-bold text-white">{prediction.protein}</p>
          <p className="text-purple-400 text-xs">grams</p>
        </div>

        {/* Carbs */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-green-950/40 rounded-xl p-4 border border-emerald-900/20">
          <div className="flex items-center mb-2">
            <Droplets className="text-emerald-600" size={20} />
            <span className="text-emerald-500 text-sm font-medium">Carbs</span>
          </div>
          <p className="text-2xl font-bold text-white">{prediction.carbs}</p>
          <p className="text-emerald-400 text-xs">grams</p>
        </div>

        {/* Fat */}
        <div className="bg-gradient-to-br from-amber-950/40 to-yellow-950/40 rounded-xl p-4 border border-amber-900/20">
          <div className="flex items-center mb-2">
            <Droplets className="text-amber-600" size={20} />
            <span className="text-amber-500 text-sm font-medium">Fat</span>
          </div>
          <p className="text-2xl font-bold text-white">{prediction.fat}</p>
          <p className="text-amber-400 text-xs">grams</p>
        </div>
      </div>

      {/* Action Buttons */}

    </div>
  );
}

export default function MealLogingPage() {
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [existingPrediction, setExistingPrediction] = useState(null);

  // Check for existing prediction data from previous page
  useEffect(() => {
    const savedPrediction = sessionStorage.getItem('mealPrediction');
    if (savedPrediction) {
      const data = JSON.parse(savedPrediction);
      setExistingPrediction(data);
      // Clear the session storage after using it
      sessionStorage.removeItem('mealPrediction');
    }
  }, []);

  // Handle new image upload and prediction
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageLoading(true);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://morph-backend-fvad.onrender.com/predict/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPredictions(data.predictions);
      } else {
        console.error('Prediction failed');
        alert('Failed to analyze image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing image. Please try again.');
    } finally {
      setImageLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-6 py-40">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Snap to Track</h2>
          <p className="text-xl text-purple-300 max-w-2xl mx-auto">
            AI-Powered Meal Analysis
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-900/40">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Camera className="mr-2 text-purple-400" size={24} />
              Analyze New Meal
            </h3>

            {uploadedImage && (
              <div className="mb-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded food"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}

            <label className="bg-gradient-to-r from-purple-900 to-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-800 hover:to-purple-700 transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 w-full">
              {imageLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Upload size={20} />
                  <span>Upload Meal Photo</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={imageLoading}
              />
            </label>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Show existing prediction from previous page */}
          {existingPrediction && existingPrediction.predictions && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">Detected Meal</h3>
              {existingPrediction.predictions.map((prediction, index) => (
                <MealCard
                  key={index}
                  prediction={prediction}
                  image={null}
                />
              ))}
            </div>
          )}

          {/* Show new predictions */}
          {predictions.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">Analysis Results</h3>
              {predictions.map((prediction, index) => (
                <MealCard
                  key={index}
                  prediction={prediction}
                  image={uploadedImage}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!existingPrediction && predictions.length === 0 && !imageLoading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils size={32} className="text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Meals Analyzed Yet</h3>
              <p className="text-purple-200">Upload a photo of your meal to get started with AI nutrition analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}