import { Theme } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ThemeState {
  theme: Theme
}

interface ThemeActions {
  setTheme: (theme: Theme) => void
}

const isDarkMode = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set) => ({
      theme: isDarkMode() ? 'dark' : 'light',
      setTheme: (theme) => set(() => ({ theme })),
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
