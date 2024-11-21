import api from '../api'
import { AddGuessRequest as SubmitGuessRequest, Game } from '../game/types'

export const getGameService = () => {
  return api.get<Game>('/game').then((res) => res.data)
}

export const submitGuessService = (submitGuessRequest: SubmitGuessRequest) => {
  return api.post(`/game/${submitGuessRequest.gameId}/guess`, {
    colorGuess: submitGuessRequest.colorGuess,
  })
}

export const getGamesPlayedService = () => {
  return api.get<number>('/game/games-played').then((res) => res.data)
}
