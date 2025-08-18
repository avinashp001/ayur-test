import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Eye, Heart, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import type { Blog } from '../../lib/supabase'

interface BlogCardProps {
  blog: Blog
  featured?: boolean
}

export default function BlogCard({ blog, featured = false }: BlogCardProps) {
  const cardClass = featured
    ? "group bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/20 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 shadow-2xl shadow-emerald-500/10"
    : "group bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300"

  return (
    <article className={cardClass}>
      <div className="relative">
        <img
          src={blog.featured_image}
          alt={blog.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            featured ? 'h-48 sm:h-56 md:h-64' : 'h-40 sm:h-48'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {blog.category}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
            <div className="flex items-center space-x-3 text-white text-sm">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{blog.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{blog.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-4 sm:p-6 ${featured ? 'sm:p-6 md:p-8' : ''}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-gray-400 text-sm mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(blog.published_at), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{blog.reading_time} min read</span>
          </div>
        </div>

        <h2 className={`font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2 ${
          featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
        }`}>
          <Link to={`/blog/${blog.slug}`}>
            {blog.title}
          </Link>
        </h2>

        <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {blog.author.charAt(0)}
            </div>
            <span className="text-gray-400 text-sm">{blog.author}</span>
          </div>

          <Link
            to={`/blog/${blog.slug}`}
            className="group/link flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
          >
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}