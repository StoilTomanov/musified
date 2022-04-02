import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILesson } from '../interfaces';

@Injectable()
export class LessonsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllItems(): Observable<ILesson[]> {
    // TODO: implement login and registration
    return this.http.get<ILesson[]>('http://localhost:4000/api/records')
  }

}
