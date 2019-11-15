import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ProfileUserComponent} from './profile-user/profile-user.component';
import {CanActivateTeam} from './deactivate/can-activate-team';
import {NotActivateTeam} from './deactivate/not-activate-team';
import {CreateDiaryComponent} from './create-diary/create-diary.component';
import {DiaryComponent} from './diary/diary.component';




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
  { path: 'login',
    component: LoginComponent,
    canActivate: [NotActivateTeam],
  },
  {
    path: 'diary',
    component: DiaryComponent,
    children: [
      { path: '', component: CreateDiaryComponent},
      { path: 'profile' ,
        component: ProfileUserComponent,
        canActivate: [CanActivateTeam],
      },
    ]
  },
  { path: 'register' ,
    component: RegisterComponent,
    canActivate: [NotActivateTeam],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
