import { UserDTO } from "./User"

export interface Token {
    id: number
    value:string
    userDTO: UserDTO
  }
  