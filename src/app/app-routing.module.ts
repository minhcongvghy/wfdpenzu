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
import {UserDiaryListComponent} from './user-diary-list/user-diary-list.component';
import {BlogMainComponent} from './blog-main/blog-main.component';
import {DetailDiaryComponent} from './detail-diary/detail-diary.component';
import {UpdateDiaryComponent} from './update-diary/update-diary.component';
import {TagComponent} from './tag/tag.component';
import {IsAdmin} from './deactivate/is-admin';
import {ManageDiaryComponent} from './manage-diary/manage-diary.component';
import {ManageUserComponent} from './manage-user/manage-user.component';




const routes: Routes = [
  // App routes goes here here
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: BlogMainComponent },
    ]
  },
  {
    path: 'diary/:id' ,
    component: DetailDiaryComponent
  }
  ,
  { path: 'login',
    component: LoginComponent,
    canActivate: [NotActivateTeam],
  },
  {
    path: 'library',
    component: DiaryComponent,
    canActivate: [CanActivateTeam],
    children: [
      { path: '', component: CreateDiaryComponent},
      { path: 'profile' ,
        component: ProfileUserComponent,
        canActivate: [CanActivateTeam],
      },
      { path: 'listUserDiary' ,
        component: UserDiaryListComponent,
        canActivate: [CanActivateTeam],
      },
      {
        path: 'updateDiary/:id' ,
        component: UpdateDiaryComponent
      },
      {
        path: 'manageTag' ,
        component: TagComponent ,
        canActivate: [IsAdmin]
      },
      {
        path: 'manageDiary' ,
        component: ManageDiaryComponent ,
        canActivate: [IsAdmin]
      },
      {
        path: 'manageUser' ,
        component: ManageUserComponent ,
        canActivate: [IsAdmin]
      }
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
