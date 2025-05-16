import {Component, OnInit} from '@angular/core';
import {UserDTO} from '../../_model/User';
import {HttpService} from '../../_services/http.service';
import {Router} from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-main-menu-show-users',
  imports: [],
  templateUrl: './main-menu-show-users.component.html',
  styleUrl: './main-menu-show-users.component.css'
})
export class MainMenuShowUsersComponent implements OnInit {
  private _users: UserDTO[] = [];

  get users(): UserDTO[] {
    return this._users;
  }

  constructor(private http: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.http.token) {
       this.router.navigate(["/login"]);
       return;
    }
 
    this.http.checkToken().pipe(
       switchMap(token => {
          if (!token) {
             this.router.navigate(["/login"]);
             return EMPTY;
          }
          return this.http.loadUsers();
       })
    ).subscribe({
       next: users => this._users = users,
       error: error => console.error("Errore nel caricamento utenti:", error)
    });
 }

  select(user: UserDTO) {
    // TODO FUNZIONE DA IMPLEMENTARE
    console.log(user)
  }

  delete(user: UserDTO) {
    // TODO FUNZIONE DA IMPLEMENTARE
    console.log(user)
  }
}
