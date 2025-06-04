import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserDTO} from '../_model/UserDTO';
import {catchError, Observable, of, tap} from 'rxjs';
import {GroupDTO} from '../_model/GroupDTO';
import {RoleDTO} from '../_model/RoleDTO';
import {TokenDTO} from '../_model/TokenDTO';
import {LoginInfo} from '../_model/LoginInfo';
import {Message} from '../_model/Message';
import {Page} from '../main-menu/main-menu-show-groups/Page';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.getHeaderAuth();
  }

  tokens!: TokenDTO;

  getHeaderAuth(): HttpHeaders {
    const tokenString = this.cookieService.get('tokens');
    if (tokenString) {
      try {
        this.tokens = JSON.parse(tokenString);
        console.log('Token retrieved from cookies:', this.tokens);
      } catch (e) {
        console.error('Invalid token format in cookies:', e);
        this.cookieService.delete('tokens');
      }
    } else {
      console.warn('No token found in cookies');
      this.tokens = {accessToken: '', refreshToken: ''}; // Default empty tokens
    }
    return new HttpHeaders({Authorization: `Bearer ${this.tokens.accessToken}`});
  }

  getHeaderRefresh(): HttpHeaders {
    const tokenString = this.cookieService.get('tokens');
    if (tokenString) {
      try {
        this.tokens = JSON.parse(tokenString);
        console.log('Token retrieved from cookies:', this.tokens);
      } catch (e) {
        console.error('Invalid token format in cookies:', e);
        this.cookieService.delete('tokens');
      }
    } else {
      console.warn('No token found in cookies');
      this.tokens = {accessToken: '', refreshToken: ''}; // Default empty tokens
    }
    return new HttpHeaders({Authorization: `Bearer ${this.tokens.refreshToken}`});
  }


  refreshToken(): Observable<TokenDTO> {
    const headers = this.getHeaderRefresh();
    return this.http.post<TokenDTO>("http://localhost:8080/tokens/refresh", {}, {headers}).pipe(
      tap((tokens: TokenDTO) => {
        console.log("Token refreshed successfully: ", tokens);
        this.tokens = tokens;
        this.cookieService.set('tokens', JSON.stringify(this.tokens));
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error refreshing token: ", error);
        alert(error.error);
        return of({accessToken: '', refreshToken: ''});
      })
    );

  }

  getAllGroupsPag(pageIndex: number, pageSize: number): Observable<Page<GroupDTO> | never[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<Page<GroupDTO>>(`http://localhost:8080/groups/paginated/${pageIndex}/${pageSize}`, {
      headers
    }).pipe(
      tap(groups => {
        console.log("Groups loaded: ", groups);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error);
        return of([]);
      })
    );
  }

  getAllUsersPag(pageIndex: number, pageSize: number): Observable<Page<UserDTO> | never[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<Page<UserDTO>>(`http://localhost:8080/users/paginated/${pageIndex}/${pageSize}`, {headers}).pipe(
      tap(groups => {
        console.log("Groups loaded: ", groups);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error);
        return of([]);
      })
    );
  }

  getAllRolesPag(pageIndex: number, pageSize: number): Observable<Page<RoleDTO> | never[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<Page<RoleDTO>>(`http://localhost:8080/roles/paginated/${pageIndex}/${pageSize}`, {headers}).pipe(
      tap(groups => {
        console.log("Groups loaded: ", groups);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error);
        return of([]);
      })
    );
  }

  login(email: string, password: string): Observable<TokenDTO> {
    let info: LoginInfo = {
      email: email,
      password: password,
    }
    info.password = password;
    return this.http.post<TokenDTO>("http://localhost:8080/users/login", info).pipe(
      tap((tokens) => {
        console.log("login in corso per email : " + info.email);
        this.tokens = tokens;
        this.cookieService.set('tokens', JSON.stringify(this.tokens));
        setTimeout(this.refreshToken, JSON.parse(atob(tokens.accessToken.split('.')[1])) - Math.floor(Date.now() / 1000) * 1000 - 120000);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error)
        return [];
      })
    );

  }

  checkToken(): Observable<boolean> {
    const headers = this.getHeaderAuth();
    return this.http.get<boolean>("http://localhost:8080/tokens/checkToken", {headers}).pipe(
      tap(() => {
        console.log("check token");
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error)
        return of(false);
      })
    );
  }

  register(user: UserDTO): Observable<Message> {
    console.log(user)
    return this.http.post<string>("http://localhost:8080/users/register", user).pipe(
      tap(resp => {
        console.log("register user , resp:" + resp);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error)
        return of(error.error);
      })
    );
  }

  createUser(user: UserDTO): Observable<Message> {
    const headers = this.getHeaderAuth();
    return this.http.post<string>("http://localhost:8080/users/create", user, {headers}).pipe(
      tap(resp => {
        console.log("register user , resp:" + resp);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error)
        return of(error.error);
      })
    );
  }

  // TODO ENDPOINT DA DEFINIRE

  loadUsers(): Observable<UserDTO[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<UserDTO[]>("http://localhost:8080/users", {headers})
  }

  loadGroups(): Observable<GroupDTO[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<GroupDTO[]>("http://localhost:8080/groups", {headers})
  }

  loadRoles(): Observable<RoleDTO[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<RoleDTO[]>("http://localhost:8080/roles", {headers})
  }
}


