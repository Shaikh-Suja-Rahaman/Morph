import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function TrainerSetup({ user, onComplete }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedTrainer, setSelectedTrainer] = useState(null)

  const trainers = [
    { id: 1, name: "Bob", specialty: "Strength Training" },
    { id: 2, name: "Henry", specialty: "HIIT & Cardio" },
    { id: 3, name: "Kenny", specialty: "Nutrition & Wellness" }
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
    <div className="flex flex-col space-y-6 w-full max-w-xl mx-auto p-8">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">Choose Your Trainer</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border-2 transition-all duration-200
              ${selectedTrainer === trainer.name
                ? 'border-purple-500/50 bg-white/10'
                : 'border-purple-500/20 hover:border-purple-500/30 hover:bg-white/8'}`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-purple-900/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-300">{trainer.name[0]}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">{trainer.name}</h3>
                <p className="text-sm text-purple-200/70">{trainer.specialty}</p>
              </div>

              <button
                onClick={() => handleTrainerSelect(trainer.name)}
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800
                  text-white font-medium text-sm transition-all duration-200 transform
                  hover:translate-y-[-1px] hover:shadow-lg hover:shadow-purple-500/25
                  disabled:opacity-70 disabled:cursor-not-allowed
                  ${loading ? 'animate-pulse' : ''}`}
              >
                {loading && selectedTrainer === trainer.name ? 'Selecting...' : 'Select Trainer'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}