import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, User } from 'lucide-react'
import { useAuthStore } from '../../store/auth'
import NotificationCenter from '../Notifications/NotificationCenter'

interface HeaderProps {
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  const user = useAuthStore((state) => state.user)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="glass-panel backdrop-blur-md border-b border-silver/10 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-chrome">Executive Dashboard</h2>
        <p className="text-xs text-silver">Real-time Command Center</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <NotificationCenter />

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 hover:bg-silver/10 rounded-lg transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-warning-500" />
          ) : (
            <Moon className="w-5 h-5 text-silver" />
          )}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-silver/10 rounded-lg transition"
          >
            <User className="w-5 h-5" />
            <span className="text-sm">{user?.email || 'User'}</span>
          </button>

          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-48 glass-panel p-2 z-50"
            >
              <button className="w-full text-left px-4 py-2 hover:bg-silver/10 rounded transition text-sm">
                Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-silver/10 rounded transition text-sm">
                Preferences
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}
