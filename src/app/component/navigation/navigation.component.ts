import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  user: User;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserSubject().subscribe({
      next: data => {
        this.user = data;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
