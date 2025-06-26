import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {LoginInfo} from '../_model/LoginInfo';
import {Page} from '../_model/Page';
import {CookieService} from 'ngx-cookie-service';
import {TokenDTO} from '../_model/TokenDTO';
import {GroupDTO} from '../_model/GroupDTO';
import {UserDTO} from '../_model/UserDTO';
import {RoleDTO} from '../_model/RoleDTO';
import {Message} from '../_model/Message';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  timeoutId!: any;


  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    console.log(this.tokens)
    this.getHeaderAuth();
  }

  tokens: TokenDTO | undefined;

  getHeaderAuth(): HttpHeaders {
    if (this.tokens) {
      return new HttpHeaders({Authorization: `Bearer ${this.tokens.accessToken}`});

    } else {

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

        this.router.navigate(["/login"])
      }
      const token = this.tokens?.accessToken;
      return new HttpHeaders({Authorization: `Bearer ${token}`});
    }
  }

  getHeaderRefresh(): HttpHeaders {
    if (this.tokens) {
      return new HttpHeaders({Authorization: `Bearer ${this.tokens.accessToken}`});

    } else {

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

        this.router.navigate(["/login"])
      }
      const token = this.tokens?.refreshToken;
      return new HttpHeaders({Authorization: `Bearer ${token}`});
    }
  }


  showTimeout(): void {
    console.log("Timeout ID: ", this.timeoutId);
  }


  refreshToken(): Observable<TokenDTO> {
    const headers = this.getHeaderRefresh();
    console.log(headers)
    return this.http.post<TokenDTO>("http://localhost:8080/tokens/refresh", null, {headers}).pipe(
      tap((tokens: TokenDTO) => {
        console.log("Token refreshed successfully: ", tokens);
        this.tokens = tokens;
        this.cookieService.set('tokens', JSON.stringify(this.tokens));
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error refreshing token: ", error);
        alert(error.status);
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
        alert(error.status);
        return of([]);
      })
    );
  }

  getAllUsersPag(pageIndex: number, pageSize: number): Observable<Page<UserDTO> | never[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<Page<UserDTO>>(`http://localhost:8080/admin/users/paginated/${pageIndex}/${pageSize}`, {headers}).pipe(
      tap(groups => {
        console.log("Groups loaded: ", groups);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.status);
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
        alert(error.status);
        return of([]);
      })
    );
  }

  callBack() {
    this.refreshToken().subscribe(() => {
      const token = this.tokens?.accessToken;
      if (!token) {
        console.log("token undefined")
        return;
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const timeout = expirationTime - Date.now()-60000;

      console.log("Nuovo timeout calcolato:", timeout);

      if (timeout > 0) {
        this.timeoutId = setTimeout(() => this.callBack(), timeout);
      } else {
        console.warn("Il token è già scaduto!");
      }
    });

    console.log("Refresh token chiamato!");
  }

  login(email: string, password: string): Observable<TokenDTO> {
    let info: LoginInfo = {
      email: email,
      password: password,
    };

    return this.http.post<TokenDTO>("http://localhost:8080/users/login", info).pipe(
      tap((tokens) => {
        console.log("Login in corso per email: " + info.email);
        this.tokens = tokens;
        this.cookieService.set('tokens', JSON.stringify(this.tokens));

        const payload = JSON.parse(atob(tokens.accessToken.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        const timeout = expirationTime - Date.now()-60000;

        console.log("Timeout calcolato dinamicamente:", timeout);

        if (timeout > 0) {
          this.timeoutId = setTimeout(() => this.callBack(), timeout);
        } else {
          console.warn("Il token è già scaduto!");
        }

        this.showTimeout();
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.status);
        return [];
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
        alert(error.status)
        return of(error.error);
      })
    );

  }

  createUser(user: UserDTO): Observable<Message> {
    const headers = this.getHeaderAuth();
    return this.http.post<string>("http://localhost:8080/admin/users", user, {headers}).pipe(
      tap(resp => {
        console.log("register user , resp:" + resp);
      }),
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    );
  }

  createGroup(group: GroupDTO): Observable<Message> {
    const headers = this.getHeaderAuth();
    return this.http.post<string>("http://localhost:8080/group", group, {headers}).pipe(
      tap(resp => {
        console.log("register group , resp:" + resp);
      }),
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    );
  }

  createRole(role: RoleDTO): Observable<Message> {
    const headers = this.getHeaderAuth();
    return this.http.post<string>("http://localhost:8080/roles", role, {headers}).pipe(
      tap(resp => {
        console.log("register role , resp:" + resp);
      }),
      catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    )
  }

  // TODO ENDPOINT DA DEFINIRE

  loadUsers(): Observable<UserDTO[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<UserDTO[]>("http://localhost:8080/users", {headers}).pipe(
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    )
  }

  loadGroups(): Observable<GroupDTO[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<GroupDTO[]>("http://localhost:8080/groups", {headers}).pipe(
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    )
  }

  loadRoles(): Observable<RoleDTO[]> {
    const headers = this.getHeaderAuth();
    return this.http.get<RoleDTO[]>("http://localhost:8080/roles", {headers}).pipe(
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    )
  }

  getGroupById(id: number): Observable<GroupDTO> {
    const headers = this.getHeaderAuth();
    return this.http.get<GroupDTO>("http://localhost:8080/groups/" + id, {headers}).pipe(
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    );
  }

  getRoleById(id: number): Observable<RoleDTO> {
    const headers = this.getHeaderAuth();
    return this.http.get<RoleDTO>("http://localhost:8080/roles/" + id, {headers}).pipe(
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    );
  }

  getUserById(id: number): Observable<UserDTO> {
    const headers = this.getHeaderAuth();
    return this.http.get<UserDTO>("http://localhost:8080/admin/users/" + id, {headers}).pipe(
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    );
  }

  updateGroup(group:GroupDTO){
    const headers = this.getHeaderAuth();
    return this.http.put("http://localhost:8080/groups" ,group,{headers} ).pipe(
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    );
  }
  
  updateUser(user: UserDTO) {
    const headers = this.getHeaderAuth();
    return this.http.put("http://localhost:8080/admin/users" ,user,{headers} ).pipe(
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    );
  } 
  updateRole(role: RoleDTO) {
    const headers = this.getHeaderAuth();
    return this.http.put("http://localhost:8080/roles" ,role,{headers} ).pipe(
       catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
    );

  }
  deleteGroup(group: GroupDTO) {
  const headers = this.getHeaderAuth();
  const options = {
    headers: headers,
    body: group
  };
  return this.http.delete("http://localhost:8080/groups", options).pipe(
     catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
  );
}
  
 deleteRole(role: RoleDTO) {
  const headers = this.getHeaderAuth();
  const options = {
    headers: headers,
    body: role
  };
  return this.http.delete("http://localhost:8080/roles", options).pipe(
     catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
  );
}
 deleteUser(user: UserDTO) {
  const headers = this.getHeaderAuth();
  const options = {
    headers: headers,
    body: user
  };
  return this.http.delete("http://localhost:8080/admin/users", options).pipe(
     catchError((err: HttpErrorResponse) => {
        alert(err.status)
        return of(err.error)
      })
  );
}
}
