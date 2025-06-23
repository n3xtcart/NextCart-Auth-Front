import { Component } from '@angular/core';
import { RoleDTO } from '../../_model/RoleDTO';
import { GroupDTO } from '../../_model/GroupDTO';
import { HttpService } from '../../_services/http.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Page } from '../../_model/Page';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [MatPaginatorModule,FormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {
 
   role:RoleDTO[]=[];
  group:GroupDTO;

  roles!:RoleDTO[];
   totalElementsRole = 0;
  pageSizeRole = 10;
  pageIndexRole = 0;
  totalPagesRole: number = 0;

selectedRole: any;


   constructor(private http: HttpService) {
    this.group={
      roleDTO:[],
      id:0,
      descrizione:"",
      dataCreazione:undefined,
      creationUser:undefined,
      ultimaModifica:undefined,


    }
   
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


  }



  delete(index:number){
    this.role.splice(index,1)
  }


  

addRole(role:RoleDTO) {
  console.log(role)
  this.role.push(role);

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

  onSubmit(){
    console.log(this.role)
    this.group.roleDTO=this.role

    console.log(this.group)
    this.http.createGroup(this.group).subscribe()
  }



}
