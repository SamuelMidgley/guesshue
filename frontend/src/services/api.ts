import { useAuthStore } from '@/stores/useAuthStore'
import baseAxios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

const api = baseAxios.create({
  baseURL,
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api
