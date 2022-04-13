import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthHandlerService } from 'src/app/auth-handler.service';
import { UserService } from 'src/app/auth/user.service';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  lessonById: ILesson | undefined;
  isSubscribed!: boolean;

  constructor(
    private lessonService: LessonsService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private storage: AuthHandlerService,
  ) { }

  isLogged!: boolean;
  ratingYellowStars!: number;
  ratingDarkStars!: number;

  ngOnInit(): void {
    const storageStatus = this.storage.getStorage()
    this.isLogged = storageStatus['userId']
    this.lessonById = undefined;
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

      this.userService.readUser$()
      .subscribe(data => {
        const lessonId: string = this.activatedRouter.snapshot.params['id'];
        if (data.subscriptions.includes(lessonId)){
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

  onReport() {
    this.router.navigate(['contacts']);
  }

}
