import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILesson } from '../interfaces';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllItems(): Observable<ILesson[]> {
    // TODO: implement login and registration
    return this.httpClient.get<ILesson[]>('http://localhost:4000/api/records')
  }

}
