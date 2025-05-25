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
    <form onSubmit={handleLogin} className="flex flex-col space-y-6 w-full max-w-md mx-auto p-8">
      <h2 className="text-3xl font-semibold text-white text-center mb-2">Login</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Email or Username"
          value={formData.identifier}
          onChange={(e) => setFormData({...formData, identifier: e.target.value})}
          required
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-500/20
          text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50
          focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-500/20
          text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50
          focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
        />
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
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
