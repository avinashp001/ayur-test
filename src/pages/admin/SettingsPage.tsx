import React, { useState } from 'react'
import { Save, Globe, Shield, Bell, Palette, Database } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'AyurHealth',
    siteDescription: 'Holistic Wellness Blog',
    siteUrl: 'https://ayurhealth.com',
    adminEmail: 'admin@ayurhealth.com',
    enableComments: true,
    enableNewsletter: true,
    enableAnalytics: true,
    maintenanceMode: false,
    seoTitle: 'AyurHealth - Ancient Wisdom for Modern Wellness',
    seoDescription: 'Discover the timeless wisdom of Ayurveda, mental health insights, and natural healing practices.',
    socialTwitter: '@ayurhealth',
    socialFacebook: 'ayurhealth',
    socialInstagram: 'ayurhealth',
    primaryColor: '#10b981',
    secondaryColor: '#14b8a6'
  })

  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'social' | 'appearance' | 'advanced'>('general')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    alert('Settings saved successfully!')
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'seo', label: 'SEO', icon: Shield },
    { id: 'social', label: 'Social', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'advanced', label: 'Advanced', icon: Database }
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">Manage your blog configuration</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">General Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Site URL
                      </label>
                      <input
                        type="url"
                        value={settings.siteUrl}
                        onChange={(e) => setSettings(prev => ({ ...prev, siteUrl: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Site Description
                    </label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={settings.adminEmail}
                      onChange={(e) => setSettings(prev => ({ ...prev, adminEmail: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Features</h3>
                    {[
                      { key: 'enableComments', label: 'Enable Comments', description: 'Allow readers to comment on blog posts' },
                      { key: 'enableNewsletter', label: 'Enable Newsletter', description: 'Show newsletter signup forms' },
                      { key: 'enableAnalytics', label: 'Enable Analytics', description: 'Track visitor analytics and engagement' }
                    ].map((feature) => (
                      <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{feature.label}</div>
                          <div className="text-sm text-gray-400">{feature.description}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[feature.key as keyof typeof settings] as boolean}
                            onChange={(e) => setSettings(prev => ({ ...prev, [feature.key]: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">SEO Settings</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={settings.seoTitle}
                      onChange={(e) => setSettings(prev => ({ ...prev, seoTitle: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-400 mt-1">{settings.seoTitle.length}/60 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      SEO Description
                    </label>
                    <textarea
                      value={settings.seoDescription}
                      onChange={(e) => setSettings(prev => ({ ...prev, seoDescription: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-400 mt-1">{settings.seoDescription.length}/160 characters</p>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Social Media</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Twitter Handle
                      </label>
                      <input
                        type="text"
                        value={settings.socialTwitter}
                        onChange={(e) => setSettings(prev => ({ ...prev, socialTwitter: e.target.value }))}
                        placeholder="@username"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Facebook Page
                      </label>
                      <input
                        type="text"
                        value={settings.socialFacebook}
                        onChange={(e) => setSettings(prev => ({ ...prev, socialFacebook: e.target.value }))}
                        placeholder="pagename"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        value={settings.socialInstagram}
                        onChange={(e) => setSettings(prev => ({ ...prev, socialInstagram: e.target.value }))}
                        placeholder="username"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Appearance</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-700"
                        />
                        <input
                          type="text"
                          value={settings.primaryColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-700"
                        />
                        <input
                          type="text"
                          value={settings.secondaryColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Advanced Settings</h2>
                  
                  <div className="p-4 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-yellow-400">Maintenance Mode</div>
                        <div className="text-sm text-gray-400">Temporarily disable public access to your blog</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.maintenanceMode}
                          onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-red-600/10 border border-red-600/20 rounded-lg">
                    <h3 className="font-medium text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      These actions are irreversible. Please proceed with caution.
                    </p>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 rounded-lg transition-colors">
                        Reset All Settings
                      </button>
                      <button className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 rounded-lg transition-colors">
                        Clear All Analytics Data
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}