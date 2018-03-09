import {Component, OnInit} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {Filter} from "../../models/filter";
import {CompanyRepositoryProvider} from "../../providers/company-repository/company-repository";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit{

  public mapUrl: string;

  constructor(public navCtrl: NavController,
              private companyRepository: CompanyRepositoryProvider,
              private events: Events) {
      this.events.subscribe('generalSearchBar', (data) => {
          this.mapUrl = this.getMapUrl(data);
      });
  }

  ngOnInit()
  {
      this.mapUrl = this.getMapUrl();
  }

  private getMapUrl(param: string = "") {

    const filter = new Filter()
    filter.generalSearch = param;
    this.companyRepository.setParams(filter);
    return this.companyRepository.getMapIframeUrl();
  }

}
