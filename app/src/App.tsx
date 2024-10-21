import { useEffect } from 'react'
import { socket } from '@/socket'
import {
  useGameStatusStore,
  useGameStore,
  useLobbyStore,
  useUserStore,
} from './stores'
import { User } from './types/User'
import { GameStatus } from './types/GameStatus'
import { Router } from './components/Router'
import { Game } from './types/Game'
import { Lobby } from './types/Lobby'
import { useHandleSocketConnection } from './hooks'

export const App = () => {
  const setLobby = useLobbyStore((state) => state.setLobby)
  const setGameStaus = useGameStatusStore((state) => state.setGameStaus)
  const setUser = useUserStore((state) => state.setUser)
  const setGame = useGameStore((state) => state.setGame)

  const isConnected = useHandleSocketConnection()

  useEffect(() => {
    socket.on('game-status', (gameStatus: GameStatus) => {
      console.log('new game status received from server:', gameStatus)

      setGameStaus(gameStatus)
    })

    socket.on('logged-in', (user: User) => {
      console.log('user logged in received from server:', user)

      setUser(user)
    })

    socket.on('new-game', (game: Game) => {
      console.log('new game received from server:', game)

      setGame(game)
    })

    socket.on('game-update', (game: Game) => {
      console.log('game update received from server:', game)

      setGame(game)
    })

    socket.on('lobby-created', (lobby: Lobby) => {
      console.log('new lobby created and received from server:', lobby)

      setLobby(lobby)
    })

    socket.on('lobby-updated', (lobby: Lobby) => {
      console.log('updated lobby received from server:', lobby)

      setLobby(lobby)
    })

    return () => {
      socket.off('lobby')
      socket.off('game-status')
      socket.off('logged-in')
      socket.off('new-game')
      socket.off('lobby-created')
      socket.off('lobby-updated')
    }
  }, [])

  return isConnected ? <Router /> : <p>Loading...</p>
}
