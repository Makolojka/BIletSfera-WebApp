import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3001';
  private token = this.authService.getToken();
  constructor(private http: HttpClient, public authService: AuthService) {
  }
  // Events endpoints
  // TODO: zabezpieczyć tokenem resztę ważnych endpointów
  getAll() {
    return this.http.get(this.url + '/api/events');
  }
  getById(id: string) {
    return this.http.get(this.url + '/api/events/' + id);
  }

  // Artists endpoints
  getAllArtists() {
    return this.http.get(this.url + '/api/artists');
  }
  getArtistsForEvent(eventId: string) {
    return this.http.get(this.url + '/api/events/' + eventId + '/artists');
  }

  //Tickets endpoints
  getTicketsForEvent(eventId: string) {
    return this.http.get(this.url + '/api/events/' + eventId + '/tickets');
  }

  //Cart endpoints
  getCart(userId: string) {
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'})
    return this.http.get(this.url + '/api/user/' + userId + '/cart', {headers: headers});
  }
  removeTicketFromCart(userId: string, eventId: string, ticketId: string, quantity: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'})
    const body = { quantity: quantity };
    return this.http.post(this.url + '/api/user/' + userId + '/cart/remove-ticket/' + eventId + '/' + ticketId, body, {headers: headers});
  }

  addTicketToCart(userId: string, eventId: string, ticketId: string) {
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'})
    return this.http.post(this.url + '/api/user/' + userId + '/cart/add-ticket/' + eventId + '/' + ticketId, {}, {headers: headers});
  }
}
