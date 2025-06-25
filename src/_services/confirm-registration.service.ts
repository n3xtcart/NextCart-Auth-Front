import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfirmRegistrationService {

  constructor(private http: HttpClient) {
  }

  completeRegistration(token: string): Observable<any> {
    return this.http.post('http://localhost:8080/verify', JSON.stringify({token: token}));
  }
}
