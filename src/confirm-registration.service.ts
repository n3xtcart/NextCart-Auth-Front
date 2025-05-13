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
    // TODO CHIAMA END-POINT PER LA VERIFICA DEL TOKEN
    return this.http.post<any>('', token)
  }
}
