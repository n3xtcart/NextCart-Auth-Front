import {Component, Input} from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {GroupDTO} from '../../_model/GroupDTO';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {formatDate} from '@angular/common';
import {    FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RoleDTO } from '../../_model/RoleDTO';
import { Page } from '../../_model/Page';
import { UserDTO } from '../../_model/UserDTO';

@Component({
  selector: 'app-modal-user',
  imports: [FormsModule,MatPaginatorModule
  ],
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css'
})
export default class ModalUserComponent {
  @Input() user!: UserDTO
  roles!: RoleDTO[]
  groups!:GroupDTO[]
  

  modifyForm!: GroupDTO
  totalElementsRole: number=0;
  pageSizeRole: number=5;
  totalPagesRole: number=0;
  pageIndexRole: any;
  myRole!: RoleDTO[];
  role:any;
totalElementsGroup: number=0;
pageSizeGroup: number=5;
pageIndexGroup: number=0;
  totalPagesGroup: number=0;

  ngOnInit(){
    
    console.log(this.user)
    
    this.myRole=this.user.ruoli?this.user.ruoli:[]
  }

  constructor(private http: HttpService, private activatedRoute: ActivatedRoute) {
    console.log(this.user)
     http.getAllRolesPag(0, 5).subscribe((data: Page<RoleDTO> | never[]) => {
          if (!data) return;
          if (Array.isArray(data)) {
            this.roles = [];
            this.totalElementsRole =0;
          } else {
            console.log(this.roles)
            this.roles =data.content;
            this.totalElementsRole = data.totalElements;
            console.log("Total elements: ", this.totalElementsRole);
            this.pageSizeRole = data.size;
            this.totalPagesRole = data.totalPages;
          }
          console.log("roles loaded: ", this.roles);
        });

            http.getAllGroupsPag(0, 5).subscribe((data: Page<GroupDTO> | never[]) => {
          if (!data) return;
          if (Array.isArray(data)) {
            this.roles = [];
            this.totalElementsRole =0;
          } else {
            console.log(this.roles)
            this.groups =data.content;
            this.totalElementsGroup = data.totalElements;
            console.log("Total elements: ", this.totalElementsGroup);
            this.pageSizeGroup = data.size;
            this.totalPagesGroup = data.totalPages;
          }
          console.log("roles loaded: ", this.roles);
        });

  }

  onSubmit(){
    this.http.updateUser(this.user).subscribe()
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

  



  protected readonly formatDate = formatDate;


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

  addRole(role:RoleDTO) {
  console.log(role)
  this.myRole.push(role);

}


 delete(index:number){
    this.myRole.splice(index,1)
  }
}
