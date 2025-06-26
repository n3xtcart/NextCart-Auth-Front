import {Component} from '@angular/core';
import {HttpService} from '../_services/http.service';
import {Router, RouterLink} from '@angular/router';
import {UserDTO} from '../_model/UserDTO';

@Component({
  selector: 'app-main-menu',
  imports: [
    RouterLink
  ],
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

  logout() {
    this.service.tokens = {
      accessToken: "", refreshToken: ""
    }
    this.router.navigate(['/login']);
  }
}
