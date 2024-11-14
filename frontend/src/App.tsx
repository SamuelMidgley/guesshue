import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './components/root'
import { Profile } from './pages/profile'
import { Home } from './pages/home'
import { Login } from './pages/login'
import Register from './pages/register'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Settings } from './pages/settings'
import { Leaderboards } from './pages/leaderboards'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // loader: rootLoader,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile/:id',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'leaderboards',
        element: <Leaderboards />,
      },
    ],
  },
])

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
