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
export default class ModalGroupComponent {
  @Input() role!: RoleDTO
  

  modifyForm!: GroupDTO
  totalElementsRole: number=0;
  pageSizeRole: number=5;
  totalPagesRole: number=0;
  pageIndexRole: any;

 

  constructor(private http: HttpService, private activatedRoute: ActivatedRoute) {
    console.log(this.role)
   
  }

  onSubmit(){
    this.http.updateRole(this.role).subscribe()
  }

  



  protected readonly formatDate = formatDate;


   

  

}
