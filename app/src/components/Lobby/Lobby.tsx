import { useLobbyStore } from '@/stores'
import { UserInLobby } from './UserInLobby'
import { Button } from '../ui'
import { socket } from '@/socket'

export const Lobby = () => {
  const lobby = useLobbyStore((store) => store.lobby)

  return (
    <div>
      Lobby
      {lobby.map((user) => (
        <UserInLobby key={user.id} name={user.name} isReady={user.isReady} />
      ))}
      <Button
        onClick={() => {
          socket.emit('is-ready')
        }}
      >
        Ready
      </Button>
    </div>
  )
}
