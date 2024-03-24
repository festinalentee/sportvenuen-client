import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Venue} from "../model/venue";
import {AuthService} from "./auth.service";
import {Booking} from "../model/booking";

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  saveVenue(venue: Venue) {
    return this.http.post<Venue>(`${environment.apiUrl}/venue`, venue);
  }

  getVenue(id: number) {
    return this.http.get<Venue>(`${environment.apiUrl}/venue/${id}`);
  }

  updateVenue(venue: Venue, venueId: number) {
    venue.id = venueId;
    return this.http.put<Venue>(`${environment.apiUrl}/venue`, venue);
  }

  bookVenue(booking: Booking) {
    return this.http.post<Booking>(`${environment.apiUrl}/venue/booking`, booking);
  }

  addToFavourites(venueId: number) {
    let userId = this.authService.userValue.id;
    return this.http.post<any>(`${environment.apiUrl}/favourites/${userId}/${venueId}`, null);
  }

  removeFromFavourites(venueId: number) {
    let userId = this.authService.userValue.id;
    return this.http.put<any>(`${environment.apiUrl}/favourites/${userId}/${venueId}`, null);
  }

  searchVenues(venueType: string, city: string) {
    return this.http.get<Venue[]>(`${environment.apiUrl}/venue/search?venueType=${venueType}&city=${city}`)
  }
}
