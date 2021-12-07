import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Venue} from "../model/venue";
import {environment} from "../../environments/environment";
import {OpeningDetails} from "../model/opening-details";

@Injectable({
  providedIn: 'root'
})
export class OpeningDetailsService {

  constructor(private http: HttpClient) {
  }

  saveOpeningDetails(venueId: number, text: string) {
    let params: HttpParams = new HttpParams();
    params = params.append('text', text);
    return this.http.post<Venue>(`${environment.apiUrl}/opening-details/${venueId}`, params);
  }

  getOpeningDetails(venueId: number) {
    return this.http.get<OpeningDetails>(`${environment.apiUrl}/opening-details/${venueId}`);
  }

}
