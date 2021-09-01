import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VenueService} from "../../service/venue.service";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

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
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  get searchVenuesFormControls() {
    return this.searchVenuesForm.controls;
  }

  ngOnInit(): void {
    this.searchVenuesForm = this.formBuilder.group({
      venueType: ['', Validators.required],
      city: ['', Validators.required],
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
