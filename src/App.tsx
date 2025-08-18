import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import BlogsPage from './pages/BlogsPage'
import CategoryPage from './pages/CategoryPage'
import BlogDetailPage from './pages/BlogDetailPage'
import AboutPage from './pages/AboutPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateBlog from './pages/admin/CreateBlog'
import AllBlogsPage from './pages/admin/AllBlogsPage'
import SEOToolsPage from './pages/admin/SEOToolsPage'
import SettingsPage from './pages/admin/SettingsPage'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            {/* Admin Routes - No Header/Footer */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/blogs/create" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <CreateBlog />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/blogs" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AllBlogsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/seo" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <SEOToolsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Public Routes - With Header/Footer */}
            <Route 
              path="/*" 
              element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/categories/:category" element={<CategoryPage />} />
                    <Route path="/blog/:slug" element={<BlogDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                  </Routes>
                  <Footer />
                </>
              } 
            />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App