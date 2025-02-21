export interface User {
  id: number
  username: string
  email: string
  dateCreated: Date
}

export interface UserWithIcon extends User {
  firstColor: string
  secondColor: string
}
