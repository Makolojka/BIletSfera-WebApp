import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'latest-events',
  templateUrl: './latest-events.component.html',
  styleUrls: ['./latest-events.component.css']
})
export class LatestEventsComponent{
  // ngOnInit(): void {
  //   const container = document.querySelector('.slider-container') as HTMLElement;
  //   const wrapper = document.querySelector('.slider-wrapper') as HTMLElement;
  //   const prevBtn = document.querySelector('.slider-prev') as HTMLElement;
  //   const nextBtn = document.querySelector('.slider-next') as HTMLElement;
  //
  //   let currentPosition = 0;
  //   const cardWidth = (wrapper.querySelector('.card') as HTMLElement).offsetWidth;
  //   const cardsInView = Math.floor(container.offsetWidth / cardWidth);
  //   const cardsToSlide = 1;
  //   const totalCards = wrapper.querySelectorAll('.card').length;
  //   const minPosition = 0;
  //   const maxPosition = Math.max(cardsInView, 0);
  //
  //
  //   const disableButton = (button: HTMLElement, disabled: boolean) => {
  //     if (disabled) {
  //       button.setAttribute('disabled', 'disabled');
  //     } else {
  //       button.removeAttribute('disabled');
  //     }
  //   };
  //
  //   const updateButtonState = () => {
  //     disableButton(prevBtn, currentPosition >= minPosition);
  //     disableButton(nextBtn, currentPosition <= -maxPosition);
  //   };
  //
  //   prevBtn.addEventListener('click', () => {
  //     if (currentPosition < minPosition) {
  //       currentPosition += cardsToSlide * cardWidth;
  //       currentPosition = Math.min(currentPosition, 0);
  //       wrapper.style.transform = `translateX(${currentPosition}px)`;
  //     }
  //     updateButtonState();
  //   });
  //
  //   nextBtn.addEventListener('click', () => {
  //     if (currentPosition > -maxPosition) {
  //       currentPosition -= cardsToSlide * cardWidth;
  //       currentPosition = Math.max(currentPosition, -(totalCards - cardsInView) * cardWidth);
  //       wrapper.style.transform = `translateX(${currentPosition}px)`;
  //     }
  //     updateButtonState();
  //   });
  //
  //   updateButtonState();
  // }
}
