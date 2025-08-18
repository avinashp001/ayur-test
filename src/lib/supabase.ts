import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

// Create a function to get Supabase client with optional JWT
export function getSupabaseClient(jwt?: string): SupabaseClient {
  const client = createClient(supabaseUrl, supabaseKey)
  
  if (jwt) {
    client.auth.setSession({
      access_token: jwt,
      refresh_token: '',
    })
  }
  
  return client
}

// Default unauthenticated client for public operations
export const supabase = getSupabaseClient()

export type Blog = {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  meta_title: string
  meta_description: string
  keywords: string[]
  featured_image: string
  author: string
  published: boolean
  published_at: string
  created_at: string
  updated_at: string
  views: number
  likes: number
  reading_time: number
  category: string
}

export type BlogAnalytics = {
  id: string
  blog_id: string
  views: number
  unique_views: number
  bounce_rate: number
  avg_time_spent: number
  referrers: Record<string, number>
  countries: Record<string, number>
  devices: Record<string, number>
  date: string
}

// Blog operations
export const blogService = {
  async getAllBlogs(client: SupabaseClient) {
    const { data, error } = await client
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getPublishedBlogs(client: SupabaseClient) {
    const { data, error } = await client
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getBlogBySlug(client: SupabaseClient, slug: string) {
    const { data, error } = await client
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  },

  async createBlog(client: SupabaseClient, blog: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await client
      .from('blogs')
      .insert([{
        ...blog,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateBlog(client: SupabaseClient, id: string, updates: Partial<Blog>) {
    const { data, error } = await client
      .from('blogs')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async incrementViews(client: SupabaseClient, id: string) {
    const { error } = await client.rpc('increment_blog_views', { blog_id: id })
    if (error) throw error
  },

  async incrementLikes(client: SupabaseClient, id: string) {
    const { error } = await client.rpc('increment_blog_likes', { blog_id: id })
    if (error) throw error
  }
}

// Analytics operations
export const analyticsService = {
  async getOverallStats(client: SupabaseClient) {
    const { data: blogs } = await client
      .from('blogs')
      .select('views, likes, published')
      .eq('published', true)
    
    const totalViews = blogs?.reduce((sum, blog) => sum + (blog.views || 0), 0) || 0
    const totalLikes = blogs?.reduce((sum, blog) => sum + (blog.likes || 0), 0) || 0
    const totalBlogs = blogs?.length || 0
    
    return {
      totalViews,
      totalLikes,
      totalBlogs,
      avgReadingTime: '4:32' // This would be calculated from actual reading time data
    }
  },

  async getTopPerformingBlogs(client: SupabaseClient, limit = 10) {
    const { data, error } = await client
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('views', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async getCategoryStats(client: SupabaseClient) {
    const { data, error } = await client
      .from('blogs')
      .select('category, views')
      .eq('published', true)
    
    if (error) throw error
    
    const categoryStats = data?.reduce((acc: Record<string, number>, blog) => {
      acc[blog.category] = (acc[blog.category] || 0) + (blog.views || 0)
      return acc
    }, {}) || {}
    
    return Object.entries(categoryStats).map(([name, views]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: views
    }))
  },

  async getWeeklyViews(client: SupabaseClient) {
    // This would typically come from a more detailed analytics table
    // For now, we'll return mock data that would be replaced with real queries
    const { data } = await client
      .from('blogs')
      .select('views, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(7)
    
    // Transform data into weekly format
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return days.map((name, index) => ({
      name,
      views: data?.[index]?.views || Math.floor(Math.random() * 1000) + 500,
      unique: Math.floor((data?.[index]?.views || 500) * 0.7)
    }))
  }
}