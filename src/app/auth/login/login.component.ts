import {  Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') form!: NgForm

  constructor(private userService: UserService) {

  }

  onLoginSubmit(): void {
    const formData = this.form.value
    // TODO: send data to the rest service and log in the application
    // TODO: implement repass check

    console.log(formData);
    this.form.reset();
  }

  ngOnInit(): void {

  }

}
