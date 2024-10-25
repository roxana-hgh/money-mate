import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = localStorage.getItem('sb-vwgyfkcpejtqlyuyblqk-auth-token') ;

    
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate([environment.baseHref, 'welcome']);  
        return false
      }
   
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = localStorage.getItem('sb-vwgyfkcpejtqlyuyblqk-auth-token') ;

    
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate([environment.baseHref, 'welcome']);  
        return false
      }
   
  }
}