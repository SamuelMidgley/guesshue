import { Vote } from '@/types/Game'

interface ResultsProps {
  votes: Vote[]
}

export const Results = ({ votes }: ResultsProps) => {
  return (
    <div>
      {votes.map((vote) => (
        <div key={vote.id}>
          <p>{vote.name}</p>
          <p>Is correct: {vote.isCorrect}</p>
        </div>
      ))}
    </div>
  )
}
