import { Game, GamePlayer } from '@/types/Game'
import { create } from 'zustand'

interface GameState {
  game: Game | null
  gamePlayers: GamePlayer[]
}

interface GameActions {
  setGame: (game: Game) => void
  setGamePlayers: (newPlayers: GamePlayer[]) => void
}

export const useGameStore = create<GameState & GameActions>((set) => ({
  game: null,
  gamePlayers: [],
  setGame: (game) => set(() => ({ game })),
  setGamePlayers: (gamePlayers) => set(() => ({ gamePlayers })),
}))
