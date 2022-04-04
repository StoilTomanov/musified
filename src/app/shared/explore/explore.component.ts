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
// TODO: 04.04.2022 - the Details button is worling only if its clicked in the link (a tag).. make it work for the whole butotn
  ngOnInit(): void {
    this.lessons = undefined;
    this.lessonService.getAllItems()
      .subscribe(data => this.lessons = data);
  }

}
