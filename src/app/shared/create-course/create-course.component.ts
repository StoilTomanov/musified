import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LessonsService } from '../lessons.service';

@Component({
    selector: 'app-create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
    @ViewChild('createForm') form!: NgForm;

    constructor(
        private lessonService: LessonsService,
        private router: Router,
    ) { }

    onCreateSubmit(): void {
        const formData = this.form.value;
        const newDate = new Date();

        this.lessonService.createCourse$({
            name: formData.name,
            description: formData.description,
            theory: formData.theory,
            duration: formData.duration,
            level: formData.level,
            videoUrl: formData.videoUrl,
            imagePreviewUrl: formData.imagePreviewUrl,
            createdOn: `${newDate.getDate()}.${Number(newDate.getMonth()) + 1}.${newDate.getFullYear()}`,
            owner: sessionStorage['userId']
        }).subscribe(() => this.router.navigate(['/explore']));
    }

}
