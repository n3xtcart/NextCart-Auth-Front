import {Component, OnInit} from '@angular/core';
import {GroupDTO} from '../../_model/GroupDTO';
import {HttpService} from '../../_services/http.service';
import {Router} from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Page } from './Page';


@Component({
  selector: 'app-main-menu-show-groups',
  imports: [MatPaginatorModule],
  templateUrl: './main-menu-show-groups.component.html',
  styleUrl: './main-menu-show-groups.component.css'
})
export class MainMenuShowGroupsComponent  {
  private _groups: GroupDTO[] = [];

                 totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  totalPages: number=0;
  get groups(): GroupDTO[] {
    return this._groups;
  }


  constructor(private http: HttpService, private router: Router) {
    http.getAllGroupsPag(this.pageIndex, this.pageSize).subscribe((data: Page<GroupDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this._groups = [];
        this.totalElements = 0;
      } else {
        this._groups = data.content;
        this.totalElements = data.totalElement;
        console.log("Total elements: ", this.totalElements);
        this.pageSize = data.size;
        this.totalPages = data.totalPages;
      }
      console.log("Groups loaded: ", this._groups);
    });
  }




  select(group: GroupDTO) {
    // TODO IMPLEMENTARE FUNZIONE
    console.log(group);
  }

  delete(group: GroupDTO) {
    // TODO IMPLEMENTARE FUNZIONE
    console.group(group);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("Page changed to: ", this.pageIndex, " with size: ", this.pageSize);
    this.http.getAllGroupsPag(this.pageIndex, this.pageSize).subscribe((data: Page<GroupDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this._groups = [];
        this.totalElements = 0;
      } else {
        this._groups = data.content;
        this.totalElements = data.totalElement;

      }
      console.log("Groups loaded: ", this._groups);
    });
}
}
