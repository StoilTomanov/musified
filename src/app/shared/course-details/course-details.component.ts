import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthHandlerService } from 'src/app/auth-handler.service';
import { UserService } from 'src/app/auth/user.service';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';
import { MatDialog } from '@angular/material/dialog'
import { CreateQuizComponent } from '../create-quiz/create-quiz.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  lessonById: ILesson | undefined;
  isSubscribed!: boolean;
  isAdmin: string = sessionStorage['isAdmin'];

  constructor(
    private lessonService: LessonsService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private storage: AuthHandlerService,
    private dialogRef: MatDialog,
  ) { }

  isLogged!: boolean;
  ratingYellowStars!: number;
  ratingDarkStars!: number;

  ngOnInit(): void {
    const storageStatus = this.storage.getStorage()
    this.isLogged = storageStatus['userId'];
    this.lessonById = undefined;
    
    setTimeout(() => {
      this.lessonService.getLessonById$(this.activatedRouter.snapshot.params['id'])
        .subscribe(data => {
          this.lessonById = data;
          if (this.lessonById.rating.length == 0) {
            this.ratingYellowStars = Math.round(this.lessonById.ratingScore / 1);
          } else {
            this.ratingYellowStars = Math.round(this.lessonById.ratingScore / this.lessonById.rating.length);
          }
          this.ratingDarkStars = 5 - this.ratingYellowStars;
        });
    }, 100);

    if (sessionStorage['isAdmin'] == 'false') {
      this.lessonService.updateViewsScore$(this.activatedRouter.snapshot.params['id'])
        .subscribe();
    }

    this.userService.readUser$()
      .subscribe(data => {
        const lessonId: string = this.activatedRouter.snapshot.params['id'];
        if (data.subscriptions.includes(lessonId)) {
          this.isSubscribed = true;
        }
      });

  }

  onSubscribe(): void {
    const lessonId: string = this.activatedRouter.snapshot.params['id'];
    this.userService.updateUser$(`${sessionStorage['userId']}`, lessonId, 'subscribe')
      .subscribe();
    this.lessonService.subscribeToLesson$(lessonId)
      .subscribe(data => this.lessonById = data);
    setTimeout(() => {
      this.router.navigate(['mylessons']);
    }, 300);
  }

  onBack(): void {
    this.router.navigate(['explore']);
  }


  onBackToCourses(): void {
    this.router.navigate(['mylessons']);
  }

  onReport() {
    this.router.navigate(['contacts']);
  }

  onEdit(): void {
    const lessonId = this.activatedRouter.snapshot.params['id'];
    this.router.navigate(['edit/' + lessonId]);
  }

  onDelete(): void {
    const lessonId = this.activatedRouter.snapshot.params['id'];
    this.lessonService.deleteCourse$(lessonId)
      .subscribe();
    this.router.navigate(['explore']);
  }

  onCreateQuiz(): void {
    this.dialogRef.open(CreateQuizComponent, {});
    document.getElementsByTagName('mat-dialog-container')[0].setAttribute('data-url', 'watch');
  }

}
