import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../auth/user.service';
import { IUser } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService,
    ) { }
    userData!: IUser;
    isAdmin!: boolean;

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.userService.readUser$().subscribe(data => {
            this.userData = data;
            sessionStorage['isAdmin'] = this.userData.isAdmin;
        });
        if (sessionStorage['isAdmin'] == 'false' || sessionStorage['isAdmin'] == undefined) {
            return true;
        }
        return this.router.createUrlTree(['/courses']);
    }

}
