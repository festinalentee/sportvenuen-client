import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Venue} from "../../model/venue";

@Component({
  selector: 'app-my-venues',
  templateUrl: './my-venues.component.html',
  styleUrls: ['./my-venues.component.css']
})
export class MyVenuesComponent implements OnInit {
  public venues: Venue[];

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserSubject().subscribe(
      user => {
        this.venues = !!user ? user.venues : [];
      }
    )
  }
}
