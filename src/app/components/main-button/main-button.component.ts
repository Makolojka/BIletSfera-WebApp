import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-button',
  template: `
    <button [class]="buttonClass">
      <span *ngIf="icon" class="button-icon">
        <i class="fa {{ icon }} icon"></i>
      </span>
      <span>{{ text }}</span>
    </button>
  `,
  styleUrls: ['./main-button.component.css'],
})
export class MainButtonComponent {
  @Input() text: string;
  @Input() buttonClass: string;
  @Input() icon: string;

  constructor() {
    this.text = '';
    this.buttonClass = '';
    this.icon = '';
  }
}
