import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  screenSize: number;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) { // Specify the type of 'event' parameter as Event
    this.screenSize = window.innerWidth;
  }

  constructor() {
    this.screenSize = window.innerWidth;
  }
}
