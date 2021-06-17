import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService  } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookies: CookieService,
            private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    if(this.cookies.check('token')) return true;
    return this.router.parseUrl('/login');
   }
}
