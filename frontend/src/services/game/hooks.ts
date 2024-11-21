import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getGameService,
  getGamesPlayedService,
  submitGuessService,
} from './service'

export const useGetGame = () => {
  return useQuery({
    queryKey: ['game'],
    queryFn: getGameService,
  })
}

export const useSubmitGuess = () => {
  return useMutation({
    mutationKey: ['submit-guess'],
    mutationFn: submitGuessService,
  })
}

export const useGetGamesPlayed = () => {
  return useQuery({
    queryKey: ['games-played'],
    queryFn: getGamesPlayedService,
  })
}
