import { useGameStatusStore } from '@/stores'
import { Lobby } from './Lobby'
import { Home } from './Home'
import { Game } from './Game'

export const Router = () => {
  const gameStatus = useGameStatusStore((state) => state.gameStatus)

  console.log(gameStatus)

  switch (gameStatus) {
    case 'lobby':
      return <Lobby />
    case 'game':
      return <Game />
    case 'results':
      break

    case 'home':
    default:
      return <Home />
  }
}
