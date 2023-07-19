import { Component } from '@angular/core';

@Component({
  selector: 'cat-music',
  templateUrl: './cat-music.component.html',
  styleUrls: ['./cat-music.component.css']
})
export class CatMusicComponent {
  isTagsDropdownOpen = false;

  toggleTagsDropdown(): void {
    this.isTagsDropdownOpen = !this.isTagsDropdownOpen;
  }
}
