import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from '../_services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private service :HttpService) {}

  canActivate(): boolean {
    let token = this.service.token;
    if (!token) {
      const tokenString = localStorage.getItem('jwt_token');
      if (tokenString) {
        try {
          token = JSON.parse(tokenString);
          console.log('Token retrieved from localStorage:', token);
          this.service.token = token; // Update the service token
        } catch (e) {
          console.error('Invalid token format in localStorage:', e);
          this.router.navigate(['/login']);
          return false;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}