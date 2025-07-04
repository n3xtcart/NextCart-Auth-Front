import {Component} from '@angular/core';
import {RoleDTO} from '../../_model/RoleDTO';
import {Router} from '@angular/router';
import {HttpService} from '../../_services/http.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Page} from '../../_model/Page';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-main-menu-show-roles',
  imports: [MatPaginatorModule],
  templateUrl: './main-menu-show-roles.component.html',
  styleUrl: './main-menu-show-roles.component.css'
})
export class MainMenuShowRolesComponent {
  private _roles: RoleDTO[] = [];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  totalPages: number = 0;

  get roles(): RoleDTO[] {
    return this._roles;
  }

  constructor(private http: HttpService, private router: Router) {
    http.getAllRolesPag(this.pageIndex, this.pageSize).subscribe((data: Page<RoleDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this._roles = [];
        this.totalElements = 0;
      } else {
        this._roles = data.content;
        this.totalElements = data.totalElements;
        console.log("Total elements: ", this.totalElements);
        this.pageSize = data.pageSize;
        this.totalPages = data.totalPages;
      }
      console.log("Groups loaded: ", this._roles);
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("Page changed to: ", this.pageIndex, " with size: ", this.pageSize);
    this.http.getAllRolesPag(this.pageIndex, this.pageSize).subscribe((data: Page<RoleDTO> | never[]) => {
      if (!data) return;
      if (Array.isArray(data)) {
        this._roles = [];
        this.totalElements = 0;
      } else {
        this._roles = data.content;
        this.totalElements = data.totalElements;
      }
      console.log("Roles loaded: ", this._roles);
    });
  }


  select(role: RoleDTO) {
    console.log(role);
    this.router.navigate([`/detail/role/${role.id}`]);
  }

  delete(role: RoleDTO) {
      this.http.deleteRole(role).subscribe(()=>{
           this.http.getAllRolesPag(this.pageIndex, this.pageSize).subscribe((data: Page<RoleDTO> | never[]) => {
        if (!data) return;
        if (Array.isArray(data)) {
          this._roles = [];
          this.totalElements = 0;
        } else {
          this._roles = data.content;
          this.totalElements = data.totalElements;
          console.log("Total elements: ", this.totalElements);
          this.pageSize = data.pageSize;
          this.totalPages = data.totalPages;
        }
        console.log("Roles loaded: ", this._roles);
      });
      })
    }

  protected readonly formatDate = formatDate;
}
