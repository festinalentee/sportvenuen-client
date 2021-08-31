import {Component, OnInit} from '@angular/core';
import {Venue} from "../../model/venue";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute} from "@angular/router";
import {VenueService} from "../../service/venue.service";

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  public venue: Venue = new Venue();

  constructor(public authService: AuthService, private route: ActivatedRoute, private venueService: VenueService) {
  }

  ngOnInit(): void {
    this.venue.id = +this.route.snapshot.paramMap.get('id')!;
    this.venueService.getVenue(this.venue.id).subscribe(
      venue => {
        this.venue = venue;
      }
    )
  }
}
