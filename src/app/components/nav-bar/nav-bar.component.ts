import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {LikesAndFollows} from "../../interfaces/likes-and-follows";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isSidebarVisible = false;
  isDropdownVisible = false;
  public userId: string = '';
  cartData: any;
  ticketCount: number = 0;
  followedCount: number = 0;
  likedCount: number = 0;

  menuHolder: HTMLElement | null = null;
  isMenuToggled: boolean = false;

  constructor(public authService: AuthService,
              public router: Router,
              private service: DataService,
              private renderer: Renderer2,
              private el: ElementRef) {
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleDropdown(): void {
    if(window.innerWidth <= 768){
      this.isDropdownVisible = !this.isDropdownVisible;
      // this.userId = '';
      // this.cartData = '';
    }
  }

  ngOnInit() {
    this.isMenuToggled = false;
    // @ts-ignore
    // this.menuHolder.className = null;
    if(this.authService.isLoggedIn()){
      this.userId = this.authService.getUserId();
      this.getCartItems();
      this.getLikedAndFollowedCount();
    }

    this.menuHolder = document.getElementById('menuHolder') as HTMLElement;
    console.log("this.menuHolder init: ", this.menuHolder)

    this.onWindowResize(); // Initialize the visibility based on the initial window size
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth > 768) {
      this.isDropdownVisible = false; // Hide dropdown on larger screens
    }
  }

  signOut() {
    this.authService.logout().subscribe((result: any) => {
      this.router.navigate(['/']);
      return result;
    });
  }

  getCartItems() {
    this.service.getCart(this.userId).subscribe(
      (cartData: any) => {
        this.cartData = cartData; // Assign the fetched cart data to the cartData variable
        this.calculateTicketCount();
        // console.log("cartData: "+JSON.stringify(this.cartData))
      },
      (error: any) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }

  addTicketToCart(eventId: string, ticketId: string) {
    this.service.addTicketToCart(this.userId, eventId, ticketId, 1).subscribe(
      (response: any) => {
        this.getCartItems();
      },
      (error: any) => {
        console.error('Error adding ticket to cart:', error);
      }
    );
  }

  removeTicketFromCart(eventId: string, ticketId: string) {
    this.service.removeTicketFromCart(this.userId, eventId, ticketId, 1).subscribe(
      (response: any) => {
        this.getCartItems();
      },
      (error: any) => {
        console.error('Error removing ticket from cart:', error);
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

  calculateTicketCount() {
    if (this.cartData && this.cartData.cart) {
      let ticketCount = 0;
      for (const cartItem of this.cartData.cart) {
        for (const ticket of cartItem.tickets) {
          ticketCount += ticket.quantity;
        }
      }
      this.ticketCount = ticketCount;
    }
    // console.log("calculateTicketCount this.ticketCount"+this.ticketCount)
  }

  getLikedAndFollowedCount() {
    this.service.getUserLikedOrFollowedEventsCount(this.userId).subscribe(
      (response: LikesAndFollows) => {
        // console.log("response: "+JSON.stringify(response));
        this.likedCount = response.likedEventsCount;
        this.followedCount = response.followedEventsCount;
      },
      (error) => {
        // Handle error if needed
      }
    );
  }
  menuToggle() {
    const menuHolderElement = this.el.nativeElement.querySelector('#menuHolder');

    if (menuHolderElement) {
      this.isMenuToggled = !this.isMenuToggled;

      if (this.isMenuToggled) {
        this.renderer.addClass(menuHolderElement, 'drawMenu');
      } else {
        this.renderer.removeClass(menuHolderElement, 'drawMenu');
      }
    }
  }


}
