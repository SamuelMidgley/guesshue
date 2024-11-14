import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './Root'
import { Profile } from './pages/profile'
import { Home } from './pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // loader: rootLoader,
    children: [
      {
        path: 'login',
        element: <Home />,
      },
      {
        path: 'register',
        element: <Home />,
      },
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile/:id',
        element: <Profile />,
      },
    ],
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
