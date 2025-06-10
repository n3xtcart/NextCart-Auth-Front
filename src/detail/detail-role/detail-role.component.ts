import {Component} from '@angular/core';
import {RoleDTO} from '../../_model/RoleDTO';
import {HttpService} from '../../_services/http.service';
import {ActivatedRoute} from '@angular/router';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-detail-role',
  imports: [],
  templateUrl: './detail-role.component.html',
  styleUrl: './detail-role.component.css'
})
export class DetailRoleComponent {
  role!: RoleDTO

  constructor(private http: HttpService, private route: ActivatedRoute) {
    this.http.getRoleById(this.route.snapshot.params['id']).subscribe(role => {
      this.role = role;
    })
  }

  modify() {

  }

  delete() {

  }

    protected readonly formatDate = formatDate;
}
