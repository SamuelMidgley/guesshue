import { ProfilePicture } from '@/components/profile-picture'
import { Separator } from '@/components/ui/separator'
import { dateJoinedText } from '@/lib/utils'
import { UserLeaderboardRow } from '@/services/leaderboard/types'
import { Link } from 'react-router-dom'

interface LeaderboardRowProps {
  idx: number
  row: UserLeaderboardRow
  formatter: (stat: number) => string
}

export const LeaderboardRow = ({
  row,
  idx,
  formatter,
}: LeaderboardRowProps) => {
  const { id, username, dateCreated, firstColor, secondColor, stat } = row

  return (
    <>
      <li>
        <Separator />
      </li>
      <li className="flex items-center gap-4">
        <div className="size-10 flex items-center justify-center text-xl font-extrabold">
          {idx + 1}
        </div>
        <ProfilePicture firstColor={firstColor} secondColor={secondColor} />
        <div>
          <Link to={`/profile/${id}`}>{username}</Link>
          <p className="text-sm text-muted-foreground">
            {dateJoinedText(dateCreated)}
          </p>
        </div>
        <div className="ml-auto">{formatter(stat)}</div>
      </li>
    </>
  )
}
