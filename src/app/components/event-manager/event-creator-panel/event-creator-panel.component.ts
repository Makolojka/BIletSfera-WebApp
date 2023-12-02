import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {PanelManagerService} from "../../../services/panel-manager.service";
import {SnackbarComponent} from "../../snackbars/snackbar-error/snackbar.component";
import {SnackbarSuccessComponent} from "../../snackbars/snackbar-success/snackbar-success.component";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Ticket} from "../../../interfaces/ticket";

@Component({
  selector: 'app-event-creator-panel',
  templateUrl: './event-creator-panel.component.html',
  styleUrls: ['./event-creator-panel.component.css']
})
export class EventCreatorPanelComponent implements OnInit{

  @Input() userId: string = '';

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

  // 5. step - Ticket add
  tickets: Ticket[] = [];
  newTicket = {
    type: '',
    price: 0,
    dayOfWeek: '',
    date: '',
  };

  // 6. step - Artist add
  artists: any[] = [];
  artistsParticipating: any[] = [];

  newArtist = {
    name: '',
    image: '',
    shortDescription: '',
    career: ''
  };
  isFormSubmitted: boolean = false;
  incorrectArtistInfo = false;
  constructor(private service: DataService, private authService: AuthService, private elementRef: ElementRef,
              private renderer: Renderer2,
              private _snackBar: MatSnackBar, public panelManagerService: PanelManagerService) {}

  ngOnInit(){
    this.basicInfoVisible = true;
  }

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

  // Create new ticket
  createNewTicket() {
    const newTicket: Ticket = {
      type: this.newTicket.type,
      price: this.newTicket.price,
      dayOfWeek: this.newTicket.dayOfWeek,
      date: this.newTicket.date,
    };
    this.tickets.push(newTicket);
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
