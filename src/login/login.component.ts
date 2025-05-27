import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Token } from '../_model/Token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string="";
  password:string="";

  constructor(private service:HttpService,private router:Router){
  }

  login(){
    this.service.login(this.email,this.password).subscribe(data=>{
      if(data){
        let token: Token = data as unknown as Token;
        this.service.token=token;
        localStorage.setItem("token",JSON.stringify(token));
        this.router.navigate(["/main-menu"]);
      }
    })

  }

}
