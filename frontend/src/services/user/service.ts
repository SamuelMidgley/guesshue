import { User } from '@/types/user'
import api from '../api'

export const meService = () => {
  return api.get<User>('/user/me').then((res) => res.data)
}
