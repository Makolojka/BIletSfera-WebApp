import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {SearchBarComponent} from "../../shared/search-bar/search-bar.component";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isSidebarVisible = false;
  isDropdownVisible = false;
  public filterText: string = '';
  @Input() items$: any;

  // Searchbar
  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  showSearchResults: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleDropdown(): void {
    if(window.innerWidth <= 768){
      this.isDropdownVisible = !this.isDropdownVisible;
    }
  }
  ngOnInit() {
    this.onWindowResize(); // Initialize the visibility based on the initial window size
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth > 768) {
      this.isDropdownVisible = false; // Hide dropdown on larger screens
    }
  }

  getName($event: string): void {
    this.filterText = $event;
  }

  // TODO: searchbar do poprawy
  onSearchBarFocusChange(isFocused: boolean) {
    // Show search results only if the input is focused and has some text
    // if(this.showSearchResults == true)
    // {
    //   this.showSearchResults = false
    // }
    // else if(this.showSearchResults == false){
    //   this.showSearchResults = true
    // }
    this.showSearchResults = isFocused && this.filterText!=='';
    // this.showSearchResults = isFocused && this.filterText.trim().length > 0;
    // console.log("Onsearchchange")
    console.log("isFocused:"+isFocused)
    console.log("Filtertext:"+this.filterText)
  }

}
