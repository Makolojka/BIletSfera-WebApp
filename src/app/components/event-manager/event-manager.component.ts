import {Component, OnInit} from '@angular/core';
import {ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent implements OnInit{
  activeEventsVisible = false;
  reportsVisible = false;
  eventCreationVisible = false;

  activePanel = ''; // Track the active panel
  public image: string = '././assets/img/sopot.jpg';
  areEventsPresent: boolean = true;

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

  // view: [number, number] = [875, 300];
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

  ngOnInit() {
    // this.activeEventsVisible = true;
    this.reportsVisible = true;
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
  }

  private resetVisibility() {
    this.activeEventsVisible = false;
    this.reportsVisible = false;
    this.eventCreationVisible = false;
  }
}
