import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ticket} from "../event-card/Ticket";
import {AuthService} from "../../services/auth.service";
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  items$: any;
  dataLoaded = false;
  ticketsMap: { [eventId: string]: Ticket[] } = {}; // Map to store tickets for each event
  userId = '';
  oneTimeMonitChecked: boolean | undefined;

  constructor(private service: DataService,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.getAll();
    this.getUserId();
    if(this.userId !== '')
    {
      this.fetchUserPreferences();
      if(this.oneTimeMonitChecked === false || this.userId !== ''){
        this.openModal('personalizedOffersModal');
      }
    }
  }

  getAll() {
    this.service.getAll().subscribe((response) => {
      this.items$ = response;
      this.dataLoaded = true;
      this.fetchTicketsForEachEvent(); // Fetch tickets for each event after getting all events
    });
  }

  fetchTicketsForEachEvent() {
    this.items$.forEach((event: any) => {
      this.service.getTicketsForEvent(event.id).subscribe((res: any) => {
        this.ticketsMap[event.id] = res;
      });
    });
  }

  fetchUserPreferences(): void {
    this.service.getUserPreferences(this.userId).subscribe(
      (data: any) => {
        this.oneTimeMonitChecked = data.oneTimeMonitChecked;
        console.log('oneTimeMonitChecked:', this.oneTimeMonitChecked);
      },
      (error: any) => {
        console.error('Error fetching user preferences:', error);
      }
    );
  }

  getUserId(){
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.userId = currentUser.name;
    }
  }

  openModal(modalId: string) {
    const modalDiv= document.getElementById(modalId);
    if(modalDiv != null)
    {
      modalDiv.style.display = 'block';
    }
    // this.lowerBrightness();
  }
  closeModal(modalId: string) {
    const modalDiv= document.getElementById(modalId);
    if(modalDiv!= null)
    {
      modalDiv.style.display = 'none';
    }
    // this.raiseBrightness();
  }

  // lowerBrightness() {
  //   const element = this.elementRef.nativeElement.querySelector('.main');
  //   if (element) {
  //     this.renderer.addClass(element, 'brightness-70');
  //   }
  // }
  // raiseBrightness() {
  //   const element = this.elementRef.nativeElement.querySelector('.main');
  //   if (element) {
  //     this.renderer.removeClass(element, 'brightness-70');
  //   }
  // }

  goToPreferences() {
    this.router.navigate(['/user-details']);
  }
}
