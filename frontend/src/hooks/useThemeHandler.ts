import { useThemeStore } from '@/stores/useThemeStore'
import { useLayoutEffect } from 'react'

export const useThemeHandler = () => {
  const theme = useThemeStore((state) => state.theme)

  useLayoutEffect(() => {
    const htmlElement = document.querySelector('html')

    if (!htmlElement) {
      return
    }

    const darkModeSet = htmlElement.classList.contains('dark')

    if (theme === 'dark' && !darkModeSet) {
      htmlElement.classList.add('dark')
      return
    }

    if (theme === 'light' && darkModeSet) {
      htmlElement.classList.remove('dark')
    }
  }, [theme])
}
