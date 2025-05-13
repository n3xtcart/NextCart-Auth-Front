import {Component, OnInit} from '@angular/core';
import {User} from '../../_model/User';
import {HttpService} from '../../_services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-menu-show-users',
  imports: [],
  templateUrl: './main-menu-show-users.component.html',
  styleUrl: './main-menu-show-users.component.css'
})
export class MainMenuShowUsersComponent implements OnInit {
  private _users: User[] = [];

  get users(): User[] {
    return this._users;
  }

  constructor(private http: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.http.loadUsers().subscribe({
      next: (users) => {
        this._users = users;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  select(user: User) {
    // TODO FUNZIONE DA IMPLEMENTARE
    console.log(user)
  }

  delete(user: User) {
    // TODO FUNZIONE DA IMPLEMENTARE
    console.log(user)
  }
}
