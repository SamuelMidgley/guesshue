import { GameStatus } from '@/types/GameStatus'
import { create } from 'zustand'

interface GameStatusState {
  gameStatus: GameStatus
}

interface GameStatusActions {
  setGameStaus: (gameStatus: GameStatus) => void
}

export const useGameStatusStore = create<GameStatusState & GameStatusActions>(
  (set) => ({
    gameStatus: 'home',
    setGameStaus: (newGameStatus) => set(() => ({ gameStatus: newGameStatus })),
  })
)
