import { UserForm } from '@/components/UserForm'
import { useUserStore } from '@/stores'
import { Lobby } from './Lobby'

export const Home = () => {
  const name = useUserStore((state) => state.name)

  return <div className="m-10">{!name ? <UserForm /> : <Lobby />}</div>
}
