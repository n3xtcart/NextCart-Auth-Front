import {Routes} from '@angular/router';
import {RegistrationComponent} from '../registration/registration.component';
import {LoginComponent} from '../login/login.component';
import {VerifyRegistrationComponent} from '../verify-registration/verify-registration.component';
import {MainMenuComponent} from '../main-menu/main-menu.component';
import {MainMenuShowGroupsComponent} from '../main-menu/main-menu-show-groups/main-menu-show-groups.component';
import {MainMenuShowRolesComponent} from '../main-menu/main-menu-show-roles/main-menu-show-roles.component';
import {MainMenuShowUsersComponent} from '../main-menu/main-menu-show-users/main-menu-show-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthGuard } from './AuthGurd';

export const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verify',
    component: VerifyRegistrationComponent, canActivate:[AuthGuard]
  },
  {
    path: 'main-menu',
    component: MainMenuComponent, canActivate:[AuthGuard]
  },
  {
    path: 'main-menu/groups',
    component: MainMenuShowGroupsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'main-menu/roles',
    component: MainMenuShowRolesComponent, canActivate:[AuthGuard]
  },
  {
    path: 'main-menu/users',
    component: MainMenuShowUsersComponent, canActivate:[AuthGuard]
  },
  {path:"createUser",component:CreateUserComponent, canActivate:[AuthGuard]}
];
