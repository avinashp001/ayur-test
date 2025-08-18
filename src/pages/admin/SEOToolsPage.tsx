import React, { useState, useEffect } from 'react'
import { Search, TrendingUp, Target, Globe, BarChart3, CheckCircle, AlertCircle } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { blogService, type Blog } from '../../lib/supabase'
import { useAuthenticatedSupabaseClient } from '../../hooks/useAuthenticatedSupabaseClient'

export default function SEOToolsPage() {
  const authenticatedClient = useAuthenticatedSupabaseClient()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const client = await authenticatedClient
        const data = await blogService.getAllBlogs(client)
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [authenticatedClient])

  const analyzeSEO = (blog: Blog) => {
    const issues = []
    const suggestions = []
    let score = 100

    // Title analysis
    if (!blog.title || blog.title.length < 30) {
      issues.push('Title is too short (recommended: 30-60 characters)')
      score -= 15
    } else if (blog.title.length > 60) {
      issues.push('Title is too long (recommended: 30-60 characters)')
      score -= 10
    }

    // Meta description analysis
    if (!blog.meta_description) {
      issues.push('Missing meta description')
      score -= 20
    } else if (blog.meta_description.length < 120) {
      issues.push('Meta description is too short (recommended: 120-160 characters)')
      score -= 10
    } else if (blog.meta_description.length > 160) {
      issues.push('Meta description is too long (recommended: 120-160 characters)')
      score -= 10
    }

    // Keywords analysis
    if (!blog.keywords || blog.keywords.length === 0) {
      issues.push('No keywords defined')
      score -= 15
    } else if (blog.keywords.length < 3) {
      suggestions.push('Consider adding more keywords (3-5 recommended)')
      score -= 5
    }

    // Content analysis
    if (!blog.content || blog.content.length < 1000) {
      issues.push('Content is too short (recommended: 1000+ words)')
      score -= 15
    }

    // Featured image
    if (!blog.featured_image) {
      issues.push('Missing featured image')
      score -= 10
    }

    // Slug analysis
    if (!blog.slug || blog.slug.length > 50) {
      issues.push('URL slug should be shorter and more descriptive')
      score -= 5
    }

    return { score: Math.max(0, score), issues, suggestions }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-600'
    if (score >= 60) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading SEO analysis...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">SEO Tools</h1>
          <p className="text-gray-400">Analyze and optimize your blog posts for search engines</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Blog List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Blog Posts</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {blogs.map((blog) => {
                  const seoAnalysis = analyzeSEO(blog)
                  return (
                    <button
                      key={blog.id}
                      onClick={() => setSelectedBlog(blog)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedBlog?.id === blog.id
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-gray-700 hover:border-gray-600 bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white text-sm line-clamp-1">{blog.title}</h3>
                        <div className={`text-xs font-bold ${getScoreColor(seoAnalysis.score)}`}>
                          {seoAnalysis.score}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getScoreBg(seoAnalysis.score)}`}
                            style={{ width: `${seoAnalysis.score}%` }}
                          />
                        </div>
                        <span className={`text-xs ${blog.published ? 'text-green-400' : 'text-yellow-400'}`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* SEO Analysis */}
          <div className="lg:col-span-2">
            {selectedBlog ? (
              <div className="space-y-6">
                {/* SEO Score Card */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">SEO Analysis</h2>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(analyzeSEO(selectedBlog).score)}`}>
                        {analyzeSEO(selectedBlog).score}
                      </div>
                      <div className="text-sm text-gray-400">SEO Score</div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-white mb-2 line-clamp-2">{selectedBlog.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">/{selectedBlog.slug}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{selectedBlog.views || 0}</div>
                      <div className="text-xs text-gray-400">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{selectedBlog.likes || 0}</div>
                      <div className="text-xs text-gray-400">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{selectedBlog.reading_time || 0}</div>
                      <div className="text-xs text-gray-400">Min Read</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{selectedBlog.keywords?.length || 0}</div>
                      <div className="text-xs text-gray-400">Keywords</div>
                    </div>
                  </div>
                </div>

                {/* Issues and Suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Issues */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <h3 className="text-lg font-semibold text-white">Issues</h3>
                    </div>
                    <div className="space-y-3">
                      {analyzeSEO(selectedBlog).issues.map((issue, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">{issue}</p>
                        </div>
                      ))}
                      {analyzeSEO(selectedBlog).issues.length === 0 && (
                        <div className="flex items-center space-x-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">No critical issues found!</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-lg font-semibold text-white">Suggestions</h3>
                    </div>
                    <div className="space-y-3">
                      {analyzeSEO(selectedBlog).suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">{suggestion}</p>
                        </div>
                      ))}
                      {analyzeSEO(selectedBlog).suggestions.length === 0 && (
                        <div className="flex items-center space-x-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">All optimizations look good!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* SEO Checklist */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">SEO Checklist</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Title (30-60 chars)', check: selectedBlog.title && selectedBlog.title.length >= 30 && selectedBlog.title.length <= 60 },
                      { label: 'Meta Description (120-160 chars)', check: selectedBlog.meta_description && selectedBlog.meta_description.length >= 120 && selectedBlog.meta_description.length <= 160 },
                      { label: 'Keywords (3+ tags)', check: selectedBlog.keywords && selectedBlog.keywords.length >= 3 },
                      { label: 'Featured Image', check: !!selectedBlog.featured_image },
                      { label: 'Content Length (1000+ words)', check: selectedBlog.content && selectedBlog.content.length >= 1000 },
                      { label: 'URL Slug Optimized', check: selectedBlog.slug && selectedBlog.slug.length <= 50 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {item.check ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`text-sm ${item.check ? 'text-green-400' : 'text-gray-400'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Select a Blog Post</h3>
                <p className="text-gray-400">Choose a blog post from the list to analyze its SEO performance</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}