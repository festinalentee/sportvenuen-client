import {Component, OnInit} from '@angular/core';
import {Venue} from "../../model/venue";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute} from "@angular/router";
import {VenueService} from "../../service/venue.service";
import {OpeningDetailsService} from "../../service/opening-details.service";
import {OpeningDetails} from "../../model/opening-details";

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  public venue: Venue = new Venue();
  public openingDetails: OpeningDetails = new OpeningDetails();
  public isFavourite: boolean;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private venueService: VenueService,
    private openingDetailsService: OpeningDetailsService) {
  }

  ngOnInit(): void {
    this.venue.id = +this.route.snapshot.paramMap.get('id')!;
    this.venueService.getVenue(this.venue.id).subscribe(
      venue => {
        this.venue = venue;
        this.isFavourite = !!this.authService.userValue.favourites.find(value => value.id == venue.id);
        this.openingDetailsService.getOpeningDetails(this.venue.id).subscribe(
          openingDetails => {
            this.openingDetails = openingDetails;
          }
        );
      }
    )
  }

  addToFavourites(): void {
    this.venueService.addToFavourites(this.venue.id).subscribe(
      () => {
        this.authService.userValue.favourites.push(this.venue);
        localStorage.setItem('user', JSON.stringify(this.authService.userValue))
        this.authService.getUserSubject().next(this.authService.userValue)
        this.isFavourite = true;
      }
    )
  }

  removeFromFavourites() {
    this.venueService.removeFromFavourites(this.venue.id).subscribe(
      () => {
        this.authService.userValue.favourites = this.authService.userValue.favourites.filter(value => value.id != this.venue.id);
        localStorage.setItem('user', JSON.stringify(this.authService.userValue))
        this.authService.getUserSubject().next(this.authService.userValue)
        this.isFavourite = false;
      }
    )
  }
}
