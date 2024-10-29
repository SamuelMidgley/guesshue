import { io } from 'socket.io-client'

const URL = 'http://localhost:5500/'

export const socket = io(URL, { transports: ['websocket'] })

export const logInHandler = (name: string) => {
  socket.emit('logIn', name)
}

export const createGameHandler = () => {
  socket.emit('createGame')
}

export const joinGameHandler = (password: string) => {
  socket.emit('joinGame', password)
}
