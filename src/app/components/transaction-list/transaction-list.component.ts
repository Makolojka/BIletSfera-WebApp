import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {PanelManagerService} from "../../services/panel-manager.service";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit{
  userId: string = '';
  transactions: any[] = [];
  constructor(private service: DataService, private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.getTransactions();
    console.log("this.transactions: ",this.transactions)
  }

  getTransactions(): void {
    this.service.getAllTransactions(this.userId).subscribe((res: any) => {
      this.transactions = res;
      this.transactions.forEach(transaction => {
        transaction.ticketDetails = [];
        transaction.tickets.forEach((ticket: { ticketId: string; count: any; }) => {
          this.service.getTicketDetailsById(ticket.ticketId).subscribe((res: any) => {
            const ticketDetail = {
              count: ticket.count,
              ticketName: res.type,
              ticketPrice: res.price
            };
            transaction.ticketDetails.push(ticketDetail);
          });
        });
      });
    });
  }

}
