import {Component} from '@angular/core';
import {UserDTO} from '../../_model/UserDTO';
import {HttpService} from '../../_services/http.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {formatDate} from '@angular/common';
import ModalUserComponent from '../../app/modal-user/modal-user.component';

@Component({
  selector: 'app-detail-user',
  imports: [ModalUserComponent,
    RouterLink
  ],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent {
  user!: UserDTO

  constructor(private http: HttpService, private activatedRoute: ActivatedRoute) {
    this.http.getUserById(this.activatedRoute.snapshot.params['id']).subscribe(
      user => {
        console.log(user)
        this.user = user;
      }
    )
  }

 

  delete() {
this.http.deleteUser(this.user).subscribe()
  
  }

  protected readonly formatDate = formatDate;
}
