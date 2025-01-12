import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAuthStore } from './stores/useAuthStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      retryDelay: 3000,
    },
  },
  queryCache: new QueryCache({
    onError: (TError) => {
      const error = TError as AxiosError

      if (error.status === 404) {
        useAuthStore.getState().logOut()
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (TError) => {
      const error = TError as AxiosError

      if (error.status === 404) {
        useAuthStore.getState().logOut()
      }
    },
  }),
})

const router = createBrowserRouter([
  {
    path: '/',
    async lazy() {
      const { Root } = await import('./components/root')
      return { Component: Root }
    },
    // loader: rootLoader,
    children: [
      {
        path: 'login',
        async lazy() {
          const { Login } = await import('./pages/login')
          return { Component: Login }
        },
      },
      {
        path: 'register',
        async lazy() {
          const { Register } = await import('./pages/register')
          return { Component: Register }
        },
      },
      {
        path: '',
        async lazy() {
          const { Home } = await import('./pages/home')
          return { Component: Home }
        },
      },
      {
        path: 'profile/:id',
        async lazy() {
          const { Profile } = await import('./pages/profile')
          return { Component: Profile }
        },
      },
      {
        path: 'settings',
        async lazy() {
          const { Settings } = await import('./pages/settings')
          return { Component: Settings }
        },
      },
      {
        path: 'leaderboards',
        async lazy() {
          const { Leaderboard } = await import('./pages/leaderboard')
          return { Component: Leaderboard }
        },
      },
      {
        path: 'game',
        async lazy() {
          const { Game } = await import('./pages/game')
          return { Component: Game }
        },
      },
      {
        path: 'game/quick-play',
        async lazy() {
          const { QuickPlay } = await import('./pages/game')
          return { Component: QuickPlay }
        },
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
