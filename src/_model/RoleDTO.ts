import {DTO} from "./DTO"

export interface RoleDTO extends DTO {
  id?: number
  priority: number
  admin: boolean
  descrizione: string
}
