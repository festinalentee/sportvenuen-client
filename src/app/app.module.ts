import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavigationComponent} from './component/navigation/navigation.component';
import {RegisterComponent} from './component/register/register.component';
import {ErrorInterceptor} from "./interceptor/error.interceptor";
import {JwtInterceptor} from "./interceptor/jwt.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserComponent} from './component/user/user.component';
import {AddVenueComponent} from './component/add-venue/add-venue.component';
import {ExploreComponent} from './component/explore/explore.component';
import {FavouritesComponent} from './component/favourites/favourites.component';
import {MyVenuesComponent} from './component/my-venues/my-venues.component';
import {MyBookingsComponent} from './component/my-bookings/my-bookings.component';
import {VenueComponent} from './component/venue/venue.component';
import {SearchResultsComponent} from './component/search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    UserComponent,
    AddVenueComponent,
    ExploreComponent,
    FavouritesComponent,
    MyVenuesComponent,
    MyBookingsComponent,
    VenueComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
