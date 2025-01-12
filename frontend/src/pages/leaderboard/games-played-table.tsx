import { Loader } from '@/components/loader'
import { LeaderboardTable } from './leaderboard-table'
import { useGetGamesPlayedLeaderboard } from '@/services/leaderboard'
import millify from 'millify'

export const GamesPlayedTable = () => {
  const { data, isLoading } = useGetGamesPlayedLeaderboard()

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <LeaderboardTable
      data={data}
      formatter={millify}
      statLabel="Games played"
    />
  )
}
