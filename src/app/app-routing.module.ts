import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {AuthGuard} from "./guard/auth.guard";
import {AdminComponent} from "./component/admin/admin.component";
import {Role} from "./model/role";
import {UserComponent} from "./component/user/user.component";
import {AddVenueComponent} from "./component/add-venue/add-venue.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: [Role.ROLE_ADMIN]}},
  {path: 'add-venue', component: AddVenueComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
