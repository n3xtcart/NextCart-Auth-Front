import { GroupDTO } from "./Group"

export interface UserRegistration {
  name: string
  surname: string
  email: string
  password: string
  group: GroupDTO
}
