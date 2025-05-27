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
export class MainMenuShowGroupsComponent  {
  private _groups: GroupDTO[] = [];

  get groups(): GroupDTO[] {
    return this._groups;
  }

  constructor(private http: HttpService, private router: Router) {
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
