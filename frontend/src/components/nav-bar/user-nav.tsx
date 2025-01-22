import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { UserActions } from './user-actions'
import { useMeQuery } from '@/services/user'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUserStore } from '@/stores'
import { useEffect } from 'react'

export const UserNav = () => {
  const isLoggedIn = useUserStore((state) => !!state.user)
  const logOut = useAuthStore((state) => state.logOut)
  const setUser = useUserStore((state) => state.setUser)

  const { data, isLoading, isError } = useMeQuery()

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data, setUser])

  if (!isLoggedIn) {
    return <UserActions />
  }

  if (isLoading || !data || isError) {
    return (
      <div className='className="relative h-8 w-8 rounded-full"'>
        <Avatar className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 items-center justify-center">
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    )
  }

  const { id, username, email } = data

  const logOutHandler = () => {
    // remove token from global store
    logOut()

    // clear user from global store
    setUser(null)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 items-center justify-center">
            <AvatarImage
              className="aspect-square h-full w-full"
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              alt="@shadcn"
            />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={`/profile/${id}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={logOutHandler}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
