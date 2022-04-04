import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('loginForm') form!: NgForm
  
  private userData!: IUser;

  constructor(private userService: UserService) {

  }

  onLoginSubmit(): IUser {
    const formData = this.form.value;
    this.userService.login$(formData.username, formData.password)
    .subscribe(data => this.userData = data)
    return this.userData;
  }

}
