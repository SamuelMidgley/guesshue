import { useQuery } from '@tanstack/react-query'
import { meService } from './service'
import { useAuthStore } from '@/stores/useAuthStore'

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: meService,
    enabled: !!useAuthStore.getState().token,
  })
}
