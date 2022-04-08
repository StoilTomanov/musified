import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILesson } from '../interfaces';

@Injectable()
export class LessonsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllItems$(): Observable<ILesson[]> {
    return this.http.get<ILesson[]>('http://localhost:4000/api/records');
  }

  public getLessonById$(id: string): Observable<ILesson> {
    return this.http.get<ILesson>('http://localhost:4000/api/records/' + id);
  }

  public subscribeToLesson$(id: string): Observable<ILesson> {
    return this.http.put<ILesson>('http://localhost:4000/api/records/subscribe/' + id, {});
    // TODO pass the userId in the one of the interceptors
  }

}
