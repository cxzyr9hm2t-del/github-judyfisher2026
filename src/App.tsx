import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoginModal from './components/Auth/LoginModal'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import CRM from './pages/CRM'
import Inventory from './pages/Inventory'
import Marketing from './pages/Marketing'
import { useAuthStore } from './store/auth'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(true)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)

  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rich-black flex items-center justify-center">
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-chrome mb-4">Fisher</h1>
          <p className="text-silver">Command Center</p>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginModal isOpen={!isAuthenticated} onClose={() => {}} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'events':
        return <Events />
      case 'crm':
        return <CRM />
      case 'inventory':
        return <Inventory />
      case 'marketing':
        return <Marketing />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className={`min-h-screen bg-rich-black transition-colors ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-80 overflow-hidden">
          {/* Header */}
          <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
