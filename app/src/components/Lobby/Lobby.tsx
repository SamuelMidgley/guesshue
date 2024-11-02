import { useGameStore } from '@/stores'
import { UserInLobby } from './UserInLobby'
import { Button } from '../ui'
import { socket } from '@/socket'

export const Lobby = () => {
  const game = useGameStore((store) => store.game)
  const gamePlayers = useGameStore((store) => store.gamePlayers)

  if (!game) {
    return null
  }

  return (
    <div>
      <p>Lobby</p>
      <p>Password: {game?.password}</p>

      {gamePlayers.map((player) => (
        <UserInLobby
          key={player.id}
          name={player.name}
          isReady={player.isReady}
        />
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
