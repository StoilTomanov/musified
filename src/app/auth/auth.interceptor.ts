import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces';
import { Router } from '@angular/router';
import { AuthHandlerService } from '../auth-handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private storage: AuthHandlerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (sessionStorage['accessToken'] && sessionStorage['userId']) {
            request = request.clone({
                setHeaders: {
                    'X-Authorization': `${sessionStorage['accessToken']}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {

                if (event.url?.endsWith('/login') || event.url?.endsWith('/register')) {
                    const newUser: IUser = event.body;
                    this.storage.setStorage(newUser);
                    this.router.navigate(['explore']);
                } else if (event.url?.endsWith('/logout')) {
                    this.storage.removeStorage();
                }
            }
        }))
    }
}
