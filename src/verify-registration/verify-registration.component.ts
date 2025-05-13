import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmRegistrationService} from '../confirm-registration.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-verify-registration',
  imports: [
    NgIf
  ],
  templateUrl: './verify-registration.component.html',
  styleUrl: './verify-registration.component.css'
})
export class VerifyRegistrationComponent implements OnInit {

  message: string = ''

  success: boolean = false

  constructor(private routes: ActivatedRoute, private confirmRegistrationService: ConfirmRegistrationService) {

  }

  /*
  // TEST FALLIMENTO
    ngOnInit(): void {
     this.message = 'Token di autenticazione è scaduto'
    }
  */

  // TEST SUCCESSO
  ngOnInit() {
    this.success = true;
  }

  /*
  // EFFETTIVO CODICE, NON ANCORA IMPLEMENTATO
    ngOnInit(): void {
     this.routes.queryParams.subscribe((params) => {
      let tokenToVerify = params['token']
      this.confirmRegistrationService.completeRegistration(tokenToVerify).subscribe(res => this.message = res.message)
      })
    }
  */

}
