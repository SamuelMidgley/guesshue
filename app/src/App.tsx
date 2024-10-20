import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { Home } from '@/components/Home/Home'
import { useLobbyStore } from './stores'
import { User } from './types/User'

export const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const setLobby = useLobbyStore((state) => state.setLobby)

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  useEffect(() => {
    socket.on('lobby', (data: User[]) => {
      console.log('List received from server:', data)
      setLobby(data)
    })

    return () => {
      socket.off('lobby')
    }
  }, [])

  return isConnected ? <Home /> : <p>Loading...</p>
}
