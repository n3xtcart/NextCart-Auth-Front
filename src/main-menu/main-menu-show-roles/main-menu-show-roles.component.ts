import {Component, OnInit} from '@angular/core';
import {RoleDTO} from '../../_model/Role';
import {Router} from '@angular/router';
import {HttpService} from '../../_services/http.service';

@Component({
  selector: 'app-main-menu-show-roles',
  imports: [],
  templateUrl: './main-menu-show-roles.component.html',
  styleUrl: './main-menu-show-roles.component.css'
})
export class MainMenuShowRolesComponent implements OnInit {
  private _roles: RoleDTO[] = [];

  get roles(): RoleDTO[] {
    return this._roles;
  }

  constructor(private http: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.http.token){
      this.http.checkToken().subscribe({
        next: (token) => {
          if(!token)this.router.navigate(["/login"]);
          else{ this.http.loadRoles().subscribe({
            next: (roles) => {
              this._roles = roles;
            },
            error: (error) => {
              console.log(error);
            }
          })}
        },
        error: (error) => {
          console.log(error);
        }
      })
    }else this.router.navigate(["/login"]);

  
  }


  select(role: RoleDTO) {
    // TODO FUNZIONE DA IMPLEMENTARE
    console.log(role);
  }

  delete(role: RoleDTO) {
    // TODO FUNZIONE DA IMPLEMENTARE
    console.log(role);
  }
}
