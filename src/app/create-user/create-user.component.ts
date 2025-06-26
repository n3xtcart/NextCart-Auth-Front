import {Component} from '@angular/core';
import {RoleDTO} from '../../_model/RoleDTO';
import {GroupDTO} from '../../_model/GroupDTO';
import {HttpService} from '../../_services/http.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Page} from '../../_model/Page';
import {UserDTO} from '../../_model/UserDTO';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [MatPaginatorModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  user: UserDTO;
  role: RoleDTO[] = [];
  group: GroupDTO;

  roles!: RoleDTO[];
  groups!: GroupDTO[];
  totalElementsRole = 0;
  pageSizeRole = 2;
  pageIndexRole = 0;
  totalPagesRole: number = 0;

  totalElementsGroup = 0;
  pageSizeGroup = 2;
  pageIndexGroup = 0;
  totalPagesGroup: number = 0;
  selectedRole: any;


  constructor(private http: HttpService) {
    this.group = {
      roleDTO: [],
      id: 0,
      descrizione: "",
      dataCreazione: undefined,
      creationUser: undefined,
      ultimaModifica: undefined,


    }
    this.user = {
      nome: "",
      cognome: "",
      email: "",
      password: "",
      id: 0,
      ultimaModifica: undefined,
      creationUser: undefined,
      dataCreazione: undefined,
      groupDTO: {

        descrizione: "",
        id: 0,
        roleDTO: [],
        ultimaModifica: undefined,
        creationUser: undefined,
        dataCreazione: undefined


      }
    }
    http.getAllRolesPag(this.pageIndexRole, this.pageSizeRole).subscribe((data: Page<RoleDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this.roles = [];
        this.totalElementsRole = 0;
      } else {
        console.log(this.roles)
        this.roles = data.content;
        this.totalElementsRole = data.totalElements;
        console.log("Total elements: ", this.totalElementsRole);
        this.pageSizeRole = data.pageSize;
        this.totalPagesRole = data.totalPages;
      }
      console.log("roles loaded: ", this.roles);
    });


    http.getAllGroupsPag(this.pageIndexGroup, this.pageSizeGroup).subscribe((data: Page<GroupDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this.groups = [];
        this.totalElementsGroup = 0;
      } else {
        this.groups = data.content;
        this.totalElementsGroup = data.totalElements;
        console.log("Total elements: ", this.totalElementsGroup);
        this.pageSizeGroup = data.pageSize;
        this.totalPagesGroup = data.totalPages;
      }
      console.log("groups loaded: ", this.groups);
    });


  }


  addRole(role: RoleDTO) {
    console.log(role)
    this.role.push(role);
    console.log(this.role);
  }

  removeRole(role: RoleDTO) {
    console.log(role)
    this.role = this.role.filter(r => r.id != role.id)
    console.log(this.role)
  }

  verifyPresence(role: RoleDTO): boolean {
    return this.role.filter(r => r.id == role.id).length > 0
  }

  onPageChangeRoles(event: any) {
    this.pageIndexRole = event.pageIndex;
    this.pageSizeRole = event.pageSize;
    console.log("Page changed to: ", this.pageIndexRole, " with size: ", this.pageSizeRole);
    this.http.getAllRolesPag(event.pageIndex, event.pageSize).subscribe((data: Page<RoleDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this.roles = [];
        event.totalElements = 0;
      } else {
        this.roles = data.content;
        this.totalElementsRole = data.totalElements;

      }
      console.log("Roles loaded: ", this.roles);
    });
  }

  onSubmit() {
    console.log(this.role)
    console.log(this.group)
    this.user.ruoli = this.role
    this.user.groupDTO = this.group

    console.log(this.user)
    this.http.createUser(this.user).subscribe()
  }

  onPageChangeGroups(event: any) {
    this.pageIndexGroup = event.pageIndex;
    this.pageSizeGroup = event.pageSize;
    console.log("Page changed to: ", this.pageIndexGroup, " with size: ", this.pageSizeGroup);
    this.http.getAllGroupsPag(this.pageIndexGroup, this.pageSizeGroup).subscribe((data: Page<GroupDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this.groups = [];
        this.totalElementsGroup = 0;
      } else {
        this.groups = data.content;
        this.totalElementsGroup = data.totalElements;

      }
      console.log("groups loaded: ", this.groups);
    });
  }

  selectGroup(group: GroupDTO) {
    console.log(group);
    this.group = group;
  }

}
