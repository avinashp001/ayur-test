import React from 'react'
import { useState, useEffect } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Users, 
  Heart, 
  Clock,
  Globe,
  Smartphone
} from 'lucide-react'
import { analyticsService, blogService, type Blog } from '../../lib/supabase'
import { useAuthenticatedSupabaseClient } from '../../hooks/useAuthenticatedSupabaseClient'

export default function AnalyticsDashboard() {
  const authenticatedClient = useAuthenticatedSupabaseClient()
  const [stats, setStats] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalBlogs: 0,
    avgReadingTime: '0:00'
  })
  const [viewsData, setViewsData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [topPosts, setTopPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const client = await authenticatedClient
        const [overallStats, weeklyViews, categoryStats, topPerforming] = await Promise.all([
          analyticsService.getOverallStats(client),
          analyticsService.getWeeklyViews(client),
          analyticsService.getCategoryStats(client),
          analyticsService.getTopPerformingBlogs(client, 4)
        ])

        setStats(overallStats)
        setViewsData(weeklyViews)
        
        // Transform category data with colors
        const colors = ['#10b981', '#14b8a6', '#06d6a0', '#65d9a5', '#34d399']
        const categoryWithColors = categoryStats.map((cat: any, index: number) => ({
          ...cat,
          color: colors[index % colors.length]
        }))
        setCategoryData(categoryWithColors)
        
        setTopPosts(topPerforming)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [authenticatedClient])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <div className="flex items-center mt-2 space-x-1">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {change}
            </span>
            <span className="text-gray-400 text-sm">vs last week</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-emerald-400" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          change="+12.5%"
          icon={Eye}
          trend="up"
        />
        <StatCard
          title="Unique Visitors"
          value={Math.floor(stats.totalViews * 0.7).toLocaleString()}
          change="+8.2%"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Total Likes"
          value={stats.totalLikes.toLocaleString()}
          change="+15.3%"
          icon={Heart}
          trend="up"
        />
        <StatCard
          title="Avg. Reading Time"
          value={stats.avgReadingTime}
          change="-2.1%"
          icon={Clock}
          trend="down"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white">Weekly Views</h3>
            <div className="hidden sm:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <span className="text-gray-400">Total Views</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                <span className="text-gray-400">Unique Views</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="unique" 
                stroke="#14b8a6" 
                strokeWidth={2}
                dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-6">Content by Category</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-white">Top Performing Posts</h3>
          <button className="hidden sm:block text-emerald-400 hover:text-emerald-300 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {topPosts.map((post, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors space-y-2 sm:space-y-0">
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1 line-clamp-2">{post.title}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{(post.views || 0).toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{Math.floor(((post.likes || 0) / (post.views || 1)) * 100)}% engagement</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 self-end sm:self-center">
                {(post.views || 0) > 1000 ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-semibold text-white">Top Countries</h3>
          </div>
          <div className="space-y-3">
            {[
              { country: 'India', percentage: 42 },
              { country: 'United States', percentage: 28 },
              { country: 'United Kingdom', percentage: 18 },
              { country: 'Canada', percentage: 12 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{item.country}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-semibold text-white">Device Types</h3>
          </div>
          <div className="space-y-3">
            {[
              { device: 'Mobile', percentage: 65 },
              { device: 'Desktop', percentage: 28 },
              { device: 'Tablet', percentage: 7 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{item.device}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-400 to-emerald-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-semibold text-white">Peak Hours</h3>
          </div>
          <div className="space-y-3">
            {[
              { time: '2:00 PM - 4:00 PM', percentage: 35 },
              { time: '8:00 PM - 10:00 PM', percentage: 28 },
              { time: '10:00 AM - 12:00 PM', percentage: 22 },
              { time: '6:00 PM - 8:00 PM', percentage: 15 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300 text-xs sm:text-sm">{item.time}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}