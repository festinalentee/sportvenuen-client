import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Role} from "../model/role";
import {UserDetails} from "../model/user-details";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.userValue;
  }

  isAdmin(): boolean {
    return this.userValue && this.userValue.role === Role.ROLE_ADMIN;
  }

  login(email: string, password: string) {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post<any>(`${environment.apiUrl}/login`, body.toString(), {headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null!);
    this.router.navigate(['/login']);
  }

  register(user: User, userDetails: UserDetails) {
    return this.http.post(`${environment.apiUrl}/user/save`, JSON.stringify({user, userDetails}), {headers: new HttpHeaders()
        .set('Content-Type', 'application/json')});
  }
}
