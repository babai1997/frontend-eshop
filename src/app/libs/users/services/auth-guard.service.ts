/*
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageToken: LocalstorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
*/

import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { LocalstorageService } from "./localstorage.service";

//I was able to adapt my class to use the CanActivateFn type function return.

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const router: Router = inject(Router);
  const localStorageToken: LocalstorageService = inject(LocalstorageService);

  const token = localStorageToken.getToken();

  if (token) {
    const tokenDecode = JSON.parse(atob(token.split('.')[1]));
    if (tokenDecode.isAdmin && !localStorageToken._tokenExpired(tokenDecode.exp)) return true;
  }

  router.navigate(['/login']);
  return false;

  // if (tokenStorage.isTokenExpired()) {
  //   return router.navigate(['forbidden']);
  // }
  // else {
  //   const roles = route.data['permittedRoles'] as Array<string>;
  //   const userRole = tokenStorage.getUserToken().role;

  //   if (roles && !roles.includes(userRole)) {
  //     return router.navigate(['login']);
  //   }
  //   else
  //     return true;
  // }

}
