import {Component} from '@angular/core';
import {GroupDTO} from '../../_model/GroupDTO';
import {HttpService} from '../../_services/http.service';
import {Router, RouterLink} from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Page} from '../../_model/Page';

@Component({
  selector: 'app-main-menu-show-groups',
  imports: [MatPaginatorModule, RouterLink],
  templateUrl: './main-menu-show-groups.component.html',
  styleUrl: './main-menu-show-groups.component.css'
})
export class MainMenuShowGroupsComponent {
  private _groups: GroupDTO[] = [];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  totalPages: number = 0;

  get groups(): GroupDTO[] {
    return this._groups;
  }

  get maxRole(): number {
    return this._groups.map((group: GroupDTO) => group.roleDTO.length).sort((a, b) => b - a)[0]
  }

  constructor(private http: HttpService, private router: Router) {
    http.getAllGroupsPag(this.pageIndex, this.pageSize).subscribe((data: Page<GroupDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this._groups = [];
        this.totalElements = 0;
      } else {
        this._groups = data.content;
        this.totalElements = data.totalElements;
        console.log("Total elements: ", this.totalElements);
        this.pageSize = data.size;
        this.totalPages = data.totalPages;
      }
      console.log("Groups loaded: ", this._groups);
    });
  }

  select(group: GroupDTO) {
    console.log(group);
    this.router.navigate(['/detail/group/' + group.id]);
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
        this.totalElements = data.totalElements;

      }
      console.log("Groups loaded: ", this._groups);
    });
  }
}
