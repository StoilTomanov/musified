import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-watch-lesson',
  templateUrl: './watch-lesson.component.html',
  styleUrls: ['./watch-lesson.component.css']
})
export class WatchLessonComponent implements OnInit {
  lessonById: ILesson | undefined;
  constructor(
    private lessonService: LessonsService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) { }

  hasGiveIn: boolean = false;

  ngOnInit(): void {
    this.lessonById = undefined;
    this.lessonService.getLessonById$(this.activatedRouter.snapshot.params['id'])
      .subscribe(data => this.lessonById = data);
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


  onReport() {
    this.router.navigate(['contacts']);
  }

}
