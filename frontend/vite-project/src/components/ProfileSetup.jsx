import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function ProfileSetup({ user, onComplete }) {
  const [profile, setProfile] = useState({
    height: '',
    weight: '',
    age: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('height, weight, age')
        .eq('id', user.id)
        .single()

      if (error) throw error

      if (data) {
        setProfile({
          height: data.height || '',
          weight: data.weight || '',
          age: data.age || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          height: parseFloat(profile.height) || null,
          weight: parseFloat(profile.weight) || null,
          age: parseInt(profile.age) || null,
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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full max-w-md mx-auto p-8">
      <h2 className="text-3xl font-semibold text-white text-center mb-2">Complete Your Profile</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <input
            type="number"
            step="0.1"
            placeholder="Height (cm)"
            value={profile.height}
            onChange={(e) => setProfile({...profile, height: e.target.value})}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-500/20
            text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50
            focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
          />
        </div>

        <div className="relative">
          <input
            type="number"
            step="0.1"
            placeholder="Weight (kg)"
            value={profile.weight}
            onChange={(e) => setProfile({...profile, weight: e.target.value})}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-500/20
            text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50
            focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
          />
        </div>

        <div className="relative">
          <input
            type="number"
            placeholder="Age"
            value={profile.age}
            onChange={(e) => setProfile({...profile, age: e.target.value})}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-500/20
            text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50
            focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800
        text-white font-medium text-sm transition-all duration-200 transform
        hover:translate-y-[-1px] hover:shadow-lg hover:shadow-purple-500/25
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${loading ? 'animate-pulse' : ''}`}
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  )
}
