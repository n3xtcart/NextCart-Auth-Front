import {Component} from '@angular/core';
import {RoleDTO} from '../../_model/RoleDTO';
import {HttpService} from '../../_services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from "@angular/common";
import ModalRoleComponent from '../../app/modal-role/modal-role.component';

@Component({
  selector: 'app-detail-role',
  imports: [ModalRoleComponent],
  templateUrl: './detail-role.component.html',
  styleUrl: './detail-role.component.css'
})
export class DetailRoleComponent {
  role!: RoleDTO
  router:Router

  constructor(private http: HttpService, private route: ActivatedRoute,router :Router) {
    this.router=router
    this.http.getRoleById(this.route.snapshot.params['id']).subscribe(role => {
      this.role = role;
    })
  }

  

  delete() {
this.http.deleteRole(this.role).subscribe(()=>{
      alert("eliminazione avvenuto con successo");
this.router.navigate(["main-menu/roles"])
    })
  }

    protected readonly formatDate = formatDate;
}
