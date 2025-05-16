import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {UserDTO} from '../_model/User';
import {catchError, Observable, of, tap} from 'rxjs';
import {GroupDTO} from '../_model/Group';
import {RoleDTO} from '../_model/Role';
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
    return this.http.post<Token>("http://localhost:8080/login",info).pipe(
      tap(()=>{
        console.log("login in corso per email : "+info.email);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return [];
      })
    );

  }

  checkToken(): Observable<boolean> {
    const headers = new HttpHeaders({ Authorization: `${JSON.stringify(this.token)}` });
  
    return this.http.get<boolean>("http://localhost:8080/tokens/checkToken", { headers }).pipe(
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

  loadUsers(): Observable<UserDTO[]> {
    const headers = new HttpHeaders({ Authorization: `${JSON.stringify(this.token)}` });
    return this.http.get<UserDTO[]>("http://localhost:8080/users", { headers })
  }

  loadGroups(): Observable<GroupDTO[]> {
    const headers = new HttpHeaders({ Authorization: `${JSON.stringify(this.token)}` });
    return this.http.get<GroupDTO[]>("http://localhost:8080/groups", { headers })
  }

  loadRoles(): Observable<RoleDTO[]> {
    const headers = new HttpHeaders({ Authorization: `${JSON.stringify(this.token)}` });
    return this.http.get<RoleDTO[]>("http://localhost:8080/roles", { headers })
  }
}


