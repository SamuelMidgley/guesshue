import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserState {
  id: string | null
  name: string | null
}

interface UserActions {
  setUser: ({ id, name }: { id?: string; name?: string }) => void
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      id: '',
      name: '',
      setUser: ({ id, name }) =>
        set((state) => ({ id: id ?? state.id, name: name ?? state.name })),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
