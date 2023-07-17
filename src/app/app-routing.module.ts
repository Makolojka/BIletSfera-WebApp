import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {LoginComponent} from "./components/login/login.component";
import {EventDetailComponent} from "./components/event-detail/event-detail.component";
import {WishListComponent} from "./components/wish-list/wish-list.component";

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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
