import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {VenueService} from "../../service/venue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Venue} from "../../model/venue";
import {OpeningDetailsService} from "../../service/opening-details.service";

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {

  addVenueForm: FormGroup;
  loading = false;
  error = '';
  editMode = false;
  venueId: number;
  venue: Venue = new Venue();
  details: any[] = [{
    dateFrom: '',
    dateTo: '',
    mondayFrom: '',
    mondayTo: '',
    tuesdayFrom: '',
    tuesdayTo: '',
    wednesdayFrom: '',
    wednesdayTo: '',
    thursdayFrom: '',
    thursdayTo: '',
    fridayFrom: '',
    fridayTo: '',
    saturdayFrom: '',
    saturdayTo: '',
    sundayFrom: '',
    sundayTo: '',
    mondayPrice: '',
    tuesdayPrice: '',
    wednesdayPrice: '',
    thursdayPrice: '',
    fridayPrice: '',
    saturdayPrice: '',
    sundayPrice: ''
  }];

  constructor(
    private formBuilder: FormBuilder,
    private venueService: VenueService,
    private openingDetailsService: OpeningDetailsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  get addVenueFormControls() {
    return this.addVenueForm.controls;
  }

  get venueType() {
    return this.addVenueFormControls.venueType;
  }

  get venueName() {
    return this.addVenueFormControls.venueName;
  }

  get streetName() {
    return this.addVenueFormControls.streetName;
  }

  get streetNumber() {
    return this.addVenueFormControls.streetNumber;
  }

  get city() {
    return this.addVenueFormControls.city;
  }

  get postcode() {
    return this.addVenueFormControls.postcode;
  }

  get country() {
    return this.addVenueFormControls.country;
  }

  get description() {
    return this.addVenueFormControls.description;
  }

  addOpeningDetails() {
    this.details.push({
      dateFrom: '',
      dateTo: '',
      mondayFrom: '',
      mondayTo: '',
      tuesdayFrom: '',
      tuesdayTo: '',
      wednesdayFrom: '',
      wednesdayTo: '',
      thursdayFrom: '',
      thursdayTo: '',
      fridayFrom: '',
      fridayTo: '',
      saturdayFrom: '',
      saturdayTo: '',
      sundayFrom: '',
      sundayTo: '',
      mondayPrice: '',
      tuesdayPrice: '',
      wednesdayPrice: '',
      thursdayPrice: '',
      fridayPrice: '',
      saturdayPrice: '',
      sundayPrice: ''
    });
  }

  removeOpeningDetails(i: number) {
    this.details.splice(i, 1);
  }

  ngOnInit(): void {
    this.venueId = this.route.snapshot.params.id;
    this.editMode = !!this.venueId;
    this.addVenueForm = this.formBuilder.group({
      venueType: ['', Validators.required],
      venueName: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (this.editMode) {
      this.venueService.getVenue(this.venueId).subscribe(
        venue => {
          this.venue = venue;
          this.addVenueForm = this.formBuilder.group({
            venueType: [this.venue.venueType, Validators.required],
            venueName: [this.venue.venueName, Validators.required],
            streetName: [this.venue.streetName, Validators.required],
            streetNumber: [this.venue.streetNumber, Validators.required],
            city: [this.venue.city, Validators.required],
            postcode: [this.venue.postcode, Validators.required],
            country: [this.venue.country, Validators.required],
            description: [this.venue.description, Validators.required],
          });
        }
      )
    }
  }

  onSubmit() {
    if (this.addVenueForm.invalid) {
      return;
    }
    this.loading = true;
    if (!this.editMode) {
      this.venueService.saveVenue(this.addVenueForm.value)
        .subscribe({
          next: venue => {
            this.venueService.addVenueToUser(this.authService.userValue.id, venue.id).subscribe(
              user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.authService.getUserSubject().next(user);
              }
            );
            let csvString = this.details.map(o => Object.values(o).join(";")).join("\n");
            this.openingDetailsService.saveOpeningDetails(venue.id, csvString).subscribe();
            this.loading = false;
            this.router.navigateByUrl('/my-venues')
          },
          error: error => {
            this.error = error;
            this.loading = false;
          }
        });
    } else {
      this.venueService.updateVenue(this.addVenueForm.value, this.venueId)
        .subscribe({
          next: venue => {
            let updateItem = this.authService.userValue.venues.find(value => value.id == venue.id);
            let index = this.authService.userValue.venues.indexOf(updateItem!);
            this.authService.userValue.venues[index] = venue;
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
}
