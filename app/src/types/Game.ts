export interface Game {
  id: number
  password: string
  winner: string | null
}

export interface GamePlayer {
  id: number
  gameId: number
  userId: string
  name: string
  isReady: boolean
}

export interface Vote {
  id: string
  name: string
  isCorrect: boolean
}
