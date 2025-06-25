import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpService} from '../_services/http.service';
import {GroupDTO} from '../_model/GroupDTO';
import {UserDTO} from '../_model/UserDTO';

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
  userToRegister: UserDTO = {
    nome: '',
    cognome: '',
    email: '',
    password: '',
    groupDTO: {
      roleDTO: [],
      descrizione: '',
      id: 0,
      ultimaModifica: undefined,
      dataCreazione: undefined,
      creationUser: undefined
    },
    id: 0,
    ultimaModifica: undefined,
    dataCreazione: undefined,
    creationUser: undefined
  }
  groups: GroupDTO[] = [];

  constructor(private service: HttpService) {

  }

  ngOnInit(): void {
    this.service.loadGroups().subscribe((groups) => {
      this.groups = groups;

    }, error => {
      console.error('Error loading groups:', error);
    });
  }

  register() {
    console.log('Register clicked!', this.userToRegister)
    this.service.register(this.userToRegister).subscribe((resp) => alert(resp.message))
  }


}
