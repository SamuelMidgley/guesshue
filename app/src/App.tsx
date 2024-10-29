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
import { Game, GamePlayer } from './types/Game'
import { useHandleSocketConnection } from './hooks'

export const App = () => {
  const setGameStaus = useGameStatusStore((state) => state.setGameStaus)
  const setUser = useUserStore((state) => state.setUser)
  const setGame = useGameStore((state) => state.setGame)
  const setGamePlayers = useGameStore((state) => state.setGamePlayers)

  const isConnected = useHandleSocketConnection()

  useEffect(() => {
    socket.on('gameStatus', (gameStatus: GameStatus) => {
      console.log('new game status received from server:', gameStatus)

      setGameStaus(gameStatus)
    })

    socket.on('loggedIn', (user: User) => {
      console.log('user logged in received from server:', user)

      setUser(user)
    })

    socket.on('gameCreated', (game: Game) => {
      console.log('new game received from server:', game)

      setGame(game)
    })

    socket.on('gameJoined', (game: Game) => {
      console.log('joined game received from server:', game)

      setGame(game)
    })

    socket.on('gamePlayersUpdated', (gamePlayers: GamePlayer[]) => {
      console.log('new game players have joined', gamePlayers)

      setGamePlayers(gamePlayers)
    })

    return () => {
      socket.off('gameCreated')
      socket.off('gameStatus')
      socket.off('loggedIn')
      socket.off('gamePlayersUpdated')
      socket.off('gameJoined')
    }
  }, [])

  return isConnected ? <Router /> : <p>Loading...</p>
}
