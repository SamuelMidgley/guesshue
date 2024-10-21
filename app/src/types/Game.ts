export interface Game {
  colorOptions: string[]
  correctColor: string
  votes: Vote[]
}

export interface Vote {
  id: string
  name: string
  isCorrect: boolean
}
