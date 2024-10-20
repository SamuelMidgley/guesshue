import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { Home } from '@/components/Home/Home'
import { useLobbyStore } from './stores'
import { User } from './types/User'

export const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const setLobby = useLobbyStore((state) => state.setLobby)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
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
    // Listen for the 'list' event from the server
    socket.on('lobby', (data: User[]) => {
      console.log('List received from server:', data)
      setLobby(data)
    })

    // Clean up the socket connection
    return () => {
      socket.off('lobby')
    }
  }, [])

  return isConnected ? <Home /> : <p>Loading...</p>
}
