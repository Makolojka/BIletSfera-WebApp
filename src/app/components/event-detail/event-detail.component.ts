import {Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {ViewportScroller} from "@angular/common";
import {Ticket} from "../event-card/Ticket";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Artist} from "../../interfaces/artist";
import {AuthService} from "../../services/auth.service";
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
  public userId: string = '';
  public id: string = '';
  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute, private service: DataService, private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.route.paramMap
      .subscribe((params: any) => {
        this.id = params.get('id');
      });

    this.service.getById(this.id).subscribe((res: any) => {
      this.image = res['image'];
      this.text = res['text'];
      this.title = res['title'];
      this.date = res['date'];
      // this.tickets = res['tickets'];
      // console.log(this.tickets);
      this.location = res['location'];
      this.organiser = res['organiser'];
      this.additionalText = res['additionalText'];
    });

    this.service.getArtistsForEvent(this.id).subscribe((res: any) => {
      this.artists = res;
    });

    //TODO: przekazywać jako parametr z home
    this.service.getTicketsForEvent(this.id).subscribe((res: any) => {
      this.tickets = res;
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
  addTicket(userId: string, ticketId: string) {
    // console.log("userID: "+userId+"  eventId: "+this.id+"  ticketID: "+ticketId)
    this.service.addTicketToCart(userId, this.id, ticketId).subscribe(
      (response) => {
      //   Toast message
        console.log("Added to the cart")
      },
      (error) => {
        throw error;
      }
    );
  }

  showArtistDetails(aaa: string) {
    console.log('aaaa');
  }
}
