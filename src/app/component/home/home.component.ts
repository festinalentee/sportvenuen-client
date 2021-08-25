import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit() {

  }
}
