import {Component, OnInit} from '@angular/core';
import {HttpService} from '../_services/http.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs';
import {UserDTO} from '../_model/UserDTO';

@Component({
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

  userDTO: UserDTO

  constructor(private service: HttpService, private router: Router) {
    let obj: {
      user: string;
    } = JSON.parse(atob(this.service.tokens?.accessToken ? this.service.tokens.accessToken.split('.')[1] : ''
    ))
    console.log(obj.user)
    this.userDTO = JSON.parse(obj.user);
  }

}
