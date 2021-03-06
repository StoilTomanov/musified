import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILesson } from '../interfaces';

@Injectable()
export class LessonsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllItems$(): Observable<ILesson[]> {
    return this.http.get<ILesson[]>('http://localhost:4000/api/records');
  }

  public getMyLessons$(): Observable<ILesson[]> {
    return this.http.get<ILesson[]>('http://localhost:4000/api/records/mylessons');
  }

  public createCourse$(lessonData: {}): Observable<ILesson> {
    return this.http.post<ILesson>('http://localhost:4000/api/records', lessonData);
  }

  public editCourse$(lessonId: string, lessonData: {}): Observable<ILesson> {
    return this.http.put<ILesson>('http://localhost:4000/api/records/' + lessonId, lessonData);
  }

  public deleteCourse$(lessonId: string): Observable<ILesson> {
    return this.http.delete<ILesson>('http://localhost:4000/api/records/' + lessonId);
  }

  public getLessonById$(id: string): Observable<ILesson> {
    return this.http.get<ILesson>('http://localhost:4000/api/records/' + id);
  }

  public compareQuizResults$(lessonId: string, quizData: {}): Observable<string> {
    return this.http.put<string>('http://localhost:4000/api/records/comparequisresults/' + lessonId, {
      quizData
    });
  }

  public subscribeToLesson$(id: string): Observable<ILesson> {
    return this.http.put<ILesson>('http://localhost:4000/api/records/subscribe/' + id, {});
  }

  public submitQuiz$(lessonId: string, quizData: {}): Observable<ILesson> {
    return this.http.put<ILesson>('http://localhost:4000/api/records/submitquiz/' + lessonId, {
      quizData
    });
  }

  public unsubscribeToLesson$(id: string): Observable<ILesson> {
    return this.http.put<ILesson>('http://localhost:4000/api/records/unsubscribe/' + id, {});
  }

  public updateProgress$(lessonId: string, ratingScore: number): Observable<ILesson> {
    return this.http.put<ILesson>('http://localhost:4000/api/records/updateprogress/' + lessonId, {
      'rating': `${ratingScore}`,
      'action': 'ratingUpdate'
    }).pipe(map(data => data));
  }

  public updateViewsScore$(lessonId: string): Observable<ILesson> {
    return this.http.put<ILesson>('http://localhost:4000/api/records/updateviewsscore/' + lessonId, {});
  }

}
