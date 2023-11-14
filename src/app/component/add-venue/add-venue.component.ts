import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {VenueService} from "../../service/venue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Venue} from "../../model/venue";

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {

  addVenueForm: FormGroup;
  openingHoursArray: FormArray;
  loading = false;
  error = '';
  editMode = false;
  venueId: number;
  venue: Venue = new Venue();
  daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
  constructor(
    private formBuilder: FormBuilder,
    private venueService: VenueService,
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
      description: ['', Validators.required],
      openingHours: this.formBuilder.array([])
    });

    this.openingHoursArray = this.addVenueForm.get('openingHours') as FormArray;

    this.daysOfWeek.forEach((day) => {
      this.openingHoursArray.push(this.formBuilder.group({
        dayOfWeek: [day],
        openFrom: ['', Validators.required],
        openTo: ['', Validators.required],
        price: ['', Validators.required],
      }));
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
            openingHours: this.formBuilder.array([])
          });

          const loadedOpeningHoursArray = this.addVenueForm.get('openingHours') as FormArray;
          this.venue.openingHours.forEach((hours) => {
            loadedOpeningHoursArray.push(this.formBuilder.group({
              dayOfWeek: [hours.dayOfWeek, Validators.required],
              openFrom: [hours.openFrom, Validators.required],
              openTo: [hours.openTo, Validators.required],
              price: [hours.price, Validators.required],
            }));
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
      const venueData = {
        ...this.addVenueForm.value,
        openingHours: this.addVenueForm.value.openingHours.map((hours: any) => ({ ...hours })),
      };
      this.venueService.saveVenue(venueData)
        .subscribe({
          next: venue => {
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
