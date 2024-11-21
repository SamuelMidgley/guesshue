import { Button } from '@/components/ui'
import { useGetGamesPlayed } from '@/services/game'
import { useUserStore } from '@/stores'
import { Link } from 'react-router-dom'

export const Home = () => {
  const { data } = useGetGamesPlayed()
  const isLoggedIn = useUserStore((state) => !!state.user)

  return (
    <div className="w-full flex gap-10 justify-center items-center flex-col mt-20">
      {isLoggedIn && (
        <Button asChild>
          <Link to="/game">Play game!</Link>
        </Button>
      )}
      {!!data && <div>Total games played: {data}</div>}
    </div>
  )
}
