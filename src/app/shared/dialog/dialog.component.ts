import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  hasGiveIn: boolean = false; // to be false
  lessonById!: ILesson;
  noContainers: boolean = false;

  constructor(
    private lessonService: LessonsService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onConfirm(event: Event): void {
    if ((event.target as Element).classList[0] == 'confirm-yes-dialog') {
      const lessonId: string = (event.target as Element).id;
      this.userService.updateUser$(`${sessionStorage['userId']}`, lessonId, 'unsubscribe')
        .subscribe();
      this.lessonService.unsubscribeToLesson$(lessonId)
        .subscribe();

      const currentCourse = document.getElementById(lessonId);
      currentCourse?.parentElement?.removeChild(currentCourse);

    }
  }

}
