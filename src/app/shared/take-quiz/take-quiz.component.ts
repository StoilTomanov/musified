import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';


@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  lessonData!: any[];
  hasCompleted: string = ''
  @ViewChild('takeQuizForm') form!: NgForm;


  constructor(
    private lessonService: LessonsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    this.lessonService.getLessonById$(this.data)
      .subscribe(data => this.lessonData = data.quiz);
  }

  onTakeQuizSubmit(event: Event): void {
    const quizData = this.form.value;
    const lessonId = (event.target as Element).id;

    this.lessonService.compareQuizResults$(lessonId, quizData)
      .subscribe(data => this.hasCompleted = data);
      
  }

}
