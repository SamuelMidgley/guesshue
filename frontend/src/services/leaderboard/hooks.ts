import { useQuery } from '@tanstack/react-query'
import {
  getGamesPlayedLeaderboardService,
  getWinRateLeaderboardService,
} from './service'

export const useGetWinRateLeaderboard = () => {
  return useQuery({
    queryKey: ['lb-win-rate'],
    queryFn: getWinRateLeaderboardService,
  })
}

export const useGetGamesPlayedLeaderboard = () => {
  return useQuery({
    queryKey: ['lb-games-played'],
    queryFn: getGamesPlayedLeaderboardService,
  })
}
