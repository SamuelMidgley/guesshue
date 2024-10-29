import { socket } from '@/socket'
import { useUserStore } from '@/stores'
import { useEffect, useState } from 'react'

export const useHandleSocketConnection = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const id = useUserStore((state) => state.id)

  useEffect(() => {
    console.log(id)
    const onConnect = () => {
      setIsConnected(true)

      if (id) {
        socket.emit('attemptLogIn', id)
      }
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return isConnected
}
