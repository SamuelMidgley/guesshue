import { subMonths } from 'date-fns'
import { UserLeaderboardRow } from './types'
import { randomHexColorCode } from '@/lib/utils'

export const gamesPlayedLeaderboardMock: UserLeaderboardRow[] = [
  {
    id: 1,
    username: 'TheSmidgenator',
    dateCreated: subMonths(new Date(), 1),
    firstColor: randomHexColorCode(),
    secondColor: randomHexColorCode(),
    stat: 1124,
  },
  {
    id: 2,
    username: 'Colormanior',
    dateCreated: subMonths(new Date(), 2),
    firstColor: randomHexColorCode(),
    secondColor: randomHexColorCode(),
    stat: 981,
  },
  {
    id: 3,
    username: 'BigColorsOnly',
    dateCreated: subMonths(new Date(), 3),
    firstColor: randomHexColorCode(),
    secondColor: randomHexColorCode(),
    stat: 112,
  },
  {
    id: 4,
    username: 'helloworld',
    dateCreated: subMonths(new Date(), 7),
    firstColor: randomHexColorCode(),
    secondColor: randomHexColorCode(),
    stat: 11,
  },
]

export const winRateLeaderboardMock: UserLeaderboardRow[] = [
  {
    id: 1,
    username: 'TheSmidgenator',
    dateCreated: subMonths(new Date(), 1),
    firstColor: randomHexColorCode(),
    secondColor: randomHexColorCode(),
    stat: 77,
  },
  {
    id: 2,
    username: 'Colormanior',
    dateCreated: subMonths(new Date(), 2),
    firstColor: randomHexColorCode(),
    secondColor: randomHexColorCode(),
    stat: 65,
  },
  {
    id: 3,
    username: 'BigColorsOnly',
    dateCreated: subMonths(new Date(), 3),
    firstColor: randomHexColorCode(),
    secondColor: randomHexColorCode(),
    stat: 54,
  },
  {
    id: 4,
    username: 'helloworld',
    dateCreated: subMonths(new Date(), 7),
    firstColor: randomHexColorCode(),
    secondColor: randomHexColorCode(),
    stat: 12,
  },
]
