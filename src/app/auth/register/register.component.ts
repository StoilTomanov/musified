import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  userData!: IUser;

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
    .subscribe(data => this.userData = data)
    // TODO: send data to the rest service and log in the application
    // TODO: implement repass check - DONE
    return this.userData;
  }
}
