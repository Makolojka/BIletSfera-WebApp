import { Component } from '@angular/core';

@Component({
  selector: 'cat-music',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  isRegularView = false; // Set the initial view to wide cards

  toggleView(view: 'regular' | 'wide'): void {
    this.isRegularView = view === 'regular';
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
}
