import { Lobby } from '@/types/Lobby'
import { create } from 'zustand'

interface LobbyState {
  lobby: Lobby
}

interface LobbyActions {
  setLobby: (newLobby: Lobby) => void
}

export const useLobbyStore = create<LobbyState & LobbyActions>((set) => ({
  lobby: {
    id: '',
    users: [],
    games: [],
  },
  setLobby: (newLobby) => set(() => ({ lobby: newLobby })),
}))
