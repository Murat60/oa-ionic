import { Component } from '@angular/core';
import {Events} from "ionic-angular";

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html'
})

export class GeneralSearchBarComponent {

  public inputSearch: string;
  constructor(private events: Events) {}

  generalSearch()
  {
    if(this.inputSearch) {
        this.events.publish('generalSearchBar', this.inputSearch);
    }
  }

}
