import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {LoginComponent} from "./components/login/login.component";
import {EventDetailComponent} from "./components/event-detail/event-detail.component";
import {WishListComponent} from "./components/wish-list/wish-list.component";
import {LikedComponent} from "./components/liked/liked.component";
import {CartComponent} from "./components/cart/cart.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'event/detail',
    component: EventDetailComponent,
  },
  {
    path: 'wishlist',
    component: WishListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'liked',
    component: LikedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  //Categories
  {
    path: 'events',
    component: CategoriesComponent,
  },
  {
    path: 'event/detail/:id',
    component: EventDetailComponent
  },
  // TODO: Tymczasowe routy, do zmiany bo zmienione url
  {
    path: 'events/event/detail/:id',
    component: EventDetailComponent
  },
  {
    path: 'cart/event/detail/:id',
    component: EventDetailComponent
  },
  {
    path: 'wishlist/event/detail/:id',
    component: EventDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
