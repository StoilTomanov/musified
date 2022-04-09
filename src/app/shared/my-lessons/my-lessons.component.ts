import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-my-lessons',
  templateUrl: './my-lessons.component.html',
  styleUrls: ['./my-lessons.component.css']
})
export class MyLessonsComponent implements OnInit {
  lessons: ILesson[] | undefined
  lessonId: string = '';

  constructor(
    private lessonService: LessonsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.lessons = undefined;
    this.lessonService.getAllItems$()
      .subscribe(data => this.lessons = data);
  }

  onWatch(event: Event) {
    this.lessonId = (event.target as Element).id;
    this.router.navigate(['watch/' + this.lessonId]);
  }

}
