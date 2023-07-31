import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

}
