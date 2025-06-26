import {Component, Input} from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {GroupDTO} from '../../_model/GroupDTO';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {formatDate} from '@angular/common';
import {    FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import ModalGroupComponent from "../../app/modal-group/modal-group.component";

@Component({
  selector: 'app-detail-group',
  imports: [FormsModule, MatPaginatorModule,
    RouterLink, ModalGroupComponent],
  templateUrl: './detail-group.component.html',
  styleUrl: './detail-group.component.css'
})
export class DetailGroupComponent {
  group!: GroupDTO

  modifyForm!: GroupDTO

  


  constructor(private http: HttpService, private activatedRoute: ActivatedRoute) {
    this.http.getGroupById(this.activatedRoute.snapshot.params['id']).subscribe(e => {
      this.group = e;
    });
  }




  delete() {
    this.http.deleteGroup(this.group).subscribe()
  }

  protected readonly formatDate = formatDate;
}
