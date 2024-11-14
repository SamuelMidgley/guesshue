export interface LoginPayload {
  email: string
  password: string
}

export interface TokenResponse {
  token: string
}

export interface RegisterPayload {
  email: string
  username: string
  password: string
  confirmPassword: string
}
