import { ProfilePicture } from '@/components/profile-picture'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { randomHexColorCode } from '@/lib/utils'
import { UserWithIcon } from '@/types/user'
import { AwardIcon, ChartLineIcon, MedalIcon } from 'lucide-react'
import millify from 'millify'
import { RecentActivity } from './recent-activity'
import { format, subDays } from 'date-fns'

const user: UserWithIcon = {
  id: 1,
  username: 'Smidge',
  email: 'sam@midgley.dev',
  dateCreated: subDays(new Date(), 5),
  firstColor: randomHexColorCode(),
  secondColor: randomHexColorCode(),
}

export const Profile = () => {
  return (
    <div className="mx-20 mt-20 flex flex-col gap-10">
      <div className="flex flex-col justify-center items-center gap-4">
        <ProfilePicture
          firstColor={user.firstColor}
          secondColor={user.secondColor}
          size="lg"
        />
        <div>
          <h2 className="text-2xl mb-2 text-center">{user.username}</h2>
          <p className="text-sm text-center text-muted-foreground">
            Joined {format(user.dateCreated, 'LLL yyy')}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-12 flex-wrap">
        <Card className="w-[300px]">
          <CardHeader className="flex flex-col gap-2 items-center justify-center">
            <MedalIcon />
            Win Rate
          </CardHeader>
          <CardContent className="text-2xl font-bold text-center">
            78%
          </CardContent>
        </Card>
        <Card className="w-[300px]">
          <CardHeader className="flex flex-col gap-2 items-center justify-center">
            <AwardIcon />
            Current Ranking
          </CardHeader>
          <CardContent className="text-2xl font-bold text-center">
            1st
          </CardContent>
        </Card>
        <Card className="w-[300px]">
          <CardHeader className="flex flex-col gap-2 items-center justify-center">
            <ChartLineIcon />
            Games played
          </CardHeader>
          <CardContent className="text-2xl font-bold text-center">
            {millify(42000)}
          </CardContent>
        </Card>
      </div>
      <div className="w-[1000px] mx-auto">
        <RecentActivity />
      </div>
    </div>
  )
}
