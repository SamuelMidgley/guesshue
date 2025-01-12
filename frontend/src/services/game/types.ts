export interface Game {
  id: number
  correctColor: string
  optionOne: string
  optionTwo: string
  optionThree: string
}

export interface AddGuessRequest {
  gameId: number
  colorGuess: string
}
