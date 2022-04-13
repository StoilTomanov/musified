import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private lessonService: LessonsService,
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

}
