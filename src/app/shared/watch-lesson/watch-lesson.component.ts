import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.lessonById = undefined;
    this.lessonService.getLessonById$(this.activatedRouter.snapshot.params['id'])
      .subscribe(data => this.lessonById = data);
  }

}
