import { CheckCircledIcon, CircleIcon } from '@radix-ui/react-icons'

interface UserInLobbyProps {
  name: string
  isReady: boolean
}

export const UserInLobby = ({ name, isReady }: UserInLobbyProps) => {
  return (
    <div className="flex gap-2 items-center">
      {isReady ? <CheckCircledIcon /> : <CircleIcon />} {name}
    </div>
  )
}
