import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {PanelManagerService} from "../../services/panel-manager.service";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
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
    // console.log("this.transactions: ",this.transactions)
  }

  getTransactions(): void {
    this.service.getAllTransactions(this.userId).subscribe((transactions: any) => {
      this.transactions = transactions;

      this.transactions.forEach(transaction => {
        transaction.ticketDetails = [];

        transaction.tickets.forEach((ticket: any) => {
          this.service.getTicketDetailsById(ticket.ticketId).subscribe((ticketDetails: any) => {
            const ticketDetail = {
              count: ticket.count,
              ticketName: ticketDetails.type,
              ticketPrice: ticketDetails.price,
              eventId: ticket.eventId,
              ticketId: ticket.ticketId
            };
            transaction.ticketDetails.push(ticketDetail);
          });
        });
      });

      console.log("transactions: ", transactions);
    });
  }

  generateTicketPdf(ticketName: string, ticketPrice: number, ticketCount: number, eventId: string, transactionId: string, transaction: any) {
    // console.log("eventId w pdf:", eventId);
    // console.log("transaction w pdf: ", transaction)
    const seatNumbers = transaction.tickets.reduce((numbers: string[], ticket: any) => {
      if (ticket.seatNumbers.length > 0) {
        numbers.push(...ticket.seatNumbers);
      }
      return numbers;
    }, []);
    // console.log("seatNumbers w pdf: ", seatNumbers)

    this.service.getById(eventId).subscribe((eventDetails: any) => {
      const eventName = eventDetails.title || 'Nazwa niedostępna';

      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        content: [
          {
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 800,
                h: 50,
                color: '#2d1a42' // Background color for header
              }
            ]
          },
          {
            text: 'Bilet',
            style: 'header',
            absolutePosition: { x: 80, y: 50 },
            color: '#ffffff'
          },
          {
            columns: [
              {
                width: '60%',
                stack: [
                  { text: 'Bilet na wydarzenie', color: '#2d1a42', fontSize: 18 },
                  { text: eventName, bold: true, margin: [0, 5, 0, 10], color: '#333333', fontSize: 18 },
                  { text: 'Typ/Nazwa biletu', color: '#2d1a42', fontSize: 18 },
                  { text: ticketName, margin: [0, 5, 0, 10], color: '#333333', fontSize: 20 },
                  { text: 'Cena za jeden bilet', color: '#2d1a42', fontSize: 18 },
                  { text: `${ticketPrice} zł`, margin: [0, 5, 0, 10], color: '#333333', fontSize: 20 },
                  { text: 'Ilość biletów', color: '#2d1a42', fontSize: 18 },
                  { text: ticketCount.toString(), margin: [0, 5, 0, 10], color: '#333333', fontSize: 20 },
                  seatNumbers.length > 0 ? { text: 'Numer(y) miejsc: ' + seatNumbers.join(', '), margin: [0, 5, 0, 10], color: '#2d1a42', fontSize: 18 } : null
                ].filter(Boolean),
                margin: [10, 0, 0, 0],
                color: '#ffffff'
              },
              {
                width: 'auto',
                stack: [
                  { qr: transactionId, fit: 100 },
                ],
                margin: [100, 0, 0, 0]
              }
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            alignment: 'left',
            margin: [10, 10, 0, 10],
            color: '#ffffff'
          }
        }
      };

      // @ts-ignore
      pdfMake.createPdf(docDefinition).open();
    });
  }


}
