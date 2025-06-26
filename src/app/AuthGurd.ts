import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {HttpService} from '../_services/http.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private service: HttpService,
              private cookie: CookieService) {
  }

  canActivate(): boolean {
    console.log("canActivate")
    let tokens = this.service.tokens;
    console.log(tokens)
    if (!tokens) {
      console.log("not tokens")
      const tokenString = this.cookie.get('tokens');
      if (tokenString) {

        console.log("token in cookie")
        try {
          tokens = JSON.parse(tokenString);
          this.service.tokens = tokens; // Update the service token
        } catch (e) {
          console.error('Invalid token format in localStorage:', e);
          this.router.navigate(['/login']);
          return false;
        }
      } else {

        console.log("not tokens in cookie")
        this.router.navigate(['/login']);
        return false;
      }
    }
    console.log("tokens")
    return true;
  }
}
