import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isSidebarVisible = false;
  isDropdownVisible = false;

  constructor(public authService: AuthService, public router: Router) {
  }

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

  signOut() {
    this.authService.logout().subscribe((result: any) => {
      this.router.navigate(['/']);
      return result;
    });
  }

}
