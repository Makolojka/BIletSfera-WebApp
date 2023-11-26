import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-organizer-overview-page',
  templateUrl: './organizer-overview-page.component.html',
  styleUrls: ['./organizer-overview-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class OrganizerOverviewPageComponent implements OnInit{
  selectedFeature: string = 'Twórz';

  features = [
    { title: 'Twórz', description: 'Twórz wydarzenia w wygodnym interfejsie dostępnym po zalogowaniu na konto organizatora, ' +
        'personalizuj bilety, informacje o wydarzeniach i dodawaj artystów, którzy wezmą udział w Twoim wydarzeniu.' },
    { title: 'Zarządzaj', description: 'Panel organizatora umożliwi Ci podgląd aktualnie aktywnych wydarzeń, edytuj wydarzenia, twórz nowe oraz śledź sprzedaż swoich biletów' },
    { title: 'Sprzedawaj', description: 'Sprzedawaj bilety na wydarzenia, zarządzaj cenami i monitoruj postęp sprzedaży dzięki wygodnemu interfejsowi dostępnemu w panelu organizatora.' },
    { title: 'Analizuj', description: 'Podejmuj lepsze decyzje biznesowe dzięki wygodnym narzędziom dostepnym\n' +
        '          z poziomu organizatora, które pozwolą Ci na analizę danych sprzedaży i\n' +
        '          preferencji użytkowników.' }
  ];

  ngOnInit() {
    this.toggleFeatureDescription(this.selectedFeature);
  }

  // Function to toggle the selected feature description
  toggleFeatureDescription(title: string) {
    this.selectedFeature = title;
  }
}
