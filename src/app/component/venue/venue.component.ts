import {Component, OnInit} from '@angular/core';
import {Venue} from "../../model/venue";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VenueService} from "../../service/venue.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  public venue: Venue = new Venue();
  public isFavourite: boolean;
  public bookVenueForm: FormGroup;
  public loading: boolean = false;
  error = '';

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.venue.id = +this.route.snapshot.paramMap.get('id')!;
    this.venueService.getVenue(this.venue.id).subscribe(
      venue => {
        this.venue = venue;
        this.isFavourite = !!this.authService.userValue.favourites.find(value => value.id == venue.id);
      });
      this.bookVenueForm = this.formBuilder.group({
          date: ['', Validators.required],
          timeFrom: ['8', Validators.required],
          timeTo: ['10', Validators.required],
      });
  }

  onSubmit() {
    if (this.bookVenueForm.invalid) {
      return;
    }
    else {
      this.loading = true

      this.venueService.bookVenue({ ...this.bookVenueForm.value, venueId: this.venue.id})
        .subscribe({
          next: booking => {
              const user = this.authService.getUserSubject().getValue();
              user.bookings.push(booking)
              localStorage.setItem('user', JSON.stringify(user));
              this.authService.getUserSubject().next(user);
              this.venue.bookings.push(booking);
            this.loading = false;
            this.router.navigateByUrl('/my-bookings')
          },
          error: error => {
            this.error = error;
            this.loading = false;
          }
        });
  }
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
