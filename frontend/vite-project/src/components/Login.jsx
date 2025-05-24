import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Login({ onSuccess }) {
  const [formData, setFormData] = useState({
    identifier: '', // Can be email or username
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let email = formData.identifier

      // Check if identifier is a username (doesn't contain @)
      if (!formData.identifier.includes('@')) {
        // Look up email by username
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', formData.identifier)
          .single()

        if (profileError || !profile) {
          throw new Error('Username not found')
        }

        // Get email from auth.users table using the user ID
        const { data: user, error: userError } = await supabase.auth.admin.getUserById(profile.id)

        if (userError || !user) {
          // Fallback: try to get email through a different approach
          throw new Error('User not found')
        }

        email = user.user.email
      }

      // Sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: formData.password
      })

      if (error) throw error

      if (data.user) {
        onSuccess()
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}

      <input
        type="text"
        placeholder="Email or Username"
        value={formData.identifier}
        onChange={(e) => setFormData({...formData, identifier: e.target.value})}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
