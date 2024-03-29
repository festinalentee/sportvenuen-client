import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user`);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${environment.apiUrl}/user`, user);
  }
}
