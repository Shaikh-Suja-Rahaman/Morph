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
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Complete Your Profile</h2>
      {error && <div className="error">{error}</div>}

      <input
        type="number"
        step="0.1"
        placeholder="Height (cm)"
        value={profile.height}
        onChange={(e) => setProfile({...profile, height: e.target.value})}
      />

      <input
        type="number"
        step="0.1"
        placeholder="Weight (kg)"
        value={profile.weight}
        onChange={(e) => setProfile({...profile, weight: e.target.value})}
      />

      <input
        type="number"
        placeholder="Age"
        value={profile.age}
        onChange={(e) => setProfile({...profile, age: e.target.value})}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  )
}
