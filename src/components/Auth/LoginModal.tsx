import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, User, AlertCircle } from 'lucide-react'
import { signUp, signIn } from '../../lib/auth'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, fullName)
        if (error) throw error
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
        onClose()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-panel p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-chrome mb-2">Fisher</h1>
          <p className="text-silver">Command Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm text-silver mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-silver/50 w-5 h-5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Judy Fisher"
                  className="w-full pl-10 pr-4 py-2 bg-charcoal border border-silver/20 rounded-lg text-chrome focus:outline-none focus:border-primary-500 transition"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-silver mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-silver/50 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 bg-charcoal border border-silver/20 rounded-lg text-chrome focus:outline-none focus:border-primary-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-silver mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-silver/50 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 bg-charcoal border border-silver/20 rounded-lg text-chrome focus:outline-none focus:border-primary-500 transition"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-gap-2 p-3 bg-error/10 border border-error/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-silver">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setError('')
              }}
              className="text-primary-400 hover:text-primary-300 transition"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
