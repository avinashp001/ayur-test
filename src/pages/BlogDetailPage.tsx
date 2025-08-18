import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Calendar, Clock, Eye, Heart, Share2, ArrowLeft, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { blogService, type Blog, supabase } from '../lib/supabase'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return

      try {
        const blogData = await blogService.getBlogBySlug(supabase, slug)
        setBlog(blogData)

        // Increment views
        await blogService.incrementViews(supabase, blogData.id)

        // Fetch related blogs
        const allBlogs = await blogService.getPublishedBlogs(supabase)
        const related = allBlogs
          .filter(b => b.id !== blogData.id && b.category === blogData.category)
          .slice(0, 3)
        setRelatedBlogs(related)
      } catch (error) {
        console.error('Error fetching blog:', error)
        setBlog(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  const handleLike = async () => {
    if (!blog || liked) return

    try {
      await blogService.incrementLikes(supabase, blog.id)
      setBlog(prev => prev ? { ...prev, likes: (prev.likes || 0) + 1 } : null)
      setLiked(true)
    } catch (error) {
      console.error('Error liking blog:', error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-6">The requested article could not be found.</p>
          <Link
            to="/blogs"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Browse All Articles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>{blog.meta_title || blog.title} - AyurHealth</title>
        <meta name="description" content={blog.meta_description || blog.excerpt} />
        <meta name="keywords" content={blog.keywords?.join(', ')} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.featured_image} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Back Button */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4">
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-12">
          <div className="mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {blog.category?.charAt(0).toUpperCase() + blog.category?.slice(1)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 text-gray-400 mb-6 sm:mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                {blog.author?.charAt(0)}
              </div>
              <div>
                <div className="text-white font-medium">{blog.author}</div>
                <div className="text-sm">Author</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm sm:text-base">{format(new Date(blog.published_at), 'MMM dd, yyyy')}</span>
              </div>

              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm sm:text-base">{blog.reading_time} min read</span>
              </div>

              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span className="text-sm sm:text-base">{(blog.views || 0).toLocaleString()} views</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                liked
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{(blog.likes || 0).toLocaleString()}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {blog.featured_image && (
          <div className="mb-12">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none mb-12">
          <div
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
            className="text-gray-300 leading-relaxed"
          />
        </div>

        {/* Keywords */}
        {blog.keywords && blog.keywords.length > 0 && (
          <div className="mb-12">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 bg-emerald-600/20 text-emerald-300 px-3 py-1 rounded-full text-sm"
                >
                  <Tag className="w-3 h-3" />
                  <span>{keyword}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="border-t border-gray-700 pt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  to={`/blog/${relatedBlog.slug}`}
                  className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
                >
                  <img
                    src={relatedBlog.featured_image}
                    alt={relatedBlog.title}
                    className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {relatedBlog.title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}