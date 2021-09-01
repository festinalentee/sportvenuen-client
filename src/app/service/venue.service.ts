import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Venue} from "../model/venue";
import {AuthService} from "./auth.service";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  saveVenue(venue: Venue) {
    return this.http.post<Venue>(`${environment.apiUrl}/venue`, venue);
  }

  addVenueToUser(userId: number, venueId: number) {
    return this.http.post<any>(`${environment.apiUrl}/venue/add-to-user`, {userId: userId, venueId: venueId});
  }

  getVenue(id: number) {
    return this.http.get<Venue>(`${environment.apiUrl}/venue/${id}`);
  }

  updateVenue(venue: Venue, venueId: number) {
    venue.id = venueId;
    return this.http.put<Venue>(`${environment.apiUrl}/venue`, venue);
  }
}
