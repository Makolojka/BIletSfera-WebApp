import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent implements OnInit{
  activeEventsVisible = false;
  completedEventsVisible = false;
  reportsVisible = false;
  eventCreationVisible = false;

  activePanel = ''; // Track the active panel
  public image: string = '././assets/img/sopot.jpg';
  areEventsPresent: boolean = true;

  ngOnInit() {
    this.activeEventsVisible = true;
  }
  showActiveEvents() {
    this.resetVisibility();
    this.activeEventsVisible = true;
    this.activePanel = 'activeEvents';
  }

  showCompletedEvents() {
    this.resetVisibility();
    this.completedEventsVisible = true;
    this.activePanel = 'completedEvents';
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
  }

  private resetVisibility() {
    this.activeEventsVisible = false;
    this.completedEventsVisible = false;
    this.reportsVisible = false;
    this.eventCreationVisible = false;
  }
}
