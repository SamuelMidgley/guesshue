import { Game } from '@/types/Game'
import { create } from 'zustand'

interface GameState {
  game: Game | null
}

interface GameActions {
  setGame: (game: Game) => void
}

export const useGameStore = create<GameState & GameActions>((set) => ({
  game: null,
  setGame: (game) => set(() => ({ game })),
}))
