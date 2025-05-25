import { useState } from 'react'
import { supabase } from './supabaseClient'
import cleoImage from '../assets/cleo-abram.jpg'
import trainerImage from '../assets/trainer.jpg'
import imagePng from '../assets/image.png'

export default function TrainerSetup({ user, onComplete }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedTrainer, setSelectedTrainer] = useState(null)

  const trainers = [
    {
      id: 1,
      name: "Cleo Abram",
      specialty: "Strength Training",
      experience: "8 years",
      image: cleoImage,
      description: "Certified strength and conditioning specialist with a passion for helping clients achieve their fitness goals."
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "HIIT & Cardio",
      experience: "5 years",
      image: trainerImage,
      description: "HIIT expert specializing in high-intensity interval training and cardiovascular fitness."
    },
    {
      id: 3,
      name: "David Martinez",
      specialty: "CrossFit & Functional Training",
      experience: "6 years",
      image: imagePng,
      description: "CrossFit Level 3 trainer with expertise in functional movement and Olympic lifting."
    }
  ]

  const handleTrainerSelect = async (trainerName) => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          trainer_name: trainerName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      onComplete()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[1500px] mx-auto p-6">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Choose Your Trainer
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm mx-auto max-w-md mb-6">
          {error}
        </div>
      )}

      <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl
              transition-all duration-300 hover:transform hover:scale-[1.02] h-[400px] flex flex-col
              ${
                selectedTrainer === trainer.name
                  ? 'ring-2 ring-purple-500 bg-white/10'
                  : 'hover:ring-2 hover:ring-purple-500/50'
              }`}
          >
            {/* Image Container - Made smaller */}
            <div className="relative h-36 overflow-hidden rounded-t-xl">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-full object-cover object-center transform transition-transform
                  duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content Container - More compact */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-2">
                <h3 className="text-xl font-bold text-white mb-1">
                  {trainer.name}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 rounded-full bg-purple-500/10 border
                    border-purple-500/20 text-xs font-medium text-purple-300">
                    {trainer.specialty}
                  </span>
                  <span className="text-purple-300/80 text-xs">
                    {trainer.experience} Experience
                  </span>
                </div>
              </div>

              <p className="text-gray-300/80 text-xs leading-relaxed line-clamp-3 mb-4">
                {trainer.description}
              </p>

              {/* Button pushed to bottom */}
              <div className="mt-auto">
                <button
                  onClick={() => handleTrainerSelect(trainer.name)}
                  disabled={loading}
                  className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800
                    text-white font-medium text-sm transition-all duration-300 transform
                    hover:translate-y-[-2px] hover:shadow-lg hover:shadow-purple-500/25
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                    ${loading && selectedTrainer === trainer.name ? 'animate-pulse' : ''}
                    border border-purple-500/20`}
                >
                  {loading && selectedTrainer === trainer.name ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Selecting...</span>
                    </span>
                  ) : (
                    'Select Trainer'
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}