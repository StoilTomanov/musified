import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../user.service';
import { Subscription, catchError, finalize } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
    @ViewChild('loginForm') form: NgForm | undefined
    errors: string = '';
    loginSubscription: Subscription | undefined;
    private userData: IUser | undefined;

    constructor(private userService: UserService) { }

    onLoginSubmit(): IUser | undefined {
        if (!this.form) {
            return undefined;
        }
        const formData = this.form.value;
        this.loginSubscription = this.userService.login$(formData.username, formData.password).pipe(
            finalize(() => this.clearErrors()),
            catchError((err) => {
                this.errors = err.error.message;
                throw err;
            })
        ).subscribe((data) => this.userData = data);

        return this.userData;
    }

    clearErrors(): void {
        setTimeout(() => this.errors = '', 4000);
    }

    ngOnDestroy(): void {
        this.loginSubscription?.unsubscribe;
        this.loginSubscription = undefined;
    }
}
