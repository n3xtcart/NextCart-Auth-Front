import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {User} from '../_model/User';
import {catchError, Observable, of, tap} from 'rxjs';
import {Group} from '../_model/Group';
import {Role} from '../_model/Role';
import { Token } from '../_model/Token';
import { LoginInfo } from '../_model/LoginInfo';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  token!: Token

  login(email:string,password:string) :Observable<Token> {
    let info:LoginInfo=new LoginInfo;
    info.email=email;
    info.password=password;
    return this.http.post<Token>("/login",info).pipe(
      tap(()=>{
        console.log("login in corso per email : "+info.email);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.error);
        return [];
      })
    );

  }

  checkToken(token: Token): Observable<boolean> {
    console.log(token)
    const headers = new HttpHeaders({ Authorization: `${JSON.stringify(token)}` });
  
    return this.http.get<boolean>("/tokens/checkToken", { headers }).pipe(
      tap(()=>{
        console.log("check token");
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(false);
      })
    );;

  }

  register() {

  }

  // TODO ENDPOINT DA DEFINIRE

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/users")
  }

  loadGroups(): Observable<Group[]> {
    return this.http.get<Group[]>("/api/groups")
  }

  loadRoles(): Observable<Role[]> {
    return this.http.get<Role[]>("/api/roles")
  }
}


