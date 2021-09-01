import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {VenueService} from "../../service/venue.service";
import {Venue} from "../../model/venue";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  public favouriteVenues: Venue[];

  constructor(public authService: AuthService, public venueService: VenueService) {
  }

  ngOnInit(): void {
    this.authService.getUserSubject().subscribe(
      user => {
        this.favouriteVenues = !!user ? user.favourites : [];
      }
    )
  }

  removeFromFavourites(venueId: number) {
    this.venueService.removeFromFavourites(venueId).subscribe(
      info => {
        this.authService.userValue.favourites = this.authService.userValue.favourites.filter(value => value.id != venueId);
        localStorage.setItem('user', JSON.stringify(this.authService.userValue))
        this.authService.getUserSubject().next(this.authService.userValue)
      }
    )
  }
}
