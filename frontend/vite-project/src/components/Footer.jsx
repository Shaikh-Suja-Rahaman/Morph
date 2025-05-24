// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-purple-800/30 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-white">Morph</span>
            </div>
            <p className="text-purple-200 mb-6 max-w-md">
              Transform your fitness journey with AI-powered form correction and intelligent nutrition tracking.
              Your personal fitness companion for achieving optimal results.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-purple-800/50 rounded-full flex items-center justify-center hover:bg-purple-700/50 transition-colors cursor-pointer">
                <span className="text-purple-200">f</span>
              </div>
              <div className="w-10 h-10 bg-purple-800/50 rounded-full flex items-center justify-center hover:bg-purple-700/50 transition-colors cursor-pointer">
                <span className="text-purple-200">t</span>
              </div>
              <div className="w-10 h-10 bg-purple-800/50 rounded-full flex items-center justify-center hover:bg-purple-700/50 transition-colors cursor-pointer">
                <span className="text-purple-200">in</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Download</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Updates</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-800/30 mt-12 pt-8 text-center">
          <p className="text-purple-200">© 2025 Morph. All rights reserved. Built with ❤️ for fitness enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
