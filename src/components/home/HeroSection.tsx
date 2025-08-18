import React from 'react'
import { ArrowRight, Sparkles, Leaf, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 bg-emerald-900/30 px-4 py-2 rounded-full border border-emerald-500/20">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 text-xs sm:text-sm font-medium">Ancient Wisdom for Modern Living</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
          Discover{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
            Holistic
          </span>
          <br />
          Wellness
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          Explore the timeless wisdom of Ayurveda, mental health insights, and natural healing practices 
          to transform your well-being from the inside out.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
          <Link
            to="/blogs"
            className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-2xl shadow-emerald-500/25 flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <span>Explore Articles</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/categories/ayurveda"
            className="group border-2 border-emerald-500/30 hover:border-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 hover:bg-emerald-500/10 flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span>Learn Ayurveda</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
          {[
            {
              icon: <Leaf className="w-8 h-8 text-emerald-400" />,
              title: "Ayurvedic Wisdom",
              description: "5000-year-old healing system"
            },
            {
              icon: <Heart className="w-8 h-8 text-rose-400" />,
              title: "Mental Wellness",
              description: "Modern approaches to mindfulness"
            },
            {
              icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
              title: "Natural Remedies",
              description: "Holistic healing solutions"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 hover:border-emerald-500/50 transition-all duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-gray-700/50 rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}