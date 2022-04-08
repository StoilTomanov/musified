import { Component, OnInit } from '@angular/core';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-my-lessons',
  templateUrl: './my-lessons.component.html',
  styleUrls: ['./my-lessons.component.css']
})
export class MyLessonsComponent implements OnInit {
  lessons: ILesson[] | undefined
  constructor(
    private lessonService: LessonsService
  ) { }

  ngOnInit(): void {
    this.lessons = undefined;
    this.lessonService.getAllItems$()
      .subscribe(data => this.lessons = data);
  }

}
