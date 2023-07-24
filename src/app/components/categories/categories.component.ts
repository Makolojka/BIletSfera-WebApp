import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  public items$: any;
  isRegularView = false; // Set the initial view to wide cards

  toggleView(view: 'regular' | 'wide'): void {
    this.isRegularView = view === 'regular';
  }

  constructor(private service: DataService) {
  }
  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
      // console.log(this.items$);
      // console.log(JSON.stringify(this.items$[0].id));
      // console.log("Id:"+this.items$);
    });
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
