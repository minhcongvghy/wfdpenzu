import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './home/header/header.component';
import { FeaturedComponent } from './home/featured/featured.component';
import { BlogMainComponent } from './home/main/blog-main.component';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { FooterComponent } from './home/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileUserComponent } from './auth/profile/profile-user.component';
import {CanActivateTeam} from './protect-router/can-activate-team';
import {Permissions} from './protect-router/permissions';
import {NotActivateTeam} from './protect-router/not-activate-team';
import { CreateDiaryComponent } from './diary/diary-create/create-diary.component';
import {CKEditorModule} from 'ngx-ckeditor';
import { DiaryComponent } from './diary/diary.component';
import { UserDiaryListComponent } from './diary/diary-list-of-user/user-diary-list.component';
import { DetailDiaryComponent } from './diary/diary-detail/detail-diary.component';
import { UpdateDiaryComponent } from './diary/diary-update/update-diary.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SafeHtmlPipe} from './diary/diary-detail/SafeHtmlPipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { TagComponent } from './admin/manage-tag/tag.component';
import {IsAdmin} from './protect-router/is-admin';
import { ManageDiaryComponent } from './admin/manage-diary/manage-diary.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { ShowDiaryByTagComponent } from './diary/diary-search-by-title-and-tag/show-diary-by-tag.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeaturedComponent,
    BlogMainComponent,
    SideBarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileUserComponent,
    CreateDiaryComponent,
    DiaryComponent,
    UserDiaryListComponent,
    DetailDiaryComponent,
    UpdateDiaryComponent,
    SafeHtmlPipe,
    TagComponent,
    ManageDiaryComponent,
    ManageUserComponent,
    ShowDiaryByTagComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [Permissions, CanActivateTeam, NotActivateTeam , IsAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
