import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'An interactive bar chart'

const chartData = [
  { date: '2024-04-01', gamesPlayed: 222, gamesWon: 150 },
  { date: '2024-04-02', gamesPlayed: 97, gamesWon: 180 },
  { date: '2024-04-03', gamesPlayed: 167, gamesWon: 120 },
  { date: '2024-04-04', gamesPlayed: 242, gamesWon: 260 },
  { date: '2024-04-05', gamesPlayed: 373, gamesWon: 290 },
  { date: '2024-04-06', gamesPlayed: 301, gamesWon: 340 },
  { date: '2024-04-07', gamesPlayed: 245, gamesWon: 180 },
  { date: '2024-04-08', gamesPlayed: 409, gamesWon: 320 },
  { date: '2024-04-09', gamesPlayed: 59, gamesWon: 110 },
  { date: '2024-04-10', gamesPlayed: 261, gamesWon: 190 },
  { date: '2024-04-11', gamesPlayed: 327, gamesWon: 350 },
  { date: '2024-04-12', gamesPlayed: 292, gamesWon: 210 },
  { date: '2024-04-13', gamesPlayed: 342, gamesWon: 380 },
  { date: '2024-04-14', gamesPlayed: 137, gamesWon: 220 },
  { date: '2024-04-15', gamesPlayed: 120, gamesWon: 170 },
  { date: '2024-04-16', gamesPlayed: 138, gamesWon: 190 },
  { date: '2024-04-17', gamesPlayed: 446, gamesWon: 360 },
  { date: '2024-04-18', gamesPlayed: 364, gamesWon: 410 },
  { date: '2024-04-19', gamesPlayed: 243, gamesWon: 180 },
  { date: '2024-04-20', gamesPlayed: 89, gamesWon: 150 },
  { date: '2024-04-21', gamesPlayed: 137, gamesWon: 200 },
  { date: '2024-04-22', gamesPlayed: 224, gamesWon: 170 },
  { date: '2024-04-23', gamesPlayed: 138, gamesWon: 230 },
  { date: '2024-04-24', gamesPlayed: 387, gamesWon: 290 },
  { date: '2024-04-25', gamesPlayed: 215, gamesWon: 250 },
  { date: '2024-04-26', gamesPlayed: 75, gamesWon: 130 },
  { date: '2024-04-27', gamesPlayed: 383, gamesWon: 420 },
  { date: '2024-04-28', gamesPlayed: 122, gamesWon: 180 },
  { date: '2024-04-29', gamesPlayed: 315, gamesWon: 240 },
  { date: '2024-04-30', gamesPlayed: 454, gamesWon: 380 },
  { date: '2024-05-01', gamesPlayed: 165, gamesWon: 220 },
  { date: '2024-05-02', gamesPlayed: 293, gamesWon: 310 },
  { date: '2024-05-03', gamesPlayed: 247, gamesWon: 190 },
  { date: '2024-05-04', gamesPlayed: 385, gamesWon: 420 },
  { date: '2024-05-05', gamesPlayed: 481, gamesWon: 390 },
  { date: '2024-05-06', gamesPlayed: 498, gamesWon: 520 },
  { date: '2024-05-07', gamesPlayed: 388, gamesWon: 300 },
  { date: '2024-05-08', gamesPlayed: 149, gamesWon: 210 },
  { date: '2024-05-09', gamesPlayed: 227, gamesWon: 180 },
  { date: '2024-05-10', gamesPlayed: 293, gamesWon: 330 },
  { date: '2024-05-11', gamesPlayed: 335, gamesWon: 270 },
  { date: '2024-05-12', gamesPlayed: 197, gamesWon: 240 },
  { date: '2024-05-13', gamesPlayed: 197, gamesWon: 160 },
  { date: '2024-05-14', gamesPlayed: 448, gamesWon: 490 },
  { date: '2024-05-15', gamesPlayed: 473, gamesWon: 380 },
  { date: '2024-05-16', gamesPlayed: 338, gamesWon: 400 },
  { date: '2024-05-17', gamesPlayed: 499, gamesWon: 420 },
  { date: '2024-05-18', gamesPlayed: 315, gamesWon: 350 },
  { date: '2024-05-19', gamesPlayed: 235, gamesWon: 180 },
  { date: '2024-05-20', gamesPlayed: 177, gamesWon: 230 },
  { date: '2024-05-21', gamesPlayed: 82, gamesWon: 140 },
  { date: '2024-05-22', gamesPlayed: 81, gamesWon: 120 },
  { date: '2024-05-23', gamesPlayed: 252, gamesWon: 290 },
  { date: '2024-05-24', gamesPlayed: 294, gamesWon: 220 },
  { date: '2024-05-25', gamesPlayed: 201, gamesWon: 250 },
  { date: '2024-05-26', gamesPlayed: 213, gamesWon: 170 },
  { date: '2024-05-27', gamesPlayed: 420, gamesWon: 460 },
  { date: '2024-05-28', gamesPlayed: 233, gamesWon: 190 },
  { date: '2024-05-29', gamesPlayed: 78, gamesWon: 130 },
  { date: '2024-05-30', gamesPlayed: 340, gamesWon: 280 },
  { date: '2024-05-31', gamesPlayed: 178, gamesWon: 230 },
  { date: '2024-06-01', gamesPlayed: 178, gamesWon: 200 },
  { date: '2024-06-02', gamesPlayed: 470, gamesWon: 410 },
  { date: '2024-06-03', gamesPlayed: 103, gamesWon: 160 },
  { date: '2024-06-04', gamesPlayed: 439, gamesWon: 380 },
  { date: '2024-06-05', gamesPlayed: 88, gamesWon: 140 },
  { date: '2024-06-06', gamesPlayed: 294, gamesWon: 250 },
  { date: '2024-06-07', gamesPlayed: 323, gamesWon: 370 },
  { date: '2024-06-08', gamesPlayed: 385, gamesWon: 320 },
  { date: '2024-06-09', gamesPlayed: 438, gamesWon: 480 },
  { date: '2024-06-10', gamesPlayed: 155, gamesWon: 200 },
  { date: '2024-06-11', gamesPlayed: 92, gamesWon: 150 },
  { date: '2024-06-12', gamesPlayed: 492, gamesWon: 420 },
  { date: '2024-06-13', gamesPlayed: 81, gamesWon: 130 },
  { date: '2024-06-14', gamesPlayed: 426, gamesWon: 380 },
  { date: '2024-06-15', gamesPlayed: 307, gamesWon: 350 },
  { date: '2024-06-16', gamesPlayed: 371, gamesWon: 310 },
  { date: '2024-06-17', gamesPlayed: 475, gamesWon: 520 },
  { date: '2024-06-18', gamesPlayed: 107, gamesWon: 170 },
  { date: '2024-06-19', gamesPlayed: 341, gamesWon: 290 },
  { date: '2024-06-20', gamesPlayed: 408, gamesWon: 450 },
  { date: '2024-06-21', gamesPlayed: 169, gamesWon: 210 },
  { date: '2024-06-22', gamesPlayed: 317, gamesWon: 270 },
  { date: '2024-06-23', gamesPlayed: 480, gamesWon: 530 },
  { date: '2024-06-24', gamesPlayed: 132, gamesWon: 180 },
  { date: '2024-06-25', gamesPlayed: 141, gamesWon: 190 },
  { date: '2024-06-26', gamesPlayed: 434, gamesWon: 380 },
  { date: '2024-06-27', gamesPlayed: 448, gamesWon: 490 },
  { date: '2024-06-28', gamesPlayed: 149, gamesWon: 200 },
  { date: '2024-06-29', gamesPlayed: 103, gamesWon: 160 },
  { date: '2024-06-30', gamesPlayed: 446, gamesWon: 400 },
]

const chartConfig = {
  views: {
    label: 'Games',
  },
  gamesPlayed: {
    label: 'Games played',
    color: 'hsl(var(--chart-1))',
  },
  gamesWon: {
    label: 'Games won',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export const RecentActivity = () => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>('gamesPlayed')

  const total = useMemo(
    () => ({
      gamesPlayed: chartData.reduce((acc, curr) => acc + curr.gamesPlayed, 0),
      gamesWon: chartData.reduce((acc, curr) => acc + curr.gamesWon, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Showing total games played and won over the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {['gamesPlayed', 'gamesWon'].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
