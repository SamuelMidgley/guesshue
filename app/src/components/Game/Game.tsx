import { Button } from '@/components/ui'
import { socket } from '@/socket'
import { useGameStore, useUserStore } from '@/stores'
import { useState } from 'react'
import { Results } from './Results'
import { Vote } from '@/types/Game'

export const Game = () => {
  const id = useUserStore((state) => state.id)
  const name = useUserStore((state) => state.name)
  const game = useGameStore((state) => state.game)
  const [hasVoted, setHasVoted] = useState(false)

  if (!game || !id || !name) {
    return null
  }

  if (hasVoted && game.votes.length > 0) {
    return <Results votes={game.votes} />
  }

  const { colorOptions, correctColor } = game

  const guessColor = (colorGuessed: string) => {
    const vote: Vote = {
      id,
      name,
      isCorrect: colorGuessed === correctColor,
    }

    console.log(vote)

    socket.emit('voted', vote)
    setHasVoted(true)
  }

  return (
    <div>
      <div
        className="w-[200px] h-[200px]"
        style={{ backgroundColor: correctColor }}
      />
      {colorOptions.map((color) => (
        <Button key={color} onClick={() => guessColor(color)}>
          {color}
        </Button>
      ))}
    </div>
  )
}
