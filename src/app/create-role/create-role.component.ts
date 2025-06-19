import {Component} from '@angular/core';
import {RoleDTO} from '../../_model/RoleDTO';
import {Router} from '@angular/router';
import {HttpService} from '../../_services/http.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-role',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent {
  roleForm: FormGroup;

  constructor(private http: HttpService, private fb: FormBuilder, private router: Router) {
    this.roleForm = this.fb.group({
      priority: [0, Validators.required],
      admin: [false],
      descrizione: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.roleForm.valid) {
      alert("failed")
      return
    }
    const roleData: RoleDTO = this.roleForm.value;
    console.log(roleData);
    this.http.createRole(roleData).subscribe(response => {
      console.log(response);
      if (response.message) return
      this.router.navigate(["/main-menu/roles"])
    })
  }

}
