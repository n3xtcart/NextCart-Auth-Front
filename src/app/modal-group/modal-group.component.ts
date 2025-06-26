import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {GroupDTO} from '../../_model/GroupDTO';
import {ActivatedRoute, Route, Router, RouterLink} from '@angular/router';
import {formatDate} from '@angular/common';
import {    FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RoleDTO } from '../../_model/RoleDTO';
import { Page } from '../../_model/Page';

declare var bootstrap : any;

@Component({
  selector: 'app-modal-group',
  imports: [FormsModule,MatPaginatorModule
  ],
  templateUrl: './modal-group.component.html',
  styleUrl: './modal-group.component.css'
})
export default class ModalGroupComponent {
  @Input() group!: GroupDTO

  roles!: RoleDTO[]
  internalGroup:GroupDTO={
    roleDTO: [],
    descrizione: '',
    id: 0,
    ultimaModifica: undefined,
    dataCreazione: undefined,
    creationUser: undefined
  }

  modifyForm!: GroupDTO
  totalElementsRole: number=0;
  pageSizeRole: number=5;
  totalPagesRole: number=0;
  pageIndexRole: any;
  myRole!: RoleDTO[];
  role:any;

  ngOnInit(){
    
    console.log(this.group)
    this.internalGroup={...this.group}
    this.myRole=[...this.group.roleDTO]

  }

  constructor(private http: HttpService, private activatedRoute: ActivatedRoute) {
    console.log(this.group)
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
            this.pageSizeRole = data.pageSize;
            this.totalPagesRole = data.totalPages;
          }
          console.log("roles loaded: ", this.roles);
        });
  }

  onSubmit(){
    this.internalGroup.roleDTO=this.myRole
    this.group=this.internalGroup
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
