import { AfterContentInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-my-lessons',
  templateUrl: './my-lessons.component.html',
  styleUrls: ['./my-lessons.component.css']
})
export class MyLessonsComponent implements OnInit, AfterContentInit {
  lessons: ILesson[] | undefined
  lessonId: string = '';
  lessonById!: ILesson;
  hasGiveIn: boolean = false; // to be false
  noContainers = false;

  constructor(
    private lessonService: LessonsService,
    private router: Router,
    private dialogRef: MatDialog,
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
    this.dialogRef.open(DialogComponent, {
      data: {
        _id: this.lessonId = (event.target as Element).id,
      }
    });
  }

}
