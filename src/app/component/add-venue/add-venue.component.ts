import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {VenueService} from "../../service/venue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {

  addVenueForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private venueService: VenueService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.addVenueForm = this.formBuilder.group({
      venueType: ['', Validators.required],
      venueName: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addVenueForm.invalid) {
      return;
    }
    this.loading = true;
    this.venueService.saveVenue(this.addVenueForm.value)
      .subscribe({
        next: venue => {
          console.log(venue)
          this.venueService.addVenueToUser(this.authService.userValue.id, venue.id).subscribe(
            user => {
              localStorage.setItem('user', JSON.stringify(user));
              this.authService.getUserSubject().next(user);
            }
          );
          this.loading = false;
          this.router.navigateByUrl('/my-venues')
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}