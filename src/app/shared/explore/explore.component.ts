import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../lessons.service';
import { ILesson } from '../../interfaces/lessons';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  lessons: ILesson[] | undefined

  constructor(
    private lessonService: LessonsService
  ) {
  }

  ngOnInit(): void {
    this.lessons = undefined;
    this.lessonService.getAllItems()
      .subscribe(data => this.lessons = data);
    console.log(this.lessons);

  }

}
