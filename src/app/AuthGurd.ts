import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from '../_services/http.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private service :HttpService,private cookie:CookieService) {}

  canActivate(): boolean {
    let tokens = this.service.tokens;
    if (!tokens) {
      const tokenString = this.cookie.get('tokens');
      if (tokenString) {
        try {
          tokens = JSON.parse(tokenString);
          this.service.tokens = tokens; // Update the service token
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