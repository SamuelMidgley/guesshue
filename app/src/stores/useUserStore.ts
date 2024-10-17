import { create } from 'zustand'

interface UserState {
  id: string | null
  name: string | null
}

interface UserActions {
  setUser: ({ id, name }: { id?: string; name?: string }) => void
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  id: '',
  name: '',
  setUser: ({ id, name }) =>
    set((state) => ({ id: id ?? state.id, name: name ?? state.name })),
}))
