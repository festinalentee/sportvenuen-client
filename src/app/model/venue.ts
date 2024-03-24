import {OpenHours} from "./open-hours";
import {Booking} from "./booking";

export class Venue {
  id: number;
  venueType: string;
  venueName: string;
  streetName: string;
  streetNumber: string;
  city: string;
  postcode: string;
  country: string;
  openingHours: OpenHours[] = [];
  description: string;
  bookings: Booking[];
}
