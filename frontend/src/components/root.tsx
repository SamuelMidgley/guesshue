import { Outlet, useLocation } from 'react-router-dom'
import { NavBar } from './nav-bar/nav-bar'
import { useThemeHandler } from '@/hooks'

export const Root = () => {
  const location = useLocation()
  useThemeHandler()

  if (location.pathname === '/login' || location.pathname === '/register') {
    return <Outlet />
  }

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
