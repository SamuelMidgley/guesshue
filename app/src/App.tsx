import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { useGameStatusStore, useLobbyStore, useUserStore } from './stores'
import { User } from './types/User'
import { GameStatus } from './types/GameStatus'
import { Router } from './components/Router'

export const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const setLobby = useLobbyStore((state) => state.setLobby)
  const setGameStaus = useGameStatusStore((state) => state.setGameStaus)
  const setUser = useUserStore((state) => state.setUser)

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
      console.log('new lobby list received from server:', data)

      setLobby(data)
    })

    socket.on('game-status', (gameStatus: GameStatus) => {
      console.log('new game status received from server:', gameStatus)

      setGameStaus(gameStatus)
    })

    socket.on('logged-in', (user: User) => {
      console.log('user logged in received from server:', user)

      setUser(user)
    })

    return () => {
      socket.off('lobby')
      socket.off('game-status')
      socket.off('logged-in')
    }
  }, [])

  return isConnected ? <Router /> : <p>Loading...</p>
}
