import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmRegistrationService} from '../_services/confirm-registration.service';
import {NgIf} from '@angular/common';
import {UserRegistrationReq} from '../_model/UserRegistrationReq';

@Component({
  selector: 'app-verify-registration',
  imports: [
    NgIf
  ],
  templateUrl: './verify-registration.component.html',
  styleUrl: './verify-registration.component.css'
})
export class VerifyRegistrationComponent implements OnInit {

  message!: string

  success!: boolean

  // NEL CASO IN CUI SI VOLESSE CREARE PIù SITUAZIONI DI ERRORE AGGIUNGERE QUI IL NUMERO E IL MESSAGGIO CORRISPONDENTE
  messages = {
    408: "il token per la registrazione è scaduto",
    500: "errore di comunicazione con il server"
  }

  constructor(private routes: ActivatedRoute, private confirmRegistrationService: ConfirmRegistrationService) {

  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe((params) => {
      let tokenToVerify: string = params['token']
      let token: UserRegistrationReq = {token: tokenToVerify}
      this.confirmRegistrationService.completeRegistration(token).subscribe({
        next: (_: any) => this.success = true,
        error: (error: any) => {
          // @ts-ignore
          this.message = this.messages[error.status];
        }
      })
    })
  }

}
