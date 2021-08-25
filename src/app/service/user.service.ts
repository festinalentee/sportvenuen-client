import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {User} from "../model/user";
import {map} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {UserDetails} from "../model/user-details";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  getUserDetailsById(id: number) {
    return this.http.get<UserDetails>(`${environment.apiUrl}/user/details/${id}`);
  }

  updateUser(id: any, params: any) {
    return this.http.put(`${environment.apiUrl}/user/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.authService.userValue.id) {
          // update local storage
          const user = { ...this.authService.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));
          // publish updated user to subscribers
          this.authService.userSubject.next(user);
        }
        return x;
      }));
  }
}
