import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Token} from "../model/token";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<Token>;
  private readonly userSubject: BehaviorSubject<User>;

  constructor(private router: Router, private http: HttpClient, private userService: UserService) {
    this.tokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('token')!));
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
  }

  public get tokenValue(): Token {
    return this.tokenSubject.value;
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public getUserSubject(): BehaviorSubject<User> {
    return this.userSubject;
  }

  isLoggedIn(): boolean {
    return !!this.tokenValue;
  }

  isUserAvailable(): boolean {
    return !!this.userSubject.value;
  }

  login(email: string, password: string) {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post<Token>(`${environment.apiUrl}/login`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .pipe(map(token => {
        localStorage.setItem('token', JSON.stringify(token));
        this.tokenSubject.next(token);
        this.userService.getUser().subscribe((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        });
        return token;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null!);
    localStorage.removeItem('token');
    this.tokenSubject.next(null!);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/user/save`, user);
  }
}
