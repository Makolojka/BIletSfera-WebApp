import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {tick} from "@angular/core/testing";
import {OrderDataService} from "../../services/order-data.service";
import {DateParserService} from "../../services/date-parser.service";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  screenSize: number;
  userId: string = '';
  cartData: any;
  isCartDataEmpty: boolean = true;

  // // Transaction data
  // transactionData: any = {};

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenSize = window.innerWidth;
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: DataService,
              private authService: AuthService,
              private orderDataService: OrderDataService,
              private dateParserService: DateParserService) {
    this.screenSize = window.innerWidth;
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.userId = this.authService.getUserId();
      this.getCartItems(); // Call the method to fetch cart items from the server
    }
  }

  getCartItems() {
    this.service.getCart(this.userId).subscribe(
      (cartData: any) => {
        this.cartData = cartData; // Assign the fetched cart data to the cartData variable
        // console.log("JSON.stringify(this.cartData)"+JSON.stringify(this.cartData.cart))
        if(this.cartData.cart.length>0){
          // console.log("is cart false")
          this.isCartDataEmpty = false;
        }
        else{
          // console.log("is cart true")
          this.isCartDataEmpty = true;
        }
        // console.log("cartData: "+JSON.stringify(this.cartData)) cartItem.event.category
        // console.log("cartData.cart[0].event.category: "+JSON.stringify(cartData.cart[0].event.category))
        // console.log("cartData.cart[0].tickets[0]: "+JSON.stringify(cartData.cart[0]))
        // console.log("cartData.cart[0].tickets[0].seatNumbers: "+JSON.stringify(cartData.cart[0].tickets[0].seatNumbers))
        // console.log("cartData.cart[0].tickets[0].quantity: "+JSON.stringify(cartData.cart[0].tickets[0].quantity))
      },
      (error: any) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }
  // TODO: takie same użycie tych samych funkcji w sidebarze, do zmiany
  incrementQuantity(userId: string, eventId: string, ticketId: string) {
    this.service.addTicketToCart(userId, eventId, ticketId, 1).subscribe(
      (response) => {
        this.getCartItems();
      },
      (error) => {
        throw error;
      }
    );
  }

  decrementQuantity(userId: string, eventId: string, ticketId: string) {
    this.service.removeTicketFromCart(userId, eventId, ticketId, 1).subscribe(
      (response) => {
        this.getCartItems();
      },
      (error) => {
        throw error;
      }
    );
  }

  removeWholeTicket(userId: string, eventId: string, ticketId: string, quantity: number) {
    this.service.removeTicketFromCart(userId, eventId, ticketId, quantity).subscribe(
      (response) => {
        this.getCartItems();
      },
      (error) => {
        throw error;
      }
    );
  }

  getTotalSum(): number {
    // Calculate the total sum by iterating through the cart items and summing up the item totals
    let totalSum = 0;
    if (this.cartData && this.cartData.cart) {
      for (const cartItem of this.cartData.cart) {
        for (const ticket of cartItem.tickets) {
          totalSum += ticket.quantity * ticket.price;
        }
      }
    }
    return Number(totalSum.toFixed(2));
  }

  makeOrder() {
    if (this.isCartDataEmpty) {
      console.log("Koszyk jest pusty!");
      return;
    } else {
      // Filter out expired events from the cartData
      const filteredCartData = this.cartData.cart.filter((cartItem: { event: { date: string; }; }) => !this.isEventExpired(cartItem.event.date));

      if (filteredCartData.length === 0) {
        console.log("Wszystkie wydarzenia w koszyku są przeterminowane!");
        return;
      }

      // Assign filtered cartData to orderDataService
      this.orderDataService.userId = this.userId;
      this.orderDataService.cartData = { cart: filteredCartData };
      this.router.navigate(['/cart/order']);
    }
  }

  isEventExpired(dateStr: string): boolean {
    const { startDate, endDate } = this.dateParserService.parseEventDate(dateStr);
    const currentDate = new Date();

    // Check if the event has expired based on its date range
    return endDate < currentDate;
  }

  protected readonly tick = tick;
}
