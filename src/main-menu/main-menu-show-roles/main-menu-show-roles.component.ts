import {Component, OnInit} from '@angular/core';
import {Role} from '../../_model/Role';
import {Router} from '@angular/router';
import {HttpService} from '../../_services/http.service';

@Component({
  selector: 'app-main-menu-show-roles',
  imports: [],
  templateUrl: './main-menu-show-roles.component.html',
  styleUrl: './main-menu-show-roles.component.css'
})
export class MainMenuShowRolesComponent implements OnInit {
  private _roles: Role[] = [];

  get roles(): Role[] {
    return this._roles;
  }

  constructor(private http: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.http.loadRoles().subscribe({
      next: (roles: Role[]) => {
        this._roles = roles;
      },
      error: (roles: Role[]) => {
        console.log(roles);
      }
    })
  }


  select(role: Role) {
    // TODO FUNZIONE DA IMPLEMENTARE
    console.log(role);
  }

  delete(role: Role) {
    // TODO FUNZIONE DA IMPLEMENTARE
    console.log(role);
  }
}
