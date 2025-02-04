import { useMutation } from '@tanstack/react-query'
import { loginService, registerService } from './service'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'
import { AxiosError } from 'axios'

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
    onError: (error: AxiosError) => {
      console.log(error)
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
