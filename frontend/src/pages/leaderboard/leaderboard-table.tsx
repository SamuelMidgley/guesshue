import { Button } from '@/components/ui'
import { LeaderboardRow } from './leaderboard-row'
import { UserLeaderboardRow } from '@/services/leaderboard/types'

interface LeaderboardTableProps {
  data: UserLeaderboardRow[]
  formatter: (stat: number) => string
  statLabel: string
}

export const LeaderboardTable = ({
  data,
  statLabel,
  formatter,
}: LeaderboardTableProps) => {
  return (
    <div className="flex flex-col gap-20 items-center justify-center mt-14">
      <ul className="flex flex-col gap-4 w-[600px]">
        <li className="flex items-end gap-4">
          <div className="w-10" />
          <p className="text-xl und">User</p>
          <p className="ml-auto">{statLabel}</p>
        </li>
        {data.map((user, idx) => (
          <LeaderboardRow
            key={user.id}
            idx={idx}
            row={user}
            formatter={formatter}
          />
        ))}
      </ul>
      <Button variant="outline">View more</Button>
    </div>
  )
}
