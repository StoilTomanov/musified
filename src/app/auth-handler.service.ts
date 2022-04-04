import { Injectable } from '@angular/core';
import { IUser } from './interfaces';

@Injectable()
export class AuthHandlerService {

  constructor() { }

  public setStorage(data: IUser): void {
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('accessToken', data.accessToken);
  }

  public getStorage(data: IUser): Storage {
    return sessionStorage;
  }

  public removeStorage(): void {
    sessionStorage.clear();
  }


}
