import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn, user } = useUser()
  
  const isAdmin = user?.publicMetadata?.role === 'admin'

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-emerald-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AyurHealth</h1>
              <p className="text-xs text-emerald-400">Holistic Wellness Blog</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
              Home
            </Link>
            <Link to="/blogs" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
              Blogs
            </Link>
            <Link to="/categories/ayurveda" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
              Ayurveda
            </Link>
            <Link to="/categories/mental-health" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
              Mental Health
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
              About
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg"
              >
                Admin
              </Link>
            )}
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
                  Sign In
                </button>
              </SignInButton>
            )}
          </nav>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors">Home</Link>
              <Link to="/blogs" className="text-gray-300 hover:text-emerald-400 transition-colors">Blogs</Link>
              <Link to="/categories/ayurveda" className="text-gray-300 hover:text-emerald-400 transition-colors">Ayurveda</Link>
              <Link to="/categories/mental-health" className="text-gray-300 hover:text-emerald-400 transition-colors">Mental Health</Link>
              <Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">About</Link>
              {isAdmin && (
                <Link to="/admin" className="text-emerald-400 font-medium">Admin Panel</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}