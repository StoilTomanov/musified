import { AfterContentInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-my-lessons',
  templateUrl: './my-lessons.component.html',
  styleUrls: ['./my-lessons.component.css']
})
export class MyLessonsComponent implements OnInit, AfterContentInit {
  lessons: ILesson[] | undefined
  lessonId: string = '';
  hasGiveIn: boolean = false; // to be false

  constructor(
    private lessonService: LessonsService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.lessons = undefined;
    this.lessonService.getMyLessons$()
      .subscribe(data => this.lessons = data);
  }

  onWatch(event: Event) {
    this.lessonId = (event.target as Element).id;
    this.router.navigate(['watch/' + this.lessonId]);
  }

  onDetails(event: Event): void {
    this.lessonId = (event.target as Element).id;
    this.router.navigate(['details/' + this.lessonId]);
  }

  onGiveUp(event: Event): void {
    this.hasGiveIn = true;
  }

  onConfirm(event: Event): void {
    if ((event.target as Element).classList[0] == 'confirm-no') {
      this.hasGiveIn = false;
    } else if ((event.target as Element).classList[0] == 'confirm-yes') {
      const lessonId: string = (event.target as Element).id;
      this.userService.updateUser$(`${sessionStorage['userId']}`, lessonId, 'unsubscribe')
        .subscribe();
      this.lessonService.unsubscribeToLesson$(lessonId)
        .subscribe();
      this.hasGiveIn = false;
      this.router.navigate(['details/' + lessonId]);
    }
  }

}
