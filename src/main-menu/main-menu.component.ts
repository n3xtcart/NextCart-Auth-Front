import {Component,OnInit} from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

 



  constructor(private service:HttpService,private router:Router){
  }

}
