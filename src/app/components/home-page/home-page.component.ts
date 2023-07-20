import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  public items$: any;
  constructor(private service: DataService) {
  }
  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
      console.log(this.items$);
    });
  }
}
