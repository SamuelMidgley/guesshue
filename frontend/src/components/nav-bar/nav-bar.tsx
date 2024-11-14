import { UserNav } from './user-nav'
import { ModeToggle } from './mode-toggle'
import { MainNav } from './main-nav'

export const NavBar = () => {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="inline-flex gap-2">
            <div
              className=" w-6 h-6 rounded"
              style={{
                background:
                  'linear-gradient(315deg, #A04BFF 10%, #4BA5EB 20%, #4BFFD7 30%, #B4FF4B 40%, #FFFF4B 50%, #FFD54B 60%, #FFB74B 70%, #FF6E4B 80%, #FF4B4B 90%)',
              }}
            />
            <h1 className="font-extrabold">Guesshue</h1>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  )
}
