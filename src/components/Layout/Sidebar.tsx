import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Package,
  TrendingUp,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { signOut } from '../../lib/auth'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'crm', label: 'CRM', icon: Users },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp },
]

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-silver/10 rounded-lg"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-80 glass-panel backdrop-blur-md border-r border-silver/10 flex flex-col z-30 md:relative md:translate-x-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-silver/10">
          <h1 className="text-2xl font-bold text-chrome">Fisher</h1>
          <p className="text-xs text-silver">Command Center</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onPageChange(item.id)
                      setIsOpen(false)
                    }}
                    className={`w-full nav-item ${isActive ? 'nav-item-active' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sign Out Button */}
        <div className="p-4 border-t border-silver/10">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-error/20 text-error rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
