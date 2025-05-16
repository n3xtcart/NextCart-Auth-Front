import {Component, OnInit} from '@angular/core';
import {GroupDTO} from '../../_model/Group';
import {HttpService} from '../../_services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-menu-show-groups',
  imports: [],
  templateUrl: './main-menu-show-groups.component.html',
  styleUrl: './main-menu-show-groups.component.css'
})
export class MainMenuShowGroupsComponent implements OnInit {
  private _groups: GroupDTO[] = [];

  get groups(): GroupDTO[] {
    return this._groups;
  }

  constructor(private http: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.http.token){
      this.http.checkToken().subscribe({
        next: (token) => {
          if(!token)this.router.navigate(["/login"]);
          else{ this.http.loadGroups().subscribe({
            next: (groups) => {
              this._groups = groups;
            },
            error: (error) => {
              console.log(error);
            }
          })}
        },
        error: (error) => {
          console.log(error);
        }
      })
    }else this.router.navigate(["/login"]);

  }

  select(group: GroupDTO) {
    // TODO IMPLEMENTARE FUNZIONE
    console.log(group);
  }

  delete(group: GroupDTO) {
    // TODO IMPLEMENTARE FUNZIONE
    console.group(group);
  }
}
