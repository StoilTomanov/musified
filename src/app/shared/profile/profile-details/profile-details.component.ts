import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { IUser } from 'src/app/interfaces';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
    @ViewChild('updateUserDataFrom') form!: NgForm

    userData: IUser | undefined;
    errors: string = '';
    hasErrors: boolean | undefined;

    constructor(
        private userService: UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.userService.readUser$()
            .subscribe((data) => {
                this.userData = data;
                this.form.form.patchValue({
                    username: this.userData.username,
                    email: this.userData.email,
                })
            });
    }

    onEditUserDataSubmit(): void {
        this.hasErrors = false;
        this.userService.updateUserDetails$({
            userId: sessionStorage['userId'],
            email: this.form.value.email,
            username: this.form.value.username,
            password: this.form.value.password,
            newPassword: this.form.value.newPassword,
        }).pipe(catchError((err) => {
            this.errors = err.error.message;
            this.hasErrors = true;
            throw err;
        })).subscribe((data) => {
            sessionStorage['username'] = data.username;
            this.router.navigate(['explore']);
        });
    }
}
