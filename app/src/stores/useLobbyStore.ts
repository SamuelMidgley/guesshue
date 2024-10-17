import { User } from '@/types/User'
import { create } from 'zustand'

interface LobbyState {
  lobby: User[]
}

interface LobbyActions {
  setLobby: (newLobby: User[]) => void
}

export const useLobbyStore = create<LobbyState & LobbyActions>((set) => ({
  lobby: [],
  setLobby: (newLobby) => set(() => ({ lobby: newLobby })),
}))
