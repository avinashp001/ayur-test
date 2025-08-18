import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Edit, Trash2, Eye, Calendar, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'
import AdminLayout from '../../components/admin/AdminLayout'
import { blogService, type Blog } from '../../lib/supabase'
import { useAuthenticatedSupabaseClient } from '../../hooks/useAuthenticatedSupabaseClient'

export default function AllBlogsPage() {
  const authenticatedClient = useAuthenticatedSupabaseClient()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

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

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'published') return blog.published
    if (filter === 'draft') return !blog.published
    return true
  })

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const client = await authenticatedClient
      // Note: You'd need to implement deleteBlog in your service
      // await blogService.deleteBlog(client, id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Error deleting blog')
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading blogs...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">All Blogs</h1>
            <p className="text-gray-400">Manage your blog posts</p>
          </div>
          <Link
            to="/admin/blogs/create"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-lg text-center"
          >
            Create New Blog
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap space-x-1 bg-gray-800 p-1 rounded-lg mb-6 w-full sm:w-fit overflow-x-auto">
          {[
            { id: 'all', label: 'All Posts', count: blogs.length },
            { id: 'published', label: 'Published', count: blogs.filter(b => b.published).length },
            { id: 'draft', label: 'Drafts', count: blogs.filter(b => !b.published).length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 sm:px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                filter === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Blogs Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-300">Title</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-300 hidden sm:table-cell">Status</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-300 hidden md:table-cell">Category</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-300 hidden lg:table-cell">Views</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-300 hidden lg:table-cell">Date</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-700/50">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center space-x-3">
                        <div className="hidden sm:block">
                          <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="w-10 sm:w-12 h-10 sm:h-12 object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-white line-clamp-2 text-sm sm:text-base">{blog.title}</div>
                          <div className="text-xs sm:text-sm text-gray-400 line-clamp-1 hidden sm:block">{blog.excerpt}</div>
                          <div className="sm:hidden flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              blog.published
                                ? 'bg-green-600/20 text-green-400'
                                : 'bg-yellow-600/20 text-yellow-400'
                            }`}>
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="text-xs text-gray-400 capitalize">{blog.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog.published
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-300 capitalize hidden md:table-cell">
                      {blog.category}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Eye className="w-4 h-4" />
                        <span>{(blog.views || 0).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-300 hidden lg:table-cell">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{format(new Date(blog.created_at), 'MMM dd, yyyy')}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Link
                          to={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-emerald-400 hover:bg-gray-700 rounded-lg transition-colors"
                          title="View Blog"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                          title="Edit Blog"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-white mb-2">No blogs found</h3>
              <p className="text-gray-400 mb-4">
                {filter === 'all' 
                  ? "You haven't created any blogs yet."
                  : `No ${filter} blogs found.`
                }
              </p>
              <Link
                to="/admin/blogs/create"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Create Your First Blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}