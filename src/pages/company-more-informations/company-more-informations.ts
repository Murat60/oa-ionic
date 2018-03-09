import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Company} from "../../models/company";

@Component({
    selector: 'page-company-more-informations',
    templateUrl: 'company-more-informations.html',
})
export class CompanyMoreInformationsPage {

    company: Company;

    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
        this.company = navParams.get('company');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
