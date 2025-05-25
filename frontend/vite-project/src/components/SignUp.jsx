import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function SignUp({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', formData.username)
        .single()

      if (existingUser) {
        throw new Error('Username already exists')
      }

      // Sign up user with metadata containing username
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username
          }
        }
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
    <form onSubmit={handleSignUp} className="flex flex-col space-y-6 w-full max-w-md mx-auto p-8">
      <h2 className="text-3xl font-semibold text-white text-center mb-2">Sign Up</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-500/20
          text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50
          focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
        />

        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
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
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  )
}
