import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { User } from '../models/user';
import { ThisReceiver } from '@angular/compiler';
//import { config } from '../';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser1: Observable<User>;
    private currentUser: User;
  private userId: string;
  private categories: string[];
  private userIdSet = new Subject<string>();

  userIdSetAnnounced$ = this.userIdSet.asObservable();

  announceUserIdCreated(message: string) {
    this.userIdSet.next(message);
  }

  setUser(data: User) {
    this.currentUser = data;
  }

  getUser(): User {
    return this.currentUser;
  }

  setUserId(key: string) {
    this.userId = key;
  }

  getUserId(): string {
    return this.userId;
  }

  setCategories(originalCategories: string[]) {
    this.categories = originalCategories;
  }

  getCurrentCategories(): string[] {
    return this.categories;
  }

    user: User = new User();


    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser1 = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        console.log("userName " + username);
        this.user.userName = username;
        this.user.password = password;
        return this.http.post<any>('http://localhost:8080/api/v1/users/authenticate', this.user)
            .pipe(map(data => 
                {
                    if(data[0] != null) {
                        this.setUser(data[0]);
                        localStorage.setItem('currentUser', JSON.stringify(data[0]));
                        console.log('currentUserId ' + data[0].id);
                        localStorage.setItem('currentUserId', data[0].id);
                       
                        this.currentUserSubject.next(data[0]);
                        return data;
                    }
                    else {

                    }
                
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
