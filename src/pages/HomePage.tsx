import React from 'react'
import { useState, useEffect } from 'react'
import HeroSection from '../components/home/HeroSection'
import BlogCard from '../components/blog/BlogCard'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blogService, type Blog, supabase } from '../lib/supabase'

export default function HomePage() {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([])
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getPublishedBlogs(supabase)
        setFeaturedBlogs(blogs.slice(0, 3))
        setRecentBlogs(blogs.slice(3, 6))
      } catch (error) {
        console.error('Error fetching blogs:', error)
        // Fallback to empty arrays if there's an error
        setFeaturedBlogs([])
        setRecentBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading wellness content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSection />
      
      {/* Featured Articles Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2 bg-emerald-900/30 px-4 py-2 rounded-full border border-emerald-500/20">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 text-sm font-medium">Featured Articles</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Wisdom for Your <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Wellness Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover expert insights on Ayurveda, mental health, and holistic healing practices
            </p>
          </div>

          {featuredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <BlogCard blog={featuredBlogs[0]} featured={true} />
              <div className="space-y-6">
                {featuredBlogs[1] && <BlogCard blog={featuredBlogs[1]} />}
                {featuredBlogs[2] && <BlogCard blog={featuredBlogs[2]} />}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No featured articles available yet.</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for wellness content!</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Latest Insights</h2>
              <p className="text-gray-400">Fresh perspectives on holistic wellness</p>
            </div>
            <Link 
              to="/blogs"
              className="group flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No recent articles available yet.</p>
              <p className="text-gray-500 text-sm mt-2">Start creating content in the admin panel!</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Explore by Category</h2>
            <p className="text-gray-400">Find content tailored to your wellness interests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Ayurveda',
                description: 'Ancient wisdom for modern wellness',
                image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
                count: 45,
                href: '/categories/ayurveda'
              },
              {
                name: 'Mental Health',
                description: 'Mindfulness and emotional wellbeing',
                image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg',
                count: 32,
                href: '/categories/mental-health'
              },
              {
                name: 'Nutrition',
                description: 'Holistic approach to healthy eating',
                image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                count: 28,
                href: '/categories/nutrition'
              },
              {
                name: 'Yoga',
                description: 'Unite body, mind, and spirit',
                image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg',
                count: 21,
                href: '/categories/yoga'
              }
            ].map((category, index) => (
              <Link
                key={index}
                to={category.href}
                className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="relative h-32">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {category.count} articles
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}