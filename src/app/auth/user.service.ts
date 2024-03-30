import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';

@Injectable()
export class UserService {

    baseUrl: string = 'http://localhost:4000/users';

    constructor(private http: HttpClient) { }

    register$(
        username: string, email: string, password: string
    ): Observable<IUser> {
        return this.http.post<IUser>(`${this.baseUrl}/register`, {
            username,
            email,
            password,
        });
    };

    login$(
        username: string, password: string
    ): Observable<IUser> {
        return this.http.post<IUser>(`${this.baseUrl}/login`, {
            username,
            password,
        });
    };

    logout$(): Observable<IUser> {
        return this.http.get<IUser>(`${this.baseUrl}/logout`, {
            headers: { 'X-Authorization': `${this.getAccessToken()}` }
        });
    };

    getAllMessages$(userId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/messages`, {
            headers: { 'X-Authorization': `${this.getAccessToken()}` }
        });
    };

    readUser$(): Observable<IUser> {
        return this.http.get<IUser>(`${this.baseUrl}/readuser`, {
            headers: { 'X-Authorization': `${this.getAccessToken()}` }
        });
    }

    updateUser$(userId: string, lessonId: string, action: string): Observable<IUser> {
        return this.http.put<IUser>(`${this.baseUrl}/` + userId, {
            "lessonId": `${lessonId}`,
            "action": `${action}`
        }, {
            headers: { 'X-Authorization': `${this.getAccessToken()}` }
        });
    }

    createMessageForAdmin$(userId: string, messageData: {}): Observable<IUser> {
        return this.http.put<IUser>(`${this.baseUrl}/messages/` + userId, {
            messageData
        }, {
            headers: { 'X-Authorization': `${this.getAccessToken()}` }
        });
    }

    deleteMessageForAdmin$(userId: string): Observable<IUser> {
        return this.http.put<IUser>(`${this.baseUrl}/deletemessages/` + userId, {

        }, {
            headers: { 'X-Authorization': `${this.getAccessToken()}` }
        });
    }

    updateUserCourses$(userId: string, lessonId: string, action: string): Observable<IUser> {
        return this.http.put<IUser>(`${this.baseUrl}/passcourse/` + userId, {
            "lessonId": `${lessonId}`,
            "action": `${action}`
        }, {
            headers: { 'X-Authorization': `${this.getAccessToken()}` }
        });
    }

    updateUserDetails$(userData: {}): Observable<IUser> {
        return this.http.put<IUser>(`${this.baseUrl}/updateuser`, {
            userData
        }, {
            headers: { 'X-Authorization': `${this.getAccessToken()}` }
        });
    }

    private getAccessToken(): string {
        return sessionStorage['accessToken'];
    }
}



