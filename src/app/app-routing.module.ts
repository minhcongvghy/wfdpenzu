import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ProfileUserComponent} from "./profile-user/profile-user.component";



const routes: Routes = [
  // App routes goes here here
  {
    path: '',
    component: HomeComponent,
    // children: [
    //   { path: 'dashboard', component: DashboardComponent },
    //   { path: 'profile', component: ProfileComponent }
    // ]
  },
  { path: 'login', component: LoginComponent},
  { path: 'register' , component: RegisterComponent},
  { path: 'profile' , component: ProfileUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
