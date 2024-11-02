import { socket } from '@/socket'
import { useGameStatusStore, useGameStore } from '@/stores'
import { Game, GamePlayer } from '@/types/Game'
import { GameStatus } from '@/types/GameStatus'
import { useEffect } from 'react'

export const useGameSocketHandler = () => {
  const setGameStaus = useGameStatusStore((state) => state.setGameStaus)
  const setGame = useGameStore((state) => state.setGame)
  const setGamePlayers = useGameStore((state) => state.setGamePlayers)

  useEffect(() => {
    socket.on('gameStatus', (gameStatus: GameStatus) => {
      console.log('new game status received from server:', gameStatus)

      setGameStaus(gameStatus)
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
      socket.off('gamePlayersUpdated')
      socket.off('gameJoined')
    }
  }, [])
}
