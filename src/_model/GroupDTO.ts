import {RoleDTO} from "./RoleDTO"

export interface GroupDTO extends DTO {
  id?: number
  roleDTO: RoleDTO[]
}
