import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Ticket} from "../event-card/Ticket";

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public items$: any;
  isRegularView = false; // Set the initial view to wide cards
  sortOption: string = 'default';
  categoriesFilter: string = '';
  locationFilter: string = '';
  subCategoriesFilter: string = '';

  toggleView(view: 'regular' | 'wide'): void {
    this.isRegularView = view === 'regular';
  }

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(response => {
      this.items$ = response;
      console.log(this.items$);
    });
  }

  applyFilters(): void {
    let filteredItems = this.items$;

    // Filter by location
    if (this.locationFilter) {
      filteredItems = filteredItems.filter((item: any) =>
        item.location.toLowerCase().includes(this.locationFilter.toLowerCase())
      );
    }

    // Filter by categories
    if (this.categoriesFilter) {
      filteredItems = filteredItems.filter((item: any) =>
        item.categories.includes(this.categoriesFilter)
      );
    }

    // Filter by subcategories
    if (this.subCategoriesFilter) {
      filteredItems = filteredItems.filter((item: any) =>
        item.subCategories.includes(this.subCategoriesFilter)
      );
    }

    // ... Add more filters here ...

    // Apply sorting based on the user's selected option
    switch (this.sortOption) {
      case 'default':
        filteredItems.sort((a: any, b: any) => a.title.localeCompare(b.title));
        break;
      case 'popularity':
        filteredItems.sort((a: any, b: any) => b.views - a.views);
        break;
      case 'newest':
        filteredItems.sort((a: any, b: any) => {
          const dateA = a.createdAt ? new Date(a.createdAt.substring(0, 10)) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt.substring(0, 10)) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'lowest':
        filteredItems.sort((a: any, b: any) => this.getLowestTicketPrice(a.tickets) - this.getLowestTicketPrice(b.tickets));
        break;
      case 'highest':
        const highestOfLowestPrice = this.getHighestOfLowestTicketPrice();
        filteredItems.sort((a: any, b: any) => highestOfLowestPrice - this.getLowestTicketPrice(a.tickets) - (highestOfLowestPrice - this.getLowestTicketPrice(b.tickets)));
        break;
      default:
        break;
    }

    this.items$ = filteredItems;
  }

  //Returns the lowest price of all tickets of given event
  getLowestTicketPrice(tickets: Ticket[]): number {
    if (!tickets || tickets.length === 0) {
      return 0;
    }

    return tickets.reduce((minPrice, ticket) => {
      return ticket.price < minPrice ? ticket.price : minPrice;
    }, tickets[0].price);
  }

  //Returns the highest price of all tickets of given event
  getHighestTicketPrice(tickets: Ticket[]): number {
    if (!tickets || tickets.length === 0) {
      return 0;
    }

    return tickets.reduce((maxPrice, ticket) => {
      return ticket.price > maxPrice ? ticket.price : maxPrice;
    }, tickets[0].price);
  }

  //Returns the highest price of the lowest price of given event
  getHighestOfLowestTicketPrice(): number {
    let highestOfLowestPrice = 0;

    if (!this.items$ || this.items$.length === 0) {
      return highestOfLowestPrice;
    }

    this.items$.forEach((item: any) => {
      const lowestTicketPrice = this.getLowestTicketPrice(item.tickets);
      if (lowestTicketPrice > highestOfLowestPrice) {
        highestOfLowestPrice = lowestTicketPrice;
      }
    });

    return highestOfLowestPrice;
  }
}

// states = [
//   {
//     name: 'State 1',
//     cities: ['City 1', 'City 2', 'City 3'],
//     showCities: false // Initially, cities are hidden
//   },
//   {
//     name: 'State 2',
//     cities: ['City A', 'City B', 'City C'],
//     showCities: false // Initially, cities are hidden
//   },
//   // Add more states and their respective cities here
// ];
//
// selectedState: any; // Property to store the selected state
// clickedCity: string=''; // Property to store the selected state
//
// onSelectionChange(value: string | any) {
//   if (value === 'state') {
//     console.log('Select State clicked');
//     this.selectedState = null; // Reset selected state if "Select State" is clicked
//   } else {
//     console.log('Selected City:', value);
//     this.selectedState = value; // Set the selected state to show cities
//     this.clickedCity = value;
//   }
// }
//
// toggleCities(state: any): void {
//   state.showCities = !state.showCities;
// }

// isTagsDropdownOpen = false;
//
// toggleTagsDropdown(): void {
//   this.isTagsDropdownOpen = !this.isTagsDropdownOpen;
// }
