import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { LatestEventsComponent } from './components/latest-events/latest-events.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { MainButtonComponent } from './components/main-button/main-button.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';
import { EventCategoriesComponent } from './components/event-categories/event-categories.component';
import { LoginComponent } from './components/login/login.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { MultiItemCarouselComponent } from './components/multi-item-carousel/multi-item-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    CarouselComponent,
    FooterComponent,
    LatestEventsComponent,
    EventCardComponent,
    MainButtonComponent,
    LikeButtonComponent,
    EventCategoriesComponent,
    LoginComponent,
    EventDetailComponent,
    MultiItemCarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
