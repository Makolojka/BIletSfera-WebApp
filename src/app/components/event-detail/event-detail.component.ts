import {Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {ViewportScroller} from "@angular/common";
import {Ticket} from "../event-card/Ticket";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Artist} from "../../interfaces/artist";
@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit{
  public image: string = '';
  public text: string = '';
  public title: string = '';
  public date: string = '';
  public tickets: Ticket[] = [];
  public location: string = '';
  public organiser: string = '';
  public additionalText: string = '';
  public artists: Artist[] = [];
  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute, private service: DataService) {}

  ngOnInit() {
    let id: string = '';
    this.route.paramMap
      .subscribe((params: any) => {
        id = params.get('id');
      });

    this.service.getById(id).subscribe((res: any) => {
      this.image = res['image'];
      this.text = res['text'];
      this.title = res['title'];
      this.date = res['date'];
      this.tickets = res['tickets'];
      console.log(this.tickets);
      this.location = res['location'];
      this.organiser = res['organiser'];
      this.additionalText = res['additionalText'];
    });

    this.service.getArtistsForEvent(id).subscribe((res: any) => {
      this.artists = res;
    });

    console.log("Artists:"+this.artists);
  }

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

  showArtistDetails(aaa: string) {
    console.log('aaaa');
  }
}
