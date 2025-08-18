import React from 'react'
import { Leaf, Heart, Shield, Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AyurHealth</h3>
                <p className="text-sm text-emerald-400">Holistic Wellness Blog</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover the ancient wisdom of Ayurveda and modern approaches to mental health. 
              Our expert-curated content helps you achieve balance and wellness naturally.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Holistic Wellness</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Trusted Content</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <div className="space-y-2">
              <a href="/categories/ayurveda" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Ayurveda
              </a>
              <a href="/categories/mental-health" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Mental Health
              </a>
              <a href="/categories/nutrition" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Nutrition
              </a>
              <a href="/categories/yoga" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Yoga & Meditation
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/about" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                About Us
              </a>
              <a href="/contact" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Contact
              </a>
              <a href="/privacy" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 AyurHealth. All rights reserved. Made with ❤️ for holistic wellness.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Powered by Ancient Wisdom</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}