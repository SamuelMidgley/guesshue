import { Game } from './Game'
import { User } from './User'

export interface Lobby {
  id: string
  users: User[]
  games: Game[]
}
