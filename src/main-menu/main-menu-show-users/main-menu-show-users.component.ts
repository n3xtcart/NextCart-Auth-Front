import {Component} from '@angular/core';
import {UserDTO} from '../../_model/UserDTO';
import {HttpService} from '../../_services/http.service';
import {Router} from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Page} from '../../_model/Page';

@Component({
  selector: 'app-main-menu-show-users',
  imports: [MatPaginatorModule],
  templateUrl: './main-menu-show-users.component.html',
  styleUrl: './main-menu-show-users.component.css'
})
export class MainMenuShowUsersComponent {
  private _users: UserDTO[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  totalPages: number = 0;

  get users(): UserDTO[] {
    return this._users;
  }

  constructor(private http: HttpService, private router: Router) {
    http.getAllUsersPag(this.pageIndex, this.pageSize).subscribe((data: Page<UserDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this._users = [];
        this.totalElements = 0;
      } else {
        this._users = data.content;
        this.totalElements = data.totalElements;
        console.log("Total elements: ", this.totalElements);
        this.pageSize = data.size;
        this.totalPages = data.totalPages;
      }
      console.log("Users loaded: ", this._users);
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


  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("Page changed to: ", this.pageIndex, " with size: ", this.pageSize);
    this.http.getAllUsersPag(this.pageIndex, this.pageSize).subscribe((data: Page<UserDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this._users = [];
        this.totalElements = 0;
      } else {
        this._users = data.content;
        this.totalElements = data.totalElements;

      }
      console.log("Roles loaded: ", this._users);
    });
  }
}
