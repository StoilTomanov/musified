import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  @ViewChild('createQuizForm') form!: NgForm;

  constructor() { }

  ngOnInit(): void {
    
  }
  
  onCreateQuizSubmit(): void {
    console.log(this.form.value);

  }

}
