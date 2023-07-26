import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3001';
  constructor(private http: HttpClient) {
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

}
