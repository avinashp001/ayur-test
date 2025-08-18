import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Leaf, Brain, Apple, Bot as Lotus } from 'lucide-react'
import BlogCard from '../components/blog/BlogCard'
import { blogService, type Blog, supabase } from '../lib/supabase'

const categoryInfo = {
  'ayurveda': {
    name: 'Ayurveda',
    description: 'Ancient wisdom for modern wellness. Discover the 5000-year-old healing system that balances mind, body, and spirit.',
    icon: Leaf,
    color: 'from-emerald-600 to-green-600',
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg'
  },
  'mental-health': {
    name: 'Mental Health',
    description: 'Nurture your mind with evidence-based approaches to mental wellness, mindfulness, and emotional balance.',
    icon: Brain,
    color: 'from-purple-600 to-indigo-600',
    image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg'
  },
  'nutrition': {
    name: 'Nutrition',
    description: 'Fuel your body with holistic nutrition principles that support optimal health and vitality.',
    icon: Apple,
    color: 'from-orange-600 to-red-600',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  'yoga': {
    name: 'Yoga & Meditation',
    description: 'Unite body, mind, and spirit through ancient practices of yoga, meditation, and breathwork.',
    icon: Lotus,
    color: 'from-teal-600 to-cyan-600',
    image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg'
  }
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  const categoryData = category ? categoryInfo[category as keyof typeof categoryInfo] : null

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      if (!category) return

      try {
        const allBlogs = await blogService.getPublishedBlogs(supabase)
        const categoryBlogs = allBlogs.filter(blog => blog.category === category)
        setBlogs(categoryBlogs)
      } catch (error) {
        console.error('Error fetching category blogs:', error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryBlogs()
  }, [category])

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
          <p className="text-gray-400">The requested category does not exist.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading {categoryData.name} articles...</p>
        </div>
      </div>
    )
  }

  const Icon = categoryData.icon

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>{categoryData.name} - AyurHealth</title>
        <meta name="description" content={categoryData.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={categoryData.image}
            alt={categoryData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${categoryData.color} rounded-2xl mb-6`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {categoryData.name}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 px-4">
            {categoryData.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0 text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{blogs.length}</div>
              <div className="text-sm">Articles</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {blogs.reduce((sum, blog) => sum + (blog.views || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm">Total Views</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(blogs.reduce((sum, blog) => sum + (blog.reading_time || 0), 0) / blogs.length) || 0}
              </div>
              <div className="text-sm">Avg. Read Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {blogs.length > 0 ? (
            <>
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Latest in {categoryData.name}
                </h2>
                <p className="text-gray-400">
                  Explore our curated collection of {categoryData.name.toLowerCase()} articles
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${categoryData.color} rounded-2xl mb-6 opacity-50`}>
                <Icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                No {categoryData.name} articles yet
              </h3>
              <p className="text-gray-400 mb-6">
                We're working on bringing you amazing {categoryData.name.toLowerCase()} content. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}