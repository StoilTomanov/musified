import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { LessonsService } from '../lessons.service';
import { TakeQuizComponent } from '../take-quiz/take-quiz.component';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  lessonData!: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private lessonService: LessonsService,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onTryAgain(event: Event): void {
    this.lessonData = (event.target as Element).id;

    this.dialogRef.open(TakeQuizComponent, {
      data: this.lessonData,
    })
    setTimeout(() => {
      document.getElementsByTagName('mat-dialog-container')[0].setAttribute('data-url', 'watch');
    }, 100)
  }

  onMoreCourses(event: Event): void {
    this.lessonData = (event.target as Element).id;
    this.userService.updateUserCourses$(sessionStorage['userId'], this.lessonData, 'pass-course')
      .subscribe();
    this.userService.updateUser$(sessionStorage['userId'], this.lessonData, 'unsubscribe')
      .subscribe();
    this.lessonService.unsubscribeToLesson$(this.lessonData)
      .subscribe();
    this.router.navigate(['/explore'])
  }

}
