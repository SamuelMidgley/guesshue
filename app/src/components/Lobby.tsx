import { useLobbyStore } from '@/stores'

export const Lobby = () => {
  const lobby = useLobbyStore((store) => store.lobby)
  return (
    <div>
      {lobby.map((user) => (
        <div>
          <p>id: {user.id}</p>
          <p>name: {user.name}</p>
        </div>
      ))}
    </div>
  )
}
