import api from '../api'
import { LoginPayload, RegisterPayload, TokenResponse } from './types'

export const loginService = (payload: LoginPayload) => {
  return api.post<TokenResponse>('/auth/login', payload).then((res) => res.data)
}

export const registerService = (payload: RegisterPayload) => {
  return api
    .post<TokenResponse>('/auth/register', payload)
    .then((res) => res.data)
}
