import { socket } from '@/socket'
import { useUserStore } from '@/stores'
import { User } from '@/types/User'
import { useEffect } from 'react'

export const useAuthSocketHandler = () => {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    socket.on('loggedIn', (user: User) => {
      console.log('user logged in received from server:', user)

      setUser(user)
    })

    return () => {
      socket.off('loggedIn')
    }
  })
}
