import { Loader } from '@/components/loader'
import { LeaderboardTable } from './leaderboard-table'
import { useGetWinRateLeaderboard } from '@/services/leaderboard'
import { percentageFormatter } from '@/lib/utils'

export const WinRateTable = () => {
  const { data, isLoading } = useGetWinRateLeaderboard()

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <LeaderboardTable
      data={data}
      formatter={percentageFormatter}
      statLabel="Win rate"
    />
  )
}
