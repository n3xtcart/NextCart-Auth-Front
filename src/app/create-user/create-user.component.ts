import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../_services/http.service';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
userToRegister: any;
groups: any;

constructor(private service: HttpService) {  }
 ngOnInit(): void {
    this.userToRegister = {email: '', name: '', password: '', surname: '', group: {id: 0,roleDTO: {id: 0,priority: 0, admin: false,descrizione: ''}}};
    this.service.loadGroups().subscribe((groups) => {
      this.groups = groups;
      
    }, error => {
      console.error('Error loading groups:', error);
    });
  }

  register() {
    console.log('Register clicked!', this.userToRegister)
    this.service.register(this.userToRegister).subscribe((resp ) => alert(resp.message))
  }

}
