import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  @ViewChild('createForm') form!: NgForm;

  lessonData!: ILesson
  constructor(
    private lessonService: LessonsService
  ) { }

  ngOnInit(): void {

  }

  onCreateSubmit(): ILesson {
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
    }).subscribe(data => this.lessonData = data);
    console.log(this.lessonData);

    return this.lessonData;
  }

}
