import {Component, OnInit} from '@angular/core';
import {ScaleType} from "@swimlane/ngx-charts";
import {Time} from "@angular/common";

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
  public image: string = '././assets/img/sopot.jpg';

  // Event creator
  stepNumber: number = 1;
  basicInfoVisible = false;
  locationVisible = false;
  posterVisible = false;
  additionalInfoVisible = false;
  detailsVisible = false;
  artistsVisible = false;

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

  areEventsPresent: boolean = true;

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


  ngOnInit() {
    this.activeEventsVisible = true;
    // this.eventCreationVisible = true;
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
}
