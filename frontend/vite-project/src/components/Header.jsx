// src/components/Header.jsx
import React, { useState } from 'react';
import {UserRound} from "lucide-react";

// <UserRound />
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div className="scale-110 pointer-events-auto max-w-4xl w-full  px-4 py-2 bg-black/20 rounded-full shadow-2xl border border-purple-950/60 backdrop-blur-md flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <span className="ml-3 text-2xl font-bold text-gray-100">Morph</span>
          </div>



          <div className="hidden md:flex items-center space-x-4 ">
            <button className="text-purple-400 hover:text-white transition-colors">Home</button>
            <button className="text-purple-400 hover:text-white transition-colors">Log In</button>

          <div className='rounded-full h-10 w-10 flex justify-center items-center border-gray-300 border-2'>
          <button
            className="text-gray-300 "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <UserRound size={25} />
          </button>
          </div>
          </div>

          {/* <button className=''>

          </button> */}
        </div>
      </div>
      {isMenuOpen && (
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
  );
};

export default Header;
