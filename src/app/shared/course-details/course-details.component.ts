import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  lessonById: ILesson | undefined;
  
  constructor(
    private lessonService: LessonsService,
    private router: ActivatedRoute,
    ) { }
    
  ngOnInit(): void {
    this.lessonById = undefined;
    this.lessonService.getLessonById$(this.router.snapshot.params['id'])
      .subscribe(data => this.lessonById = data);
  }

  onSubscribe(): void{
    console.log(this.lessonById);
    // TODO: finish the subscription
  }

}
