import { User } from "./User"

export interface Token {
    id: number
    value:string
    user: User
  }
  