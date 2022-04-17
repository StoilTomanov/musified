import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';
import { MatDialog } from '@angular/material/dialog'
import { TakeQuizComponent } from '../take-quiz/take-quiz.component';


@Component({
  selector: 'app-watch-lesson',
  templateUrl: './watch-lesson.component.html',
  styleUrls: ['./watch-lesson.component.css'],
})
export class WatchLessonComponent implements OnInit {
  lessonById: ILesson | undefined;
  hasGiveIn: boolean = false;
  hasRated: boolean = false;
  beingRated: boolean = false;

  constructor(
    private lessonService: LessonsService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialog,
  ) { }


  ngOnInit(): void {
    this.lessonById = undefined;
    this.lessonService.getLessonById$(this.activatedRouter.snapshot.params['id'])
      .subscribe(data => {
        this.lessonById = data;
        this.hasRated = this.lessonById.rating.includes(sessionStorage['userId']);
      });
  }

  onGiveUp(): void {
    this.hasGiveIn = true;
  }

  onConfirm(event: Event): void {
    if ((event.target as Element).classList[0] == 'confirm-no') {
      this.hasGiveIn = false;
    } else if ((event.target as Element).classList[0] == 'confirm-yes') {
      const lessonId: string = this.activatedRouter.snapshot.params['id'];
      this.userService.updateUser$(`${sessionStorage['userId']}`, lessonId, 'unsubscribe')
        .subscribe();
      this.lessonService.unsubscribeToLesson$(lessonId)
        .subscribe();

      setTimeout(() => {
        this.router.navigate(['mylessons']);
      }, 150);
    }
  }

  onRate(): void {
    this.beingRated = true;
  }


  submitRating(event: Event): void {
    const target = event.target as Element;
    const command = target.textContent;
    if (command == 'Back') {
      this.beingRated = false;
    } else {
      const lessonId: string = this.activatedRouter.snapshot.params['id'];
      if (typeof Number(command) == 'number') {
        this.lessonService.updateProgress$(lessonId, Number(command))
          .subscribe();
        this.beingRated = false;
        this.hasRated = true;
      }
    }
  }

  onReport() {
    this.router.navigate(['contacts']);
  }

  onTakeQuiz(): void {
    this.dialogRef.open(TakeQuizComponent, {
      data: this.lessonById?._id
    });
    document.getElementsByTagName('mat-dialog-container')[0].setAttribute('data-url', 'watch');
  }

}
