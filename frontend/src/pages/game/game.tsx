import { Loader } from '@/components/loader'
import { useGetGame, useSubmitGuess } from '@/services/game'
import { useState } from 'react'
import { ColorGuess } from './color-guess'

export const Game = () => {
  const { data: game, refetch } = useGetGame()
  const { mutate: submitGuess } = useSubmitGuess()

  const [numCorrect, setNumCorrect] = useState(0)

  if (!game) {
    return <Loader />
  }

  const handleVote = (guess: string) => {
    if (guess === game.correctColor) {
      setNumCorrect((prev) => prev + 1)
    } else {
      setNumCorrect(0)
    }

    submitGuess(
      {
        gameId: game.id,
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
    <ColorGuess game={game} handleVote={handleVote} numCorrect={numCorrect} />
  )
}
