import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }


  register$(
    username: string, email: string, password: string
  ): Observable<IUser> {
    // TODO: consider doing additional check for empty fields
    return this.http.post<IUser>('http://localhost:4000/users/register', {
      username,
      email,
      password,
    })
  };

  login$(
    username: string, password: string
  ): Observable<IUser> {
    // TODO: consider doing additional check for empty fields
    return this.http.post<IUser>('http://localhost:4000/users/login', {
      username,
      password,
    })
  };

  logout$(): Observable<IUser> {
    // TODO: consider doing additional check for empty fields
    return this.http.get<IUser>('http://localhost:4000/users/logout', {
      headers: {
        'X-Authorization': sessionStorage['accessToken']
      }
    })
  };

  readUser$(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:4000/users/readuser', {
      headers: {
        'X-Authorization': sessionStorage['accessToken']
      }
    })
  }
}



