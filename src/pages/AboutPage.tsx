import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Leaf, Heart, Shield, Users, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>About Us - AyurHealth</title>
        <meta name="description" content="Learn about AyurHealth's mission to bring ancient Ayurvedic wisdom and modern wellness practices to help you achieve holistic health." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg"
            alt="Ayurvedic herbs and wellness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">AyurHealth</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bridging ancient Ayurvedic wisdom with modern wellness practices to help you achieve optimal health and balance in your life.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                At AyurHealth, we believe that true wellness comes from understanding and harmonizing the connection between mind, body, and spirit. Our mission is to make the profound wisdom of Ayurveda accessible to modern seekers of health and balance.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                We curate expert-backed content that combines time-tested Ayurvedic principles with contemporary research in mental health, nutrition, and holistic wellness practices.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
                alt="Ayurvedic wellness"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These core principles guide everything we do at AyurHealth
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Heart,
                title: 'Holistic Approach',
                description: 'We believe in treating the whole person, not just symptoms, addressing physical, mental, and spiritual well-being.'
              },
              {
                icon: Shield,
                title: 'Evidence-Based',
                description: 'Our content combines ancient wisdom with modern scientific research to provide reliable, trustworthy information.'
              },
              {
                icon: Users,
                title: 'Community-Centered',
                description: 'We foster a supportive community where individuals can share their wellness journeys and learn from each other.'
              },
              {
                icon: Award,
                title: 'Expert Guidance',
                description: 'Our content is created and reviewed by certified Ayurvedic practitioners and wellness experts.'
              },
              {
                icon: Globe,
                title: 'Accessible Wisdom',
                description: 'We make ancient Ayurvedic knowledge accessible and applicable to modern lifestyles worldwide.'
              },
              {
                icon: Leaf,
                title: 'Natural Healing',
                description: 'We promote natural, sustainable approaches to health that work in harmony with your body.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Approach</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              How we bring you the best in holistic wellness content
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Research & Curation</h3>
              <p className="text-gray-400">
                We carefully research and curate content from authentic Ayurvedic texts and modern wellness studies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Expert Review</h3>
              <p className="text-gray-400">
                All content is reviewed by certified practitioners to ensure accuracy and safety.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Application</h3>
              <p className="text-gray-400">
                We present information in practical, actionable ways that fit into modern lifestyles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-900/50 to-teal-900/50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Join Our Wellness Community
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Start your journey to holistic health with evidence-based Ayurvedic wisdom and modern wellness practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blogs"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-2xl shadow-emerald-500/25"
            >
              Explore Articles
            </a>
            <a
              href="/categories/ayurveda"
              className="border-2 border-emerald-500/30 hover:border-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 hover:bg-emerald-500/10"
            >
              Learn Ayurveda
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}