import { Loader } from '@/components/loader'
import { Button } from '@/components/ui'
import { useGetGame, useSubmitGuess } from '@/services/game'
import { useState } from 'react'

export const Game = () => {
  const { data, refetch } = useGetGame()
  const { mutate: submitGuess } = useSubmitGuess()

  const [numCorrect, setNumCorrect] = useState(0)

  if (!data) {
    return <Loader />
  }

  const handleVote = (guess: string) => {
    console.log(guess)
    console.log(data.correctColor)
    console.log(numCorrect)
    if (guess === data.correctColor) {
      setNumCorrect((prev) => prev + 1)
    } else {
      setNumCorrect(0)
    }

    submitGuess(
      {
        gameId: data.id,
        colorGuess: guess,
      },
      {
        onSuccess() {
          refetch()
        },
      }
    )
  }

  return (
    <div className="w-full flex flex-col gap-6 items-center mt-20">
      <div
        className="w-[200px] h-[200px] rounded"
        style={{ backgroundColor: data.correctColor }}
      />
      <div className="flex gap-4">
        {[data.optionOne, data.optionTwo, data.optionThree].map((option) => (
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
