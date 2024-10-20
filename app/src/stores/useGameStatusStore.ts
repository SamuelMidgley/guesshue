import { GameStatus } from '@/types/GameStatus'
import { create } from 'zustand'

interface GameStatusStore {
  gameStatus: GameStatus
  setGameStaus: (gameStatus: GameStatus) => void
}

export const useGameStatusStore = create<GameStatusStore>((set) => ({
  gameStatus: 'home',
  setGameStaus: (newGameStatus) => set(() => ({ gameStatus: newGameStatus })),
}))
