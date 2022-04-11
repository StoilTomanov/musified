import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthHandlerService } from 'src/app/auth-handler.service';
import { UserService } from 'src/app/auth/user.service';
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
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private storage: AuthHandlerService,
  ) { }

  isLogged!: boolean;

  ngOnInit(): void {
    const storageStatus = this.storage.getStorage()
    this.isLogged = storageStatus['userId']
    this.lessonById = undefined;
    this.lessonService.getLessonById$(this.activatedRouter.snapshot.params['id'])
      .subscribe(data => this.lessonById = data);
  }

  onSubscribe(): void {
    const lessonId: string = this.activatedRouter.snapshot.params['id'];
    this.lessonService.subscribeToLesson$(lessonId)
      .subscribe(data => this.lessonById = data);
    this.router.navigate(['mylessons']);

  }

  onReport() {
    this.router.navigate(['contacts']);
  }

}
