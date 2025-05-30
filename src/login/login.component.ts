import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../_services/http.service';
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
    this.service.login(this.email,this.password).subscribe({
      next: (resp) => {
        console.log('Login successful:', resp);
        this.router.navigate(['/main-menu']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    });

  }

}
