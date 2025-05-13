import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmRegistrationService} from '../confirm-registration.service';
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

  messages = {
    408: "il token per la registrazione è scaduto",
    500: "errore di comunicazione con il server"
  }

  constructor(private routes: ActivatedRoute, private confirmRegistrationService: ConfirmRegistrationService) {

  }

  /*
  // TEST FALLIMENTO
    ngOnInit(): void {
     this.message = 'Token di autenticazione è scaduto'
    }
  */

  // TEST SUCCESSO
  // ngOnInit() {
  //   this.success = true;
  // }

  // EFFETTIVO CODICE, NON ANCORA IMPLEMENTATO
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
