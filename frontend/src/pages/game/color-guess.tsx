import { Button } from '@/components/ui'
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
      {numCorrect > 0 && (
        <div>Well done you have got {numCorrect} correct in a row!</div>
      )}
    </div>
  )
}
