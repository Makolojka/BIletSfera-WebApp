import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {ViewportScroller} from "@angular/common";
@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent{
  constructor(private viewportScroller: ViewportScroller) {}

  scrollTo(id: string) {
    this.viewportScroller.scrollToAnchor(id);
  }
  isScreenSmall = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.isScreenSmall = window.innerWidth < 768;
    console.log('Small window');
  }
  // // @ts-ignore
  // @ViewChild('stickyMenu') menuElement: ElementRef ;
  //
  // sticky: boolean = false;
  // elementPosition: any;
  //
  // ngOnInit() {
  // }
  //
  // ngAfterViewInit(){
  //   this.elementPosition = this.menuElement.nativeElement.offsetTop;
  // }
  //
  // @HostListener('window:scroll', ['$event'])
  // handleScroll(){
  //   const windowScroll = window.pageYOffset;
  //   if(windowScroll >= this.elementPosition){
  //     this.sticky = true;
  //   } else {
  //     this.sticky = false;
  //   }
  // }

}