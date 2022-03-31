import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') form!: NgForm

  hasMatch: boolean = true;

  constructor() { }

  passwordMatchCheck(): void {
    if (this.form.value.password != this.form.value.repeatPassword) {
      this.hasMatch = false;
    } else {
      this.hasMatch = true;
    }
  }

  onRegisterSubmit(): void {
    const formData = this.form.value;
    // TODO: send data to the rest service and log in the application
    // TODO: implement repass check - DONE
    console.log(formData);
    this.form.reset();;

  }

  ngOnInit(): void {
  }

}
