import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../user.service';
import { Subscription, catchError, finalize } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    @ViewChild('registerForm') form: NgForm | undefined;

    hasMatch: boolean = true;
    errors: string = '';
    private userData: IUser | undefined;
    registerSubscription: Subscription | undefined;

    constructor(private userService: UserService) { }

    passwordMatchCheck(): void {
        if (!this.form) {
            return;
        }
        if (this.form.value.password != this.form.value.repeatPassword) {
            this.hasMatch = false;
        } else {
            this.hasMatch = true;
        }
    }

    onRegisterSubmit(): IUser | undefined {
        if (!this.form) {
            return undefined;
        }
        const formData = this.form.value;
        this.registerSubscription = this.userService.register$(formData.username, formData.email, formData.password).pipe(
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
        this.registerSubscription?.unsubscribe;
        this.registerSubscription = undefined;
    }
}
