import {Component, HostListener, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {Ticket} from "../event-card/Ticket";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Artist} from "../../interfaces/artist";
import {AuthService} from "../../services/auth.service";
import {SnackbarSuccessComponent} from "../snackbars/snackbar-success/snackbar-success.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoomSchema} from "../../interfaces/room-schema";
import {Row} from "../../interfaces/row";
import {Seat} from "../../interfaces/seat";

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
  public roomSchemaDetails: RoomSchema[] = [];
  public roomSchema: Row[] = [];
  public userId: string = '';
  public id: string = '';

  public followerCount: number = 0;
  public likesCount: number = 0;

  public isLiked: boolean = false;
  public isFollowed: boolean = false;

  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute, private service: DataService, private authService: AuthService,
  private _snackBar: MatSnackBar) {}

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
      this.roomSchemaDetails = res['roomSchema'];
      this.roomSchema = res['roomSchema'].roomSchema;

      this.location = res['location'];
      this.organiser = res['organiser'];
      this.additionalText = res['additionalText'];
      // console.log("RoomSchema w subscribe:"+JSON.stringify(this.roomSchema));
    });

    this.service.getArtistsForEvent(this.id).subscribe((res: any) => {
      this.artists = res;
    });

    //TODO: przekazywać jako parametr z home
    this.service.getTicketsForEvent(this.id).subscribe((res: any) => {
      this.tickets = res;
    });

    this.incrementViews();
    this.getLikes();
    this.getFollowers();

    if (this.userId){
      this.checkIfLiked();
      this.checkIfFollowed();
    }
    console.log("RoomSchema :"+this.roomSchemaDetails);
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
        this.openSnackBarSuccess("Dodano do koszyka.");
        window.location.reload();
        console.log("Added to the cart")
      },
      (error) => {
        throw error;
      }
    );
  }
  openSnackBarSuccess(msg: string) {
    this._snackBar.openFromComponent(SnackbarSuccessComponent, {
      duration: 5000,
      data: { msg: msg },
      panelClass: ['snackbar-success-style']
    });
  }

  // TODO: zabezpieczenie, co jak nie wykona się jedna z metod?
  likeEvent(){
    // console.log("this.userId: "+this.userId+"  this.id: "+this.id+" for likedEvents")
    if(this.userId && this.id)
    {
      this.service.addUserLikeOrFollower(this.userId, this.id, 'likedEvents').subscribe(
        (response) => {
          //   Toast message
          console.log("Event added to liked");
          console.log("Event added to liked isLiked:", this.isLiked);

          if(this.isLiked){
            this.likesCount--;
          }
          else {
            this.likesCount++;
          }
          this.checkIfLiked();
        },
        (error) => {
          throw error;
        }
      );
      this.service.addEventLikeOrFollower(this.id, this.userId, 'like').subscribe(
        (response) => {
          //   Toast message
          console.log("Event added to liked");
        },
        (error) => {
          throw error;
        }
      );
    }
    else{
      console.log("Missing userId or eventId");
    }
  }

  followEvent(){
    if(this.userId && this.id)
    {
      this.service.addUserLikeOrFollower(this.userId, this.id, 'followedEvents').subscribe(
        (response) => {
          //   Toast message
          console.log("Event added to followed");
          console.log("Event added to liked isFollowed:", this.isFollowed);

          if(this.isFollowed){
            this.followerCount--;
          }
          else {
            this.followerCount++;
          }
          this.checkIfFollowed();
        },
        (error) => {
          throw error;
        }
      );
      this.service.addEventLikeOrFollower(this.id, this.userId, 'follow').subscribe(
        (response) => {
          //   Toast message
          console.log("Event added to liked");
        },
        (error) => {
          throw error;
        }
      );
    }
    else{
      console.log("Missing userId or eventId");
    }
  }

  getFollowers(){
    this.service.getEventLikedOrFollowedCount(this.id, 'follow').subscribe((res: any) => {
      this.followerCount = res['count'];
    });
  }
  getLikes(){
    this.service.getEventLikedOrFollowedCount(this.id, 'like').subscribe((res: any) => {
      this.likesCount = res['count'];
    });
  }

  showArtistDetails(aaa: string) {
    console.log('aaaa');
  }

  incrementViews(){
    this.service.incrementEventViews(this.id).subscribe(
      (response) => {
        //   Toast message
        console.log("Views incremented")
      },
      (error) => {
        throw error;
      }
    );
  }

  checkIfLiked(){
    this.service.checkIfEventIsLiked(this.userId, this.id, 'likedEvents').subscribe(
      (response) => {
        const isLiked = response.isLiked;
        if (isLiked !== undefined) {
          console.log("isLiked: ", isLiked);
          this.isLiked = isLiked;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  checkIfFollowed(){
    this.service.checkIfEventIsLiked(this.userId, this.id, 'followedEvents').subscribe(
      (response) => {
        const isLiked = response.isLiked;
        if (isLiked !== undefined) {
          console.log("isFollowed: ", isLiked);
          this.isFollowed = isLiked;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Seat picker
  getBackgroundColor(index: number): any {
    const colors = ['#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e74c3c', '#1abc9c', '#34495e', '#e67e22', '#27ae60', '#95a5a6'];

    if (index < this.tickets.length) {
      return { 'background-color': this.tickets[index].color };
    } else {
      return { 'background-color': colors[index % colors.length] };
    }
  }

  public chosenSeats: Seat[] = [];
  // selectedSeat(seat: Seat) {
  //   this.chosenSeats.push(seat);
  // }
  isSeatChosen(seat: Seat): boolean {
    return this.chosenSeats.some(chosenSeat => chosenSeat.id === seat.id);
  }

  selectedSeat(seat: Seat) {
    const seatIndex = this.chosenSeats.findIndex(chosenSeat => chosenSeat.id === seat.id);

    if (seatIndex === -1) {
      this.chosenSeats.push(seat);
    } else {
      this.chosenSeats.splice(seatIndex, 1);
    }
  }

  parseSeat(id: string): string {
    const parts = id.split('.');
    const row = parseInt(parts[0]) + 1;
    const seat = parseInt(parts[1]) + 1;
    return `${row}.${seat}.`;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;

    // Loop through chosen seats and find their corresponding ticket prices
    this.chosenSeats.forEach((seat: Seat) => {
      const correspondingTicket = this.tickets.find((ticket: Ticket) => ticket.type === seat.type);
      if (correspondingTicket) {
        totalPrice += correspondingTicket.price;
      }
    });

    return parseFloat(totalPrice.toFixed(2));
  }
}
