import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Venue} from "../../model/venue";
import {VenueService} from "../../service/venue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-venues',
  templateUrl: './my-venues.component.html',
  styleUrls: ['./my-venues.component.css']
})
export class MyVenuesComponent implements OnInit {
  public venues: Venue[];

  constructor(public authService: AuthService, private venueService: VenueService, private route: Router) {
  }

  ngOnInit(): void {
    this.authService.getUserSubject().subscribe(
      user => {
        this.venues = !!user ? user.venues : [];
      }
    )
  }
}
