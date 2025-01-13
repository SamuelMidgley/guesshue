import { Game } from '@/services/game'
import { ColorGuess } from './color-guess'
import { randomHexColorCode } from '@/lib/utils'
import { useState } from 'react'

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const createGame = (): Game => {
  const colors = [
    randomHexColorCode(),
    randomHexColorCode(),
    randomHexColorCode(),
  ]

  return {
    id: 0,
    correctColor: colors[getRandomInt(0, 2)],
    optionOne: colors[0],
    optionTwo: colors[1],
    optionThree: colors[2],
  }
}

export const QuickPlay = () => {
  const [game, setGame] = useState(() => createGame())
  const [numCorrect, setNumCorrect] = useState(0)

  const handleVote = (guess: string) => {
    if (guess === game.correctColor) {
      setNumCorrect((prev) => prev + 1)
    } else {
      setNumCorrect(0)
    }

    setGame(createGame())
  }

  return (
    <ColorGuess game={game} numCorrect={numCorrect} handleVote={handleVote} />
  )
}
