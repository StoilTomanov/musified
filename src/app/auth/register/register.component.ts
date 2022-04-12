import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  @ViewChild('registerForm') form!: NgForm

  hasMatch: boolean = true;
  private userData!: IUser;
  errors: string = '';

  constructor(private userService: UserService) { }

  passwordMatchCheck(): void {
    if (this.form.value.password != this.form.value.repeatPassword) {
      this.hasMatch = false;
    } else {
      this.hasMatch = true;
    }
  }

  onRegisterSubmit(): IUser {
    const formData = this.form.value;
    this.userService.register$(formData.username, formData.email, formData.password)
      .subscribe({
        next: (data) => { this.userData = data },
        error: (err) => { this.errors = err.error.message }
      })
    setTimeout(() => {
      this.errors = ''
    }, 4000);
    return this.userData;
  }
}
