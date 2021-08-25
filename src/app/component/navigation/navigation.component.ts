import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {UserDetails} from "../../model/user-details";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  userDetails: UserDetails;

  constructor(public authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userService.getUserDetailsById(this.authService.userValue.id).subscribe({
        next: data => {
          this.userDetails = data;
        }
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
