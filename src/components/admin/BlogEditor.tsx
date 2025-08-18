import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Save, Eye, Settings, Image, Tag } from 'lucide-react'
import type { Blog } from '../../lib/supabase'
import { blogService } from '../../lib/supabase'
import { useUser } from '@clerk/clerk-react'
import { useAuthenticatedSupabaseClient } from '../../hooks/useAuthenticatedSupabaseClient'

export default function BlogEditor() {
  const { user } = useUser()
  const authenticatedClient = useAuthenticatedSupabaseClient()
  const [blog, setBlog] = useState<Partial<Blog>>({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    keywords: [],
    featured_image: '',
    author: user?.fullName || 'Admin',
    published: false,
    category: 'ayurveda'
  })

  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content')
  const [keywordInput, setKeywordInput] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const client = await authenticatedClient
      if (blog.id) {
        await blogService.updateBlog(client, blog.id, blog)
      } else {
        const newBlog = await blogService.createBlog(client, {
          ...blog,
          views: 0,
          likes: 0,
          reading_time: Math.ceil((blog.content?.length || 0) / 200) // Rough estimate
        } as Omit<Blog, 'id' | 'created_at' | 'updated_at'>)
        setBlog(newBlog)
      }
      alert('Blog saved successfully!')
    } catch (error) {
      console.error('Error saving blog:', error)
      alert('Error saving blog. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setBlog(prev => ({ ...prev, published: true, published_at: new Date().toISOString() }))
    await handleSave()
  }

  const addKeyword = () => {
    if (keywordInput.trim()) {
      setBlog(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), keywordInput.trim()]
      }))
      setKeywordInput('')
    }
  }

  const removeKeyword = (index: number) => {
    setBlog(prev => ({
      ...prev,
      keywords: prev.keywords?.filter((_, i) => i !== index)
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Create New Blog Post</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Draft'}</span>
            </button>
            <button 
              onClick={handlePublish}
              disabled={saving}
              className="flex items-center justify-center space-x-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              <span>{saving ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="xl:col-span-3">
            <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-gray-700">
                {[
                  { id: 'content', label: 'Content', icon: Eye },
                  { id: 'seo', label: 'SEO', icon: Settings },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 sm:px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-emerald-400 border-b-2 border-emerald-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-4 sm:p-6">
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Blog Title
                      </label>
                      <input
                        type="text"
                        value={blog.title || ''}
                        onChange={(e) => {
                          setBlog(prev => ({ 
                            ...prev, 
                            title: e.target.value,
                            slug: generateSlug(e.target.value)
                          }))
                        }}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter blog title..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Content
                      </label>
                      <div data-color-mode="dark">
                        <MDEditor
                          value={blog.content || ''}
                          onChange={(val) => setBlog(prev => ({ ...prev, content: val || '' }))}
                          preview="edit"
                          height={400}
                          visibleDragBar={false}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={blog.excerpt || ''}
                        onChange={(e) => setBlog(prev => ({ ...prev, excerpt: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Brief description for blog preview..."
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={blog.meta_title || ''}
                        onChange={(e) => setBlog(prev => ({ ...prev, meta_title: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="SEO optimized title..."
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        {(blog.meta_title || '').length}/60 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={blog.meta_description || ''}
                        onChange={(e) => setBlog(prev => ({ ...prev, meta_description: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="SEO meta description..."
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        {(blog.meta_description || '').length}/160 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Keywords
                      </label>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Add keyword..."
                        />
                        <button
                          onClick={addKeyword}
                          className="px-3 sm:px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors whitespace-nowrap"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {blog.keywords?.map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center space-x-1 bg-emerald-600/20 text-emerald-300 px-3 py-1 rounded-full text-sm"
                          >
                            <Tag className="w-3 h-3" />
                            <span>{keyword}</span>
                            <button
                              onClick={() => removeKeyword(index)}
                              className="text-emerald-400 hover:text-emerald-300"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={blog.slug || ''}
                        onChange={(e) => setBlog(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="url-slug"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={blog.category || 'ayurveda'}
                        onChange={(e) => setBlog(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="ayurveda">Ayurveda</option>
                        <option value="mental-health">Mental Health</option>
                        <option value="nutrition">Nutrition</option>
                        <option value="yoga">Yoga & Meditation</option>
                        <option value="wellness">General Wellness</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Featured Image URL
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          value={blog.featured_image || ''}
                          onChange={(e) => setBlog(prev => ({ ...prev, featured_image: e.target.value }))}
                          className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="https://example.com/image.jpg"
                        />
                        <button className="flex items-center space-x-2 px-3 sm:px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors whitespace-nowrap">
                          <Image className="w-4 h-4" />
                          <span className="hidden sm:inline">Upload</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        value={blog.author || ''}
                        onChange={(e) => setBlog(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Author name..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="space-y-6">
              {/* Publish Status */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Publish Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      blog.published 
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Visibility:</span>
                    <span className="text-gray-400 text-sm">Public</span>
                  </div>
                </div>
              </div>

              {/* SEO Score */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">SEO Score</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">85</div>
                  <div className="text-sm text-gray-400 mb-4">Good optimization</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Title</span>
                      <span className="text-green-400">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Meta Desc</span>
                      <span className="text-green-400">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Keywords</span>
                      <span className="text-yellow-400">!</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reading Time */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Readability</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Reading Time:</span>
                    <span className="text-gray-400">~5 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Word Count:</span>
                    <span className="text-gray-400">1,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Grade Level:</span>
                    <span className="text-emerald-400">8th grade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}