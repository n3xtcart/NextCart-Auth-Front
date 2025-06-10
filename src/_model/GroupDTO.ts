import {RoleDTO} from "./RoleDTO"
import {DTO} from "./DTO"

export interface GroupDTO extends DTO {
  roleDTO: RoleDTO[]
}
