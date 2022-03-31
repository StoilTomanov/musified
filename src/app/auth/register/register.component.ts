import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') form!: NgForm

  hasMatch!: boolean;

  constructor() { }

  onRegisterSubmit(): void {
    const formData = this.form.value;
    // TODO: send data to the rest service and log in the application
    // TODO: implement repass check
    console.log(formData);
    
  }

  ngOnInit(): void {
  }

}
