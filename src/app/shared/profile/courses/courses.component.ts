import { Component, OnInit } from '@angular/core';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../../lessons.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  lessonsData: ILesson[] = []
  currentProgress: number = 0;

  constructor(
    private lessonService: LessonsService
  ) { }

  ngOnInit(): void {
    // TODO: consider removing 'progress' property from the schema. perhaps using 'populate' in the user.subscriptions ??
    this.lessonService.getMyLessons$()
      .subscribe(data => {
        this.lessonsData = data;
        this.lessonsData.map(lesson => this.currentProgress += lesson.progress)
        this.currentProgress = this.currentProgress / this.lessonsData.length;
      });
  }
}
