import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../../lessons.service';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css']
})
export class VideoPreviewComponent implements OnInit {
  lessonById: ILesson | undefined;

  constructor(
    private lessonService: LessonsService,
    private activatedRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.lessonService.getLessonById$(this.activatedRouter.snapshot.params['id'])
      .subscribe(data => this.lessonById = data);
  }

}
