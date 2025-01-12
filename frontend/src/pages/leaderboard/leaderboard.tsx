import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GamesPlayedTable } from './games-played-table'
import { WinRateTable } from './win-rate-table'

export const Leaderboard = () => {
  return (
    <div className="mx-20 mt-20 flex flex-col gap-10">
      <h2 className="text-2xl font-bold text-center">Leaderboards</h2>
      <Tabs defaultValue="gamesPlayed">
        <div className="flex items-center justify-center">
          <TabsList>
            <TabsTrigger value="gamesPlayed">Games played</TabsTrigger>
            <TabsTrigger value="winRate">Win rate</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="gamesPlayed">
          <GamesPlayedTable />
        </TabsContent>
        <TabsContent value="winRate">
          <WinRateTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
