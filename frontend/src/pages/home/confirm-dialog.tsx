import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export const ConfirmDialog = () => {
  const navigate = useNavigate()

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ size: 'lg' })}>
        Play
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are not signed in</AlertDialogTitle>
          <AlertDialogDescription>
            Sign in to keep track of your stats and rank on the leaderboard!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => navigate('/game/quick-play')}>
            Play anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
