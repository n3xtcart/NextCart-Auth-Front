import {Component,OnInit} from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

  ngOnInit(){
    if(this.service.token){
      this.service.checkToken(this.service.token).subscribe({
        next: (token) => {
          if(!token)this.router.navigate(["/login"]);
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    }else this.router.navigate(["/login"]);

  }



  constructor(private service:HttpService,private router:Router){
  }

}
