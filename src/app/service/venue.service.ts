import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Venue} from "../model/venue";

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private http: HttpClient) {
  }

  saveVenue(venue: Venue) {
    return this.http.post<Venue>(`${environment.apiUrl}/venue`, venue);
  }

  addVenueToUser(userId: number, venueId: number) {
    console.log(userId, venueId);
    return this.http.post<any>(`${environment.apiUrl}/venue/add-to-user`, {userId: userId, venueId: venueId});
  }
}
