import { useState } from 'react'
import { Input, Button, Label } from '@/components/ui'
import { logInHandler } from '@/socket'

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
            logInHandler(name)
          }}
        >
          Join
        </Button>
      </span>
    </Label>
  )
}
