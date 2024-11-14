import { useMutation } from '@tanstack/react-query'
import { loginService, registerService } from './service'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

export const useLoginMutation = () => {
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)

  return useMutation({
    mutationKey: ['login'],
    mutationFn: loginService,
    onSuccess: (data) => {
      if (!data?.token) {
        console.error('No token found')
        return
      }

      setToken(data.token)

      navigate('/')
    },
  })
}

export const useRegisterMutation = () => {
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)

  return useMutation({
    mutationKey: ['register'],
    mutationFn: registerService,
    onSuccess: (data) => {
      if (!data?.token) {
        console.error('No token found')
        return
      }

      setToken(data.token)

      console.log(data.token)

      navigate('/')
    },
  })
}
