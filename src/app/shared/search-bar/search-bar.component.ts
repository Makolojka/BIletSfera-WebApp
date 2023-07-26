import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{
  public filterText: string = '';
  public items$: any;
  @Output() name = new EventEmitter<string>();
  @Output() inputFocus = new EventEmitter<boolean>();
  constructor(private router: Router, private route: ActivatedRoute, private service: DataService){ }

  ngOnInit(): void {
    this.getAll();
  }
  sendFilter(): void {
    this.name.emit(this.filterText);
    this.router.navigate(['/'], {
      queryParams: {
        name:
        this.filterText
      }
    });
    this.inputFocus.emit(true);
    // If the filter text is empty, emit inputFocus event with false to handle hiding the search results
    if (this.filterText=='') {
      this.inputFocus.emit(false);
    }
  }
  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
      // console.log(this.items$);
      // console.log(JSON.stringify(this.items$[0].id));
      // console.log("Id:"+this.items$);
    });
  }

  onFocus(): void {
    // Emit the focus event when the input is focused
    this.inputFocus.emit(true);
    console.log("onfocus: true");
  }

  onBlur(): void {
    // Emit the focus event when the input loses focus
    this.inputFocus.emit(false);
    console.log("onblur: false");
  }
}
