// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { UserRound } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import LoginModal from '../LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setProfile(data);
  };

  const handleEditProfile = () => {
    setIsLoginModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
        <div className="scale-110 pointer-events-auto max-w-4xl w-full px-4 py-2 bg-black/20 rounded-full shadow-2xl border border-purple-950/60 backdrop-blur-md flex items-center">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <span className="ml-3 text-2xl font-bold text-gray-100">Morph</span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-purple-400 hover:text-white transition-colors
              "
              onClick={() => navigate('/')}>
                Home
              </button>

              {session ? (
                <button
                  className="text-purple-400 hover:text-white transition-colors"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  className="text-purple-400 hover:text-white transition-colors"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Log In
                </button>
              )}

              <div className="relative">
                <div className="rounded-full h-10 w-10 flex justify-center items-center border-gray-300 border-2">
                  <button
                    className="text-gray-300"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <UserRound size={25} />
                  </button>
                </div>

                {/* Profile Dropdown */}
                {isMenuOpen && session && (
                  <div className="absolute right-0 mt-2 w-64 bg-black/90 rounded-xl shadow-xl border border-purple-950/40 py-4 px-6">
                    <div className="space-y-3">
                      <p className="text-white font-medium">Welcome, {profile?.username}!</p>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p>Height: {profile?.height} cm</p>
                        <p>Weight: {profile?.weight} kg</p>
                        <p>Age: {profile?.age} years</p>
                        <p>Trainer: {profile?.trainer_name}</p>
                      </div>
                      <hr className="border-purple-950/40" />
                      <div className="flex justify-between items-center">
                        <button
                          onClick={handleEditProfile}
                          className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                          Edit Profile
                        </button>
                        <button
                          onClick={() => supabase.auth.signOut()}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && !session && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-full max-w-xs bg-black/90 rounded-2xl shadow-xl border border-purple-950/40 py-4 px-6 md:hidden">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-purple-400 hover:text-white transition-colors">Home</a>
              <a href="#features" className="text-purple-400 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-purple-400 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-purple-400 hover:text-white transition-colors">Contact</a>
            </nav>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
