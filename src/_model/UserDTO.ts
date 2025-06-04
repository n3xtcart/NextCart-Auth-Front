import {GroupDTO} from "./GroupDTO"
import {RoleDTO} from './RoleDTO';

export interface UserDTO {
  id?: number
  nome: string
  cognome: string
  email: string
  password: string
  groupDTO?: GroupDTO
  ruoli?: RoleDTO[]
}
