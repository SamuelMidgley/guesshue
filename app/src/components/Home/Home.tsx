import { useState } from 'react'
import { UserForm } from '@/components/UserForm/UserForm'
import { useUserStore } from '@/stores'
import { Button, Input, Label } from '@/components/ui'
import { createGameHandler, joinGameHandler } from '@/socket'

export const Home = () => {
  const name = useUserStore((state) => state.name)
  const [isJoining, setIsJoining] = useState(false)
  const [password, setPassword] = useState('')

  if (!name) {
    return (
      <div className="mt-8 mx-8">
        <h1 className="text-xl font-bold">Guess Hue</h1>
        <UserForm />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 mt-8 mx-8">
      <h1 className="text-xl font-bold">Welcome {name}!</h1>
      {!isJoining ? (
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsJoining(true)}>Join Game</Button> or
          <Button onClick={() => createGameHandler()}>Create Game</Button>
        </div>
      ) : (
        <div className="w-fit">
          <Label>
            Game password
            <span className="flex items-center gap-2 w-[500px]">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={() => joinGameHandler(password)}>
                Join Game
              </Button>
            </span>
          </Label>
          <div className="w-full flex justify-center">
            <Button variant="link" onClick={() => createGameHandler()}>
              Create Lobby
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
