import { GuessHueLogo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { useGetGamesPlayed } from '@/services/game'
import { useAuthStore } from '@/stores/useAuthStore'
import { Link } from 'react-router-dom'
import { ConfirmDialog } from './confirm-dialog'

export const Home = () => {
  const { data } = useGetGamesPlayed()
  const isLoggedIn = useAuthStore((state) => !!state.token)

  return (
    <div className="w-full flex gap-10 justify-center items-center flex-col mt-60">
      <div className="flex flex-col items-center gap-4">
        <GuessHueLogo size="xl" />
        <h1 className="text-4xl font-extrabold">Guesshue</h1>
        <p className="text-muted-foreground">
          One of the color guessing games of all time
        </p>
      </div>

      {isLoggedIn ? (
        <Link
          to="/game"
          onClick={() => {}}
          className={buttonVariants({
            size: 'lg',
          })}
        >
          Play game!
        </Link>
      ) : (
        <ConfirmDialog />
      )}

      {!!data && <div>Total games played: {data}</div>}
    </div>
  )
}
