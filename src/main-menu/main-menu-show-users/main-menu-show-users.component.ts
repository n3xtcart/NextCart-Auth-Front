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
export class MainMenuShowUsersComponent {
  private _users: UserDTO[] = [];

  get users(): UserDTO[] {
    return this._users;
  }

  constructor(private http: HttpService, private router: Router) {
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
