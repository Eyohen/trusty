
import React, { useState } from 'react';
import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe } from 'lucide-react';
import PricingCalculator from '../components/PricingCalculator';
import { useNavigate } from 'react-router-dom';
import { nav } from 'framer-motion/client';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

// Landing Page Component
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Handle Start Transcribing click - check if user is logged in
  const handleStartTranscribing = () => {
    if (isAuthenticated && user) {
      navigate('/user-dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-[#006D5B]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#006D5B] to-purple-800 bg-clip-text text-[#006D5B]">
                ZenTranscript
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-[#006D5B] transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-[#006D5B] transition-colors">Pricing</a>
              <a href="#about" className="text-gray-700 hover:text-[#006D5B] transition-colors">About</a>
              {isAuthenticated && user ? (
                <>
                  <span className="text-gray-700">Welcome, {user.firstName || 'User'}!</span>
                  <button
                    onClick={() => navigate('/user-dashboard')}
                    className="bg-[#006D5B] text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-[#006D5B] hover:text-purple-700 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="bg-[#006D5B] text-white px-6 py-2 rounded-lg hover:bg-[#006D5B] transition-colors"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-purple-100">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-700">Features</a>
              <a href="#pricing" className="block py-2 text-gray-700">Pricing</a>
              <a href="#about" className="block py-2 text-gray-700">About</a>
              {isAuthenticated && user ? (
                <>
                  <p className="py-2 text-gray-700">Welcome, {user.firstName || 'User'}!</p>
                  <button
                    onClick={() => navigate('/user-dashboard')}
                    className="block w-full bg-[#006D5B] text-white px-4 py-2 rounded-lg mt-2"
                  >
                    Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="block w-full text-left py-2 text-[#006D5B]"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="block w-full bg-[#006D5B] text-white px-4 py-2 rounded-lg mt-2"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Transform Audio to
            <span className="bg-gradient-to-r from-[#006D5B] to-purple-800 bg-clip-text text-transparent block">
              Perfect Text
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional transcription services with lightning-fast turnaround times. 
            Upload your audio, get accurate transcripts with timestamps and speaker identification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartTranscribing}
              className="bg-[#006D5B] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#006D5B] transition-all transform hover:scale-105 shadow-lg"
            >
              Start Transcribing
              <ArrowRight className="inline ml-2 h-5 w-5" />
            </button>
            {/* <button className="border border-purple-300 text-[#006D5B] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#006D5B] transition-colors">
              <Play className="inline mr-2 h-5 w-5" />
              Watch Demo
            </button> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ZenTranscript?</h2>
            <p className="text-xl text-gray-600">Professional features for accurate transcription</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-[#006D5B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">Get your transcripts in as little as 6-12 hours with our express service.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-[#006D5B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">99.9% Accurate</h3>
              <p className="text-gray-600">Professional human transcribers ensure the highest accuracy for your content.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-[#006D5B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Multiple Languages</h3>
              <p className="text-gray-600">Support for 50+ languages with native speaker transcribers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Calculate your transcript cost instantly</p>
          </div>
          
          <PricingCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#006D5B] to-purple-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals who trust us with their transcription needs.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-[#006D5B] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Create Your Account
            <ArrowRight className="inline ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6 text-[#006D5B]" />
                <span className="text-xl font-bold">ZenTranscript</span>
              </div>
              <p className="text-gray-400 mb-4">
                Professional transcription services with unmatched accuracy and speed.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Audio Transcription</li>
                <li>Video Transcription</li>
                <li>Live Captioning</li>
                <li>Translation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 UXHUNTERS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home