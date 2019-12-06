import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './diary-home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {ProfileUserComponent} from './auth/profile/profile-user.component';
import {CanActivateTeam} from './protect-router/can-activate-team';
import {NotActivateTeam} from './protect-router/not-activate-team';
import {CreateDiaryComponent} from './diary/diary-create/create-diary.component';
import {DiaryComponent} from './diary/diary.component';
import {UserDiaryListComponent} from './diary/diary-list-of-user/user-diary-list.component';
import {BlogMainComponent} from './diary-home/main/blog-main.component';
import {DetailDiaryComponent} from './diary/diary-detail/detail-diary.component';
import {UpdateDiaryComponent} from './diary/diary-update/update-diary.component';
import {TagComponent} from './admin/manage-tag/tag.component';
import {IsAdmin} from './protect-router/is-admin';
import {ManageDiaryComponent} from './admin/manage-diary/manage-diary.component';
import {ManageUserComponent} from './admin/manage-user/manage-user.component';
import {ShowDiaryByTagComponent} from './diary/diary-search-by-title-and-tag/show-diary-by-tag.component';
import {DiaryImageCreateComponent} from './album/album-create/diary-image-create.component';
import {AddImageToAlbumComponent} from './album/album-add-image/add-image-to-album.component';
import {AlbumDetailComponent} from './album/album-detail/album-detail.component';
import {AlbumListOfUserComponent} from './album/album-list-of-user/album-list-of-user.component';
import {AlbumHomeComponent} from './album-home/album-home.component';




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
    path: 'album' ,
    component: AlbumHomeComponent
  },
  {
    path: 'diary/:id' ,
    component: DetailDiaryComponent
  },
  {
    path: 'album-detail/:id',
    component: AlbumDetailComponent,
  },
  { path: 'login',
    component: LoginComponent,
    canActivate: [NotActivateTeam],
  },
  {
    path: 'manage-tag/:id' ,
    component: ShowDiaryByTagComponent,
  },
  {
    path: 'library',
    component: DiaryComponent,
    canActivate: [CanActivateTeam],
    children: [
      { path: '',
        component: CreateDiaryComponent
      },
      {
        path: 'album-picture-create',
        component: DiaryImageCreateComponent,
      },
      {
        path: 'album-picture-add-image/:id',
        component: AddImageToAlbumComponent,
      },
      {
        path: 'album-of-user',
        component: AlbumListOfUserComponent,
      },
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
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
