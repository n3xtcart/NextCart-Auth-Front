import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {UserDTO} from '../_model/User';
import {catchError, Observable, of, tap} from 'rxjs';
import {GroupDTO} from '../_model/Group';
import {RoleDTO} from '../_model/Role';
import { Token } from '../_model/Token';
import { LoginInfo } from '../_model/LoginInfo';
import { UserRegistration } from '../_model/UserRegistration';
import { message } from '../_model/Message';
import { Page } from '../main-menu/main-menu-show-groups/Page';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  getAllGroupsPag(pageIndex: number, pageSize: number): Observable<Page<GroupDTO>|never[]>  {
    const headers = new HttpHeaders({ Authorization: `${JSON.stringify(this.token)}` });
    return this.http.get<Page<GroupDTO>>(`http://localhost:8080/groups/paginated/${pageIndex}/${pageSize}`, { headers }).pipe(
      tap(groups => {
        console.log("Groups loaded: ", groups);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error);
        return of([]);
      })
    );
  }

    getAllUsersPag(pageIndex: number, pageSize: number): Observable<Page<UserDTO>|never[]>  {
    const headers = new HttpHeaders({ Authorization: `${JSON.stringify(this.token)}` });
    return this.http.get<Page<UserDTO>>(`http://localhost:8080/users/paginated/${pageIndex}/${pageSize}`, { headers }).pipe(
      tap(groups => {
        console.log("Groups loaded: ", groups);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error);
        return of([]);
      })
    );
  }

   getAllRolesPag(pageIndex: number, pageSize: number): Observable<Page<RoleDTO>|never[]>  {
    const headers = new HttpHeaders({ Authorization: `${JSON.stringify(this.token)}` });
    return this.http.get<Page<RoleDTO>>(`http://localhost:8080/roles/paginated/${pageIndex}/${pageSize}`, { headers }).pipe(
      tap(groups => {
        console.log("Groups loaded: ", groups);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error);
        return of([]);
      })
    );
  }

  constructor(private http: HttpClient) {
  }

  token!: Token

  login(email:string,password:string) :Observable<Token> {
    let info:LoginInfo=new LoginInfo;
    info.email=email;
    info.password=password;
    return this.http.post<Token>("http://localhost:8080/users/login",info).pipe(
      tap(()=>{
        console.log("login in corso per email : "+info.email);
      }),
      catchError((error: HttpErrorResponse) => {
       alert(error.error)
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
        alert(error.error)
        return of(false);
      })
    );;

  }

  register(user: UserRegistration):Observable<message> {
    console.log(user)
    return this.http.post<string>("http://localhost:8080/users/register",user).pipe(
      tap(resp=>{
        console.log("register user , resp:"+resp);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error)
        return of(error.error);
      })
    );;

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


