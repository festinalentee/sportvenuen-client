import {Role} from "./role";
import {Venue} from "./venue";
import {Booking} from "./booking";

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  roles: Role[];
  venues: Venue[];
  favourites: Venue[];
  bookings: Booking[];
}
