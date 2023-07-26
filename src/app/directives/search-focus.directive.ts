import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appSearchFocus]'
})
export class SearchFocusDirective {
  @Output() searchBarFocused = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('focus', ['$event'])
  onFocus(event: Event): void {
    this.searchBarFocused.emit(true);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    this.searchBarFocused.emit(false);
  }

}
