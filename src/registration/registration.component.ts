import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserRegistration} from '../_model/UserRegistration';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  userToRegister!: UserRegistration

  ngOnInit(): void {
    this.userToRegister = {email: '', name: '', password: '', surname: ''}
  }

  register() {
    console.log('Register clicked!', this.userToRegister)
    this.userToRegister = {email: '', name: '', password: '', surname: ''}
  }

}
