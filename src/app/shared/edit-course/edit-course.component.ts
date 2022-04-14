import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  @ViewChild('editForm') form!: NgForm;
  currentLesson!: ILesson;

  constructor(
    private lessonService: LessonsService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const lessonId = this.activatedRouter.snapshot.params['id'];
    this.lessonService.getLessonById$(lessonId)
      .subscribe(data => this.currentLesson = data);
    setTimeout(() => {
      this.form.form.patchValue({
        name: this.currentLesson.name,
        description: this.currentLesson.description,
        theory: this.currentLesson.theory,
        duration: this.currentLesson.duration,
        level: this.currentLesson.level,
        videoUrl: this.currentLesson.videoUrl,
        imagePreviewUrl: this.currentLesson.imagePreviewUrl,
      })
    }, 300);
  }

  onEditSubmit(): void {
    const formData = this.form.value;
    const lessonId = this.activatedRouter.snapshot.params['id'];

    const result = this.lessonService.editCourse$(lessonId, {
      name: formData.name,
      description: formData.description,
      theory: formData.theory,
      duration: formData.duration,
      level: formData.level,
      videoUrl: formData.videoUrl,
      imagePreviewUrl: formData.imagePreviewUrl,
      views: `${this.currentLesson.views}`,
      createdOn: `${this.currentLesson.createdOn}`,
    }).subscribe();

    this.router.navigate(['/details/' + lessonId]);
  }

}
