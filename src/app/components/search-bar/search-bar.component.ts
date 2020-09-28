import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  text: string;
  @Output() requestSearch = new EventEmitter()

  constructor() {
    this.text = ''
  }

  ngOnInit(): void {
  }

  updateSearch(searchField: string){
    this.text = searchField.trim().toLowerCase();
    console.log(this.text)
  }

  searchItem(searchField: string){
    this.text = searchField.trim().toLowerCase();
    console.log("Sending: " + this.text)
    this.requestSearch.emit(this.text)
  }
}
