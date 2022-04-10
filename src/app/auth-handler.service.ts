import { Injectable } from '@angular/core';
import { IUser } from './interfaces';

@Injectable()
export class AuthHandlerService {

  constructor() { }

  public setStorage(data: IUser): void {
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('isAdmin', data.isAdmin);
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);
  }

  public getStorage(): Storage {
    return sessionStorage;
  }

  public removeStorage(): void {
    sessionStorage.clear();
  }


}
