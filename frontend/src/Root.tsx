import { Outlet, useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { useThemeStore } from './stores/useThemeStore'
import { NavBar } from './components/nav-bar/nav-bar'
import { useUserStore } from './stores'

export const Root = () => {
  const { theme } = useThemeStore()
  const { id } = useUserStore()
  const navigate = useNavigate()

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

  useLayoutEffect(() => {
    if (!id) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
