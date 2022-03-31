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
    if(formData.password != formData.repeatPassword){
      console.log('mismatch');
      this.hasMatch = false;
    }else{
      this.hasMatch = true;
    }
    // TODO: send data to the rest service and log in the application
    console.log(formData);
    
  }

  ngOnInit(): void {
  }

}
