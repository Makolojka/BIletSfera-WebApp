import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ScaleType} from "@swimlane/ngx-charts";
import {Time, ViewportScroller} from "@angular/common";
import {Ticket} from "../event-card/Ticket";
import {Artist} from "../../interfaces/artist";
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {forkJoin} from "rxjs";
import {SnackbarComponent} from "../snackbars/snackbar-error/snackbar.component";
import {SnackbarSuccessComponent} from "../snackbars/snackbar-success/snackbar-success.component";

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent implements OnInit{
  // Main panels
  activeEventsVisible = false;
  reportsVisible = false;
  eventCreationVisible = false;
  activePanel = ''; // Track the active panel

  // Temporary img
  public imageMissing: string = '././assets/img/sopot.jpg';

  // Event creator
  stepNumber: number = 1;
  basicInfoVisible = false;
  locationVisible = false;
  posterVisible = false;
  additionalInfoVisible = false;
  detailsVisible = false;
  artistsVisible = false;
  areEventsPresent: boolean = false;

  // 1. step - Basic info vars
  eventName: string = '';
  startDate: Date = new Date();
  startDateTime: string = '';
  endDate: Date = new Date();
  endDateTime: string = '';

  selectedCategories: string[] = [];
  selectedSubCategories: string[] = [];

  // 2. step - Location vars
  eventCity: string = '';
  eventPlace: string = '';

  // 3. step - Promo image
  promoImage: string = '';

  // 4. step - Additional info
  additionalInfo: string = '';

  // Temporary chart data
  saleData =  [
    {
      "name": "Bilety",
      "series": [
        {
          "name": "12.10.2023",
          "value": 12
        },
        {
          "name": "13.10.2023",
          "value": 1200
        },
        {
          "name": "14.10.2023",
          "value": 2040
        },
        {
          "name": "15.10.2023",
          "value": 8276
        }
      ]
    },
  ];

  // Main chart options
  legend: boolean = true;
  legendTitle: string = 'Legenda';
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Data';
  yAxisLabel: string = 'Liczba sprzedanych biletów';
  timeline: boolean = true;
  colorScheme = {
    name: 'purple',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#6B3FA0',
      '#2d1a42',
      '#e5b8ff'
    ]
  };

  // Dynamic logic - main objects
  public userId: string = '';
  ownedEvents: any[] = [];
  eventDetails: any[] = [];
  artists: any[] = [];

  // Artists add step 6
  artistsParticipating: any[] = [];
  newArtist = {
    name: '',
    image: '',
    shortDescription: '',
    career: ''
  };
  isFormSubmitted: boolean = false;
  incorrectArtistInfo = false;


  // Dynamic logic - Active events
  public image: string = '';
  public title: string = '';
  public date: string = '';
  public location: string = '';
  public views: number = 0;
  public ticketSold: number = 0;
  public moneyEarned: number = 0;

  constructor(private service: DataService, private authService: AuthService, private elementRef: ElementRef,
              private renderer: Renderer2,
              private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.activeEventsVisible = true;
    // this.eventCreationVisible = true; // TODO: Zmienić na this.activeEventsVisible = true; w późniejszym etapie
    this.userId = this.authService.getUserId();
    this.service.getOwnedEvents(this.userId).subscribe(
      (res: any) => {
        this.ownedEvents = res.ownedEvents;
        // console.log('Owned Events:', this.ownedEvents);
        this.fetchEventDetails();
        if(this.ownedEvents.length !== 0){
          this.areEventsPresent = true;
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  fetchEventDetails() {
    this.ownedEvents.forEach((eventId: string) => {
      this.service.getById(eventId).subscribe((res: any) => {
        this.eventDetails.push(res);
      });
    });
  }


  // TODO: Tylko do testu - usunąć później
  // addEventTOP(){
  //   this.service.addEventToOwnedEvents(this.userId, '64c7d625d0be393eb01912f6').subscribe(
  //     (response) => {
  //       console.log("Event added to ownedEvents");
  //     },
  //     (error) => {
  //       throw error;
  //     }
  //   );
  //
  // }

  toggleCategory(type: string, value: string) {
    if(type==='category'){
      const index = this.selectedCategories.indexOf(value);
      if (index !== -1) {
        // Category exists, remove it
        this.selectedCategories.splice(index, 1);
      } else {
        // Category does not exist, add it
        this.selectedCategories.push(value);
      }
    }
    else if(type==='subCategory'){
      const index = this.selectedSubCategories.indexOf(value);
      if (index !== -1) {
        // Category exists, remove it
        this.selectedSubCategories.splice(index, 1);
      } else {
        // Category does not exist, add it
        this.selectedSubCategories.push(value);
      }
    }

    console.log(this.selectedCategories)
    console.log(this.selectedSubCategories)
  }

  isCategorySelected(category: string) {
    return this.selectedCategories.includes(category);
  }
  isSubCategorySelected(subCategory: string) {
    return this.selectedSubCategories.includes(subCategory);
  }

  showActiveEvents() {
    this.resetVisibility();
    this.activeEventsVisible = true;
    this.activePanel = 'activeEvents';
  }

  showReports() {
    this.resetVisibility();
    this.reportsVisible = true;
    this.activePanel = 'reports';
  }

  showEventCreation() {
    this.resetVisibility();
    this.eventCreationVisible = true;
    this.activePanel = 'eventCreation';
    this.basicInfoVisible = true;
  }

  private resetVisibility() {
    this.activeEventsVisible = false;
    this.reportsVisible = false;
    this.eventCreationVisible = false;
  }

  toggleCreatorPanel(panelName: string) {
    // Reset visibility for all panels
    this.basicInfoVisible = false;
    this.locationVisible = false;
    this.posterVisible = false;
    this.additionalInfoVisible = false;
    this.detailsVisible = false;
    this.artistsVisible = false;

    // Set the visibility for the selected panel
    switch (panelName) {
      case 'basicInfo':
        this.basicInfoVisible = true;
        this.locationVisible = false;
        this.posterVisible = false;
        this.additionalInfoVisible = false;
        this.detailsVisible = false;
        this.artistsVisible = false;
        this.stepNumber = 1;
        break;
      case 'location':
        this.basicInfoVisible = false;
        this.locationVisible = true;
        this.posterVisible = false;
        this.additionalInfoVisible = false;
        this.detailsVisible = false;
        this.artistsVisible = false;
        this.stepNumber = 2;
        break;
      case 'poster':
        this.basicInfoVisible = false;
        this.locationVisible = false;
        this.posterVisible = true;
        this.additionalInfoVisible = false;
        this.detailsVisible = false;
        this.artistsVisible = false;
        this.stepNumber = 3;
        break;
      case 'additionalInfo':
        this.basicInfoVisible = false;
        this.locationVisible = false;
        this.posterVisible = false;
        this.additionalInfoVisible = true;
        this.detailsVisible = false;
        this.artistsVisible = false;
        this.stepNumber = 4;
        break;
      case 'details':
        this.basicInfoVisible = false;
        this.locationVisible = false;
        this.posterVisible = false;
        this.additionalInfoVisible = false;
        this.detailsVisible = true;
        this.artistsVisible = false;
        this.stepNumber = 5;
        break;
      case 'artists':
        this.basicInfoVisible = false;
        this.locationVisible = false;
        this.posterVisible = false;
        this.additionalInfoVisible = false;
        this.detailsVisible = false;
        this.artistsVisible = true;
        this.stepNumber = 6;
        break;
    }
  }

  openModal(modalId: string) {
    const modalDiv= document.getElementById(modalId);
    if(modalDiv != null)
    {
      modalDiv.style.display = 'block';
    }
    if(modalId === 'artistsBase'){
      this.getAllArtists();
    }
    this.lowerBrightness();
  }
  closeModal(modalId: string) {
    const modalDiv= document.getElementById(modalId);
    if(modalDiv!= null)
    {
      modalDiv.style.display = 'none';
    }
    this.raiseBrightness();
  }

  lowerBrightness() {
    const element = this.elementRef.nativeElement.querySelector('.main');
    if (element) {
      this.renderer.addClass(element, 'brightness-70');
    }
  }
  raiseBrightness() {
    const element = this.elementRef.nativeElement.querySelector('.main');
    if (element) {
      this.renderer.removeClass(element, 'brightness-70');
    }
  }

  //  Get all artists
  getAllArtists() {
    this.service.getAllArtists().subscribe(
      (res: any) => {
        this.artists = res;
      },
      (error: any) => {
        console.error('Error fetching artists:', error);
      }
    );
  }

  // Add or remove an artist from artistParticipating array
  toggleArtist(artist: any) {
    const index = this.artistsParticipating.findIndex((a) => a.id === artist.id);
    if (index === -1) {
      this.artistsParticipating.push(artist); // Add the artist if not already present
    } else {
      this.artistsParticipating.splice(index, 1); // Remove the artist if already present
    }
  }

  // Create new artist
  createNewArtist() {
    if (this.validateForm()) {
      return this.service.createNewArtist(this.newArtist).subscribe(
        (result) => {
            this.newArtist = {
              name: '',
              image: '',
              shortDescription: '',
              career: ''
            };
            this.closeModal("createNewArtist");
            this.openSnackBarSuccess("Pomyślnie utworzono nowego artystę.");
        },
        (error) => {
          if(error){
            this.openSnackBarError("Coś poszło nie tak: " + error);
          }
        }
      );
    }
    return;
  }

  validateForm(): boolean {
    if (!this.newArtist.name || !this.newArtist.image || !this.newArtist.shortDescription) {
      this.isFormSubmitted = true;
      return false;
    }
    return true;
  }

  // Snackbar messages
  openSnackBarError(errorMsg: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      data: { errorMsg: errorMsg },
      panelClass: ['snackbar-error-style']
    });
  }
  openSnackBarSuccess(msg: string) {
    this._snackBar.openFromComponent(SnackbarSuccessComponent, {
      duration: 5000,
      data: { msg: msg },
      panelClass: ['snackbar-success-style']
    });
  }

  protected readonly open = open;
}
