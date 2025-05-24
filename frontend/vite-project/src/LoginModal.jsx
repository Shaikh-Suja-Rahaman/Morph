import { useState, useEffect } from 'react'
import { supabase } from './components/supabaseClient'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ProfileSetup from './components/ProfileSetup'
import TrainerSetup from './components/TrainerSetup'
import './App.css'

export default function LoginModal() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [showSignUp, setShowSignUp] = useState(false)
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false)
  const [needsTrainerSetup, setNeedsTrainerSetup] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setNeedsProfileSetup(false)
        setNeedsTrainerSetup(false)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      setProfile(data)

      // Check if profile needs completion
      const needsSetup = !data.height || !data.weight || !data.age
      setNeedsProfileSetup(needsSetup)
      // Check if trainer needs to be set
      const needsTrainer = !data.trainer_name
      setNeedsTrainerSetup(needsTrainer)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  // Not authenticated
  if (!session) {
    return (
      <div className="auth-container">
        {showSignUp ? (
          <div>
            <SignUp onSuccess={() => setShowSignUp(false)} />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowSignUp(false)}>Login</button>
            </p>
          </div>
        ) : (
          <div>
            <Login onSuccess={() => {}} />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setShowSignUp(true)}>Sign Up</button>
            </p>
          </div>
        )}
      </div>
    )
  }

  // Authenticated but needs profile setup
  if (needsProfileSetup) {
    return (
      <div className="profile-container">
        <ProfileSetup
          user={session.user}
          onComplete={() => setNeedsProfileSetup(false)}
        />
      </div>
    )
  }

  // Authenticated but needs trainer setup
  if (needsTrainerSetup) {
    return (
      <div className="profile-container">
        <TrainerSetup
          user={session.user}
          onComplete={() => setNeedsTrainerSetup(false)}
        />
      </div>
    )
  }

  // Authenticated with complete profile
  return (
    <div className="dashboard">
      <h1>Welcome, {profile?.username}!</h1>
      <div className="profile-info">
        <h2>Your Profile</h2>
        <p><strong>Height:</strong> {profile?.height} cm</p>
        <p><strong>Weight:</strong> {profile?.weight} kg</p>
        <p><strong>Age:</strong> {profile?.age} years</p>
        <p><strong>Trainer:</strong> {profile?.trainer_name}</p>
      </div>
      <button onClick={() => setNeedsProfileSetup(true)}>
        Edit Profile
      </button>
      <button onClick={() => setNeedsTrainerSetup(true)}>
        Change Trainer
      </button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}
