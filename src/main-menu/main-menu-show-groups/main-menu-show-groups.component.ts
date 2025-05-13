import {Component, OnInit} from '@angular/core';
import {Group} from '../../_model/Group';
import {HttpService} from '../../_services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-menu-show-groups',
  imports: [],
  templateUrl: './main-menu-show-groups.component.html',
  styleUrl: './main-menu-show-groups.component.css'
})
export class MainMenuShowGroupsComponent implements OnInit {
  private _groups: Group[] = [];

  get groups(): Group[] {
    return this._groups;
  }

  constructor(private http: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.http.loadGroups().subscribe({
      next: (groups: Group[]) => {
        this._groups = groups;
      },
      error: (error: any) => console.log(error)
    });
  }

  select(group: Group) {
    // TODO IMPLEMENTARE FUNZIONE
    console.log(group);
  }

  delete(group: Group) {
    // TODO IMPLEMENTARE FUNZIONE
    console.group(group);
  }
}
