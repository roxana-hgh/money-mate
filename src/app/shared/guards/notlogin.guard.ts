import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NotloginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.CheckAuthenticated();

    
      if (isAuthenticated) {
        this.router.navigate(['/',environment.baseHref]);
        return false;
      } else {
       
        return true
      }
   
  }

 
}