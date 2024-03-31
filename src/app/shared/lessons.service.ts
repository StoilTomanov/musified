import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILesson } from '../interfaces';

@Injectable()
export class LessonsService {
    baseUrl: string = 'http://localhost:4000/api';
    constructor(
        private http: HttpClient
    ) { }

    public getAllItems$(): Observable<ILesson[]> {
        return this.http.get<ILesson[]>('${this.baseUrl}/records');
    }

    public getMyLessons$(): Observable<ILesson[]> {
        return this.http.get<ILesson[]>(`${this.baseUrl}/records/mylessons`);
    }

    public createCourse$(lessonData: {}): Observable<ILesson> {
        return this.http.post<ILesson>(`${this.baseUrl}/records`, lessonData);
    }

    public editCourse$(lessonId: string, lessonData: {}): Observable<ILesson> {
        return this.http.put<ILesson>(`${this.baseUrl}/records/` + lessonId, lessonData);
    }

    public deleteCourse$(lessonId: string): Observable<ILesson> {
        return this.http.delete<ILesson>(`${this.baseUrl}/records/` + lessonId);
    }

    public getLessonById$(id: string): Observable<ILesson> {
        return this.http.get<ILesson>(`${this.baseUrl}/records/` + id);
    }

    public compareQuizResults$(lessonId: string, quizData: {}): Observable<string> {
        return this.http.put<string>(`${this.baseUrl}/records/comparequisresults/` + lessonId, {
            quizData
        });
    }

    public subscribeToLesson$(id: string): Observable<ILesson> {
        return this.http.put<ILesson>(`${this.baseUrl}/records/subscribe/` + id, {});
    }

    public submitQuiz$(lessonId: string, quizData: {}): Observable<ILesson> {
        return this.http.put<ILesson>(`${this.baseUrl}/records/submitquiz/` + lessonId, {
            quizData
        });
    }

    public unsubscribeToLesson$(id: string): Observable<ILesson> {
        return this.http.put<ILesson>(`${this.baseUrl}/records/unsubscribe/` + id, {});
    }

    public updateProgress$(lessonId: string, ratingScore: number): Observable<ILesson> {
        return this.http.put<ILesson>(`${this.baseUrl}/records/updateprogress/` + lessonId, {
            'rating': `${ratingScore}`,
            'action': 'ratingUpdate'
        }).pipe(map(data => data));
    }

    public updateViewsScore$(lessonId: string): Observable<ILesson> {
        return this.http.put<ILesson>(`${this.baseUrl}/records/updateviewsscore/` + lessonId, {});
    }

}
