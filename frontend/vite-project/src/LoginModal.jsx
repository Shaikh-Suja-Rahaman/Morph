import { useState, useEffect } from 'react'
import { supabase } from './components/supabaseClient'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ProfileSetup from './components/ProfileSetup'
import TrainerSetup from './components/TrainerSetup'
import './App.css'

export default function LoginModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {loading ? (
          <div className="modal-loading">Loading...</div>
        ) : !session ? (
          <div className="modal-auth">
            {showSignUp ? (
              <div className="modal-section">
                <SignUp onSuccess={() => setShowSignUp(false)} />
                <p className="modal-switch">
                  Already have an account?{' '}
                  <button onClick={() => setShowSignUp(false)}>Login</button>
                </p>
              </div>
            ) : (
              <div className="modal-section">
                <Login onSuccess={onClose} />
                <p className="modal-switch">
                  Don't have an account?{' '}
                  <button onClick={() => setShowSignUp(true)}>Sign Up</button>
                </p>
              </div>
            )}
          </div>
        ) : needsProfileSetup ? (
          <div className="modal-section">
            <ProfileSetup
              user={session.user}
              onComplete={() => setNeedsProfileSetup(false)}
            />
          </div>
        ) : needsTrainerSetup ? (
          <div className="modal-section">
            <TrainerSetup
              user={session.user}
              onComplete={() => setNeedsTrainerSetup(false)}
            />
          </div>
        ) : (
          <div className="modal-dashboard">
            <h1>Welcome, {profile?.username}!</h1>
            <div className="profile-info">
              <h2>Your Profile</h2>
              <p><strong>Height:</strong> {profile?.height} cm</p>
              <p><strong>Weight:</strong> {profile?.weight} kg</p>
              <p><strong>Age:</strong> {profile?.age} years</p>
              <p><strong>Trainer:</strong> {profile?.trainer_name}</p>
            </div>
            <div className="modal-actions">
              <button onClick={() => setNeedsProfileSetup(true)}>
                Edit Profile
              </button>
              <button onClick={() => setNeedsTrainerSetup(true)}>
                Change Trainer
              </button>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
