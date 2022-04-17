import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../auth/user.service';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }
  userData!: IUser;
  isAdmin!: boolean;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage['isAdmin'] == 'true') {
      return true;
    }
    return this.router.createUrlTree(['/explore']);
  }

}
