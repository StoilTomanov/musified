import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LessonsService } from '../lessons.service';

@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent {
    @ViewChild('createQuizForm') form!: NgForm;

    constructor(
        private lessonService: LessonsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    onCreateQuizSubmit(event: Event): void {
        const quizData = this.form.value;
        const lessonId: string = (event.target as Element).id;

        this.lessonService.submitQuiz$(lessonId, quizData).subscribe();
    }
}
