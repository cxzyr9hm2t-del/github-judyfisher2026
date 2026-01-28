import { create } from 'zustand'
import { getCurrentUser, onAuthStateChange } from '../lib/auth'

interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  initializeAuth: () => Promise<void>
  setAuthState: (isAuthenticated: boolean, user: User | null) => void
}

export const useAuthStore = create<AuthState>((set) => {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    initializeAuth: async () => {
      const user = await getCurrentUser()
      set({
        user: user || null,
        isAuthenticated: !!user,
        isLoading: false,
      })
      onAuthStateChange(() => {
        (async () => {
          const currentUser = await getCurrentUser()
          set({
            isAuthenticated: !!currentUser,
            user: currentUser || null,
            isLoading: false,
          })
        })()
      })
    },
    setAuthState: (isAuthenticated, user) => {
      set({ isAuthenticated, user, isLoading: false })
    },
  }
})
