import {Component, OnInit} from '@angular/core';
import {Venue} from "../../model/venue";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  public venues: Venue[];

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    let results = JSON.parse(localStorage.getItem('search-results')!)
    this.venues = !!results ? results : [];
  }
}
