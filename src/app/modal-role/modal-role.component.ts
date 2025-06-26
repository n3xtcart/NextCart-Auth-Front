import {Component, Input} from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {GroupDTO} from '../../_model/GroupDTO';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {formatDate} from '@angular/common';
import {    FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RoleDTO } from '../../_model/RoleDTO';

@Component({
  selector: 'app-modal-role',
  imports: [FormsModule,MatPaginatorModule
  ],
  templateUrl: './modal-role.component.html',
  styleUrl: './modal-role.component.css'
})
export default class ModalRoleComponent {
  @Input() role!: RoleDTO
  internalRole:RoleDTO={
    id: 0,
    priority: 0,
    admin: false,
    descrizione: '',
    ultimaModifica: undefined,
    dataCreazione: undefined,
    creationUser: undefined
  }
  

  modifyForm!: GroupDTO
  totalElementsRole: number=0;
  pageSizeRole: number=5;
  totalPagesRole: number=0;
  pageIndexRole: any;

 
  ngOnInit(){
    this.internalRole={...this.role}
  }

  constructor(private http: HttpService, private activatedRoute: ActivatedRoute) {
   
  }

  onSubmit(){
    this.http.updateRole(this.internalRole).subscribe()
  }

  



  protected readonly formatDate = formatDate;


   

  

}
