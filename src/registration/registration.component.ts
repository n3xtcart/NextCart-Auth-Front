import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserRegistration} from '../_model/UserRegistration';
import {FormsModule} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { GroupDTO } from '../_model/GroupDTO';

@Component({
  selector: 'app-registration',
  imports: [
    RouterLink,
    FormsModule,

  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  userToRegister!: UserRegistration
  groups :GroupDTO[]=[];

  constructor(private service:HttpService){

  }

  ngOnInit(): void {
    this.userToRegister = {email: '', name: '', password: '', surname: '', group: {id: 0,roleDTO: {id: 0,priority: 0, admin: false,descrizione: ''}}};
    this.service.loadGroups().subscribe((groups) => {
      this.groups = groups;

    }, error => {
      console.error('Error loading groups:', error);
    });
  }

  register() {
    console.log('Register clicked!', this.userToRegister)
    this.service.register(this.userToRegister).subscribe((resp ) => alert(resp.message))
  }


}
