import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';

@Component({
    selector: 'app-admin-courses',
    templateUrl: './admin-courses.component.html',
    styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {
    lessons: ILesson[] | undefined
    lessonId: string | undefined;
    isAdmin: string | undefined;;

    constructor(
        private lessonService: LessonsService,
        private router: Router,
    ) {
    }
    ngOnInit(): void {
        this.isAdmin = sessionStorage['isAdmin']
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
