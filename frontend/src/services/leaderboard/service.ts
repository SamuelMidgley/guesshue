import api from '../api'
import { useMocks } from '../useMocks'
import { gamesPlayedLeaderboardMock, winRateLeaderboardMock } from './mocks'
import { UserLeaderboardRow } from './types'

export const getWinRateLeaderboardService = () => {
  if (useMocks) {
    return Promise.resolve(winRateLeaderboardMock)
  }

  return api
    .get<UserLeaderboardRow[]>('/leaderboard/winrate')
    .then((res) => res.data)
}

export const getGamesPlayedLeaderboardService = () => {
  if (useMocks) {
    return Promise.resolve(gamesPlayedLeaderboardMock)
  }

  return api
    .get<UserLeaderboardRow[]>('/leaderboard/games-played')
    .then((res) => res.data)
}
