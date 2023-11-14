import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {VenueService} from "../../service/venue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchVenuesForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private venueService: VenueService,
    private router: Router,
  ) {
  }

  get searchVenuesFormControls() {
    return this.searchVenuesForm.controls;
  }

  ngOnInit(): void {
    this.searchVenuesForm = this.formBuilder.group({
      venueType: [''],
      city: [''],
    });
  }

  onSubmit() {
    if (this.searchVenuesForm.invalid) {
      return;
    }
    this.loading = true;
    this.venueService.searchVenues(this.searchVenuesFormControls.venueType.value, this.searchVenuesFormControls.city.value)
      .subscribe({
        next: venues => {
          this.loading = false;
          localStorage.setItem('search-results', JSON.stringify(venues));
          this.router.navigateByUrl('/search-results')
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
