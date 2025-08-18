import React from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  TrendingUp, 
  Eye,
  Edit,
  Plus,
  Leaf,
  LogOut
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'All Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Create Blog', href: '/admin/blogs/create', icon: Plus },
    { name: 'SEO Tools', href: '/admin/seo', icon: Eye },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="lg:flex h-screen">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out lg:transition-none`}>
          <div className="flex items-center space-x-2 p-6 border-b border-gray-700">
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">AyurHealth</h1>
              <p className="text-xs text-emerald-400">Admin Panel</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors w-full">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <header className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-400 hover:text-white"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  {navigation.find(item => item.href === location.pathname)?.name || 'Admin Panel'}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}