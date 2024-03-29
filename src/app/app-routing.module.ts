import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {AuthGuard} from "./guard/auth.guard";
import {UserComponent} from "./component/user/user.component";
import {AddVenueComponent} from "./component/add-venue/add-venue.component";
import {ExploreComponent} from "./component/explore/explore.component";
import {FavouritesComponent} from "./component/favourites/favourites.component";
import {MyVenuesComponent} from "./component/my-venues/my-venues.component";
import {MyBookingsComponent} from "./component/my-bookings/my-bookings.component";
import {VenueComponent} from "./component/venue/venue.component";
import {SearchResultsComponent} from "./component/search-results/search-results.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'explore', component: ExploreComponent},
  {path: 'venue/:id', component: VenueComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'add-venue', component: AddVenueComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: AddVenueComponent, canActivate: [AuthGuard]},
  {path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard]},
  {path: 'my-venues', component: MyVenuesComponent, canActivate: [AuthGuard]},
  {path: 'my-bookings', component: MyBookingsComponent, canActivate: [AuthGuard]},
  {path: 'search-results', component: SearchResultsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
