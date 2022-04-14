import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { LessonsService } from '../lessons.service';
import { ILesson } from '../../interfaces/lessons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, AfterContentInit{
  lessons: ILesson[] | undefined
  lessonId: string = '';
  isAdmin: string = sessionStorage['isAdmin'];

  constructor(
    private lessonService: LessonsService,
    private router: Router,
  ) {
  }
  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.lessons = undefined;
    this.lessonService.getAllItems$()
      .subscribe(data => this.lessons = data);
  }

  onDetails(event: Event) {
    this.lessonId = (event.target as Element).id;
    this.router.navigate(['/details/' + this.lessonId])
  }
}
