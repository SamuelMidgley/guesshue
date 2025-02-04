import { Button } from '@/components/ui'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Game } from '@/services/game/types'

interface ColorGuessProps {
  game: Game
  handleVote: (guess: string) => void
  numCorrect: number
}

export const ColorGuess = ({
  game,
  handleVote,
  numCorrect,
}: ColorGuessProps) => {
  return (
    <div className="w-full flex flex-col gap-6 items-center mt-20">
      <h2 className="text-3xl font-semibold">Time trials</h2>

      <div
        className="w-[200px] h-[200px] rounded"
        style={{ backgroundColor: game.correctColor }}
      />
      <div className="flex gap-4">
        {[game.optionOne, game.optionTwo, game.optionThree].map((option) => (
          <Button
            key={option}
            variant="outline"
            onClick={() => handleVote(option)}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="flex gap-5">
        {/* <Card className="w-[150px]">
          <CardHeader className="font-bold">Timer</CardHeader>
          <CardContent className="text-center">00:00</CardContent>
        </Card> */}
        <Card className="w-[310px]">
          <CardHeader className="font-bold">Streak</CardHeader>
          <CardContent className="flex justify-between">
            <div>
              <p>x{numCorrect}</p>
            </div>
            <div>
              <p>PB: 23</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
