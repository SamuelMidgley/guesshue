import { Router } from './components/Router'
import {
  useAuthSocketHandler,
  useGameSocketHandler,
  useHandleSocketConnection,
} from './hooks'

export const App = () => {
  const isConnected = useHandleSocketConnection()

  useAuthSocketHandler()
  useGameSocketHandler()

  return isConnected ? <Router /> : <p>Loading...</p>
}
