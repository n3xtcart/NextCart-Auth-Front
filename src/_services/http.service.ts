import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_model/User';
import {Observable} from 'rxjs';
import {Group} from '../_model/Group';
import {Role} from '../_model/Role';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  token!: string

  login() {

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
