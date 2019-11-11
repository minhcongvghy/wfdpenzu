import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { TagHeaderComponent } from './tag-header/tag-header.component';
import { FeaturedComponent } from './featured/featured.component';
import { BlogMainComponent } from './blog-main/blog-main.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TagHeaderComponent,
    FeaturedComponent,
    BlogMainComponent,
    SideBarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
