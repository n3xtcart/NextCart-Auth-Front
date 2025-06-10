import {Component} from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {GroupDTO} from '../../_model/GroupDTO';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-detail-group',
  imports: [
    RouterLink
  ],
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

  modify() {

  }


  delete() {
    // TODO cancella
  }

  protected readonly formatDate = formatDate;
}
