import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
}

interface AuthActions {
  setToken: (token: string) => void
  logOut: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set(() => ({ token })),
      logOut: () => set(() => ({ token: null })),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
