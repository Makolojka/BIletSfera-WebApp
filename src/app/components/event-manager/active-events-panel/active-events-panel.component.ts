import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PanelManagerService} from "../../../services/panel-manager.service";

@Component({
  selector: 'active-events-panel',
  templateUrl: './active-events-panel.component.html',
  styleUrls: ['./active-events-panel.component.css']
})
export class ActiveEventsPanelComponent implements OnInit{
  // Organizer data
  @Input() userId: string = '';
  ownedEvents: any[] = [];
  eventDetails: any[] = [];
  areEventsPresent: boolean = false;

  // Event data
  public image: string = '';
  public title: string = '';
  public date: string = '';
  public location: string = '';
  public views: number = 0;
  public ticketSold: number = 0;
  public moneyEarned: number = 0;
  constructor(private service: DataService, public panelManagerService: PanelManagerService) {}
  ngOnInit() {
    this.service.getOwnedEvents(this.userId).subscribe(
      (res: any) => {
        this.ownedEvents = res.ownedEvents;
        console.log('Owned Events:', this.ownedEvents);
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

}
