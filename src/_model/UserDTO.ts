import {GroupDTO} from "./GroupDTO"
import {RoleDTO} from './RoleDTO';
import {DTO} from './DTO';

export interface UserDTO extends DTO {
  nome: string
  cognome: string
  email: string
  password: string
  groupDTO?: GroupDTO
  ruoli?: RoleDTO[]
}
