import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { pipe, tap } from 'rxjs';
import { ILesson } from 'src/app/interfaces';
import { LessonsService } from '../lessons.service';
import { QuizResultsComponent } from '../quiz-results/quiz-results.component';


@Component({
    selector: 'app-take-quiz',
    templateUrl: './take-quiz.component.html',
    styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
    @ViewChild('takeQuizForm') form!: NgForm;

    lessonData: any[] | undefined;
    lessonById: ILesson | undefined;
    hasCompleted: string = '';


    constructor(
        private lessonService: LessonsService,
        private dialogRef: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        this.lessonService.getLessonById$(this.data).subscribe((data) => {
            this.lessonById = data;
            this.lessonData = data.quiz;
        });
    }

    onTakeQuizSubmit(event: Event): void {
        const quizData = this.form.value;
        const lessonId = (event.target as Element).id;
        this.lessonService.compareQuizResults$(lessonId, quizData)
            .subscribe((data) => {
                this.hasCompleted = data;
                this.dialogRef.open(QuizResultsComponent, {
                    data: {
                        hasCompleted: this.hasCompleted,
                        lessonId: this.lessonById?._id,
                    },
                });
            });
    }
}
