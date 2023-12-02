import {Component, Input} from '@angular/core';
import {ScaleType} from "@swimlane/ngx-charts";
import {DataService} from "../../../services/data.service";
import {PanelManagerService} from "../../../services/panel-manager.service";

@Component({
  selector: 'app-reports-panel',
  templateUrl: './reports-panel.component.html',
  styleUrls: ['./reports-panel.component.css']
})
export class ReportsPanelComponent {

  @Input() userId: string = '';
  public imageMissing: string = '././assets/img/sopot.jpg';

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

  constructor(private service: DataService, public panelManagerService: PanelManagerService) {}

}