import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function TrainerSetup({ user, onComplete }) {
  const [trainerName, setTrainerName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Add Your Trainer</h2>
      {error && <div className="error">{error}</div>}

      <input
        type="text"
        placeholder="Trainer Name"
        value={trainerName}
        onChange={(e) => setTrainerName(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Trainer'}
      </button>
    </form>
  )
}