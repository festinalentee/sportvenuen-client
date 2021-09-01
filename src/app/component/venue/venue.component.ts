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
  public isFavourite: boolean;

  constructor(public authService: AuthService, private route: ActivatedRoute, private venueService: VenueService) {
  }

  ngOnInit(): void {
    this.venue.id = +this.route.snapshot.paramMap.get('id')!;
    this.venueService.getVenue(this.venue.id).subscribe(
      venue => {
        this.venue = venue;
        this.isFavourite = !!this.authService.userValue.favourites.find(value => value.id == venue.id);
      }
    )
  }

  addToFavourites(): void {
    this.venueService.addToFavourites(this.venue.id).subscribe(
      info => {
        this.authService.userValue.favourites.push(this.venue);
        localStorage.setItem('user', JSON.stringify(this.authService.userValue))
        this.authService.getUserSubject().next(this.authService.userValue)
        this.isFavourite = true;
      }
    )
  }

  removeFromFavourites() {
    this.venueService.removeFromFavourites(this.venue.id).subscribe(
      info => {
        this.authService.userValue.favourites = this.authService.userValue.favourites.filter(value => value.id != this.venue.id);
        localStorage.setItem('user', JSON.stringify(this.authService.userValue))
        this.authService.getUserSubject().next(this.authService.userValue)
        this.isFavourite = false;
      }
    )
  }
}
