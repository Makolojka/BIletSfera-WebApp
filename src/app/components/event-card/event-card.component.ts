import {Component, Input} from '@angular/core';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() image?: string;
  @Input() text?: string;

}

