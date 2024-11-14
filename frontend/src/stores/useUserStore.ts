import { User } from '@/types/user'
import { create } from 'zustand'

interface UserState {
  user: User | null
}

interface UserActions {
  setUser: (user: User) => void
}

export const useUserStore = create<UserState & UserActions>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}))
