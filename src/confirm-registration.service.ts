import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserRegistrationReq} from './_model/UserRegistrationReq';

@Injectable({
  providedIn: 'root'
})
export class ConfirmRegistrationService {

  constructor(private http: HttpClient) {
  }

  completeRegistration(token: UserRegistrationReq): Observable<any> {
    // TODO CHIAMA END-POINT PER LA VERIFICA DEL TOKEN
    return this.http.post('http://localhost:8080/verify', token);
  }
}
