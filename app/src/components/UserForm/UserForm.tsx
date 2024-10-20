import { useState } from 'react'
import { Input, Button, Label } from '@/components/ui'
import { socket } from '@/socket'

export const UserForm = () => {
  const [name, setName] = useState('')

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
            socket.emit('log-in', { id: socket.id, name })
          }}
        >
          Join
        </Button>
      </span>
    </Label>
  )
}
