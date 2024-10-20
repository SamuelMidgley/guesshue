import { useState } from 'react'
import { Input, Button, Label } from '@/components/ui'
import { useUserStore } from '@/stores'
import { socket } from '@/socket'

export const UserForm = () => {
  const [name, setName] = useState('')
  const setUser = useUserStore((state) => state.setUser)

  return (
    <Label>
      What is your name?
      <span className="flex gap-2">
        <Input
          className="w-[200px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={() => {
            setUser({ name })
            socket.emit('log-in', { id: socket.id, name })
          }}
        >
          Join
        </Button>
      </span>
    </Label>
  )
}
