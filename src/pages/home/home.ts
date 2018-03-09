import {Component, OnInit} from '@angular/core';
import {Events, LoadingController, ModalController, NavController} from 'ionic-angular';
import {CompanyRepositoryProvider} from "../../providers/company-repository/company-repository";
import {Filter} from "../../models/filter";
import {CompanyMoreInformationsPage} from "../company-more-informations/company-more-informations";
import {Company} from "../../models/company";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    public companies;
    public totalResults;

    constructor(public navCtrl: NavController,
                private companyRepository: CompanyRepositoryProvider,
                private events: Events,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController) {

        this.events.subscribe('generalSearchBar', (data) => {
            this.generalSearch(data);
        });

        /*this.events.subscribe('filters', (data) => {
            this.searchWithFilters(data);
        }); */

        this.events.subscribe('totalResults', (data) => {
            this.totalResults = data;
        });

        this.events.subscribe('endLoading', (data) => {
           this.loading(data);
        });

        this.events.subscribe('filtersUpdate', (data) => {
            this.companyRepository.loadDatas();
            this.events.subscribe('companies', (dataco) => {
                this.companies = dataco;
            });

        });
    }

    ngOnInit() {
        this.companyRepository.loadDatas();
        this.getCompanies();
    }

    getCompanies() {
        this.events.subscribe('companies', (data) => {
            this.companies = data;
        });
    }

    generalSearch(data: string) {
        const filter = new Filter();
        filter.generalSearch = data;
        this.companyRepository.setParams(filter);
        this.companyRepository.loadDatas();
        this.getCompanies();
    }

    /*searchWithFilters(filter: Filter)
    {
        this.companyRepository.setParams(filter);
        this.companyRepository.loadDatas();
        this.getCompanies();
    } */

    moreCompanyInformationModal(company: Company) {
        let moreInformationModal = this.modalCtrl.create(
            CompanyMoreInformationsPage, { 'company': company }
        );
        moreInformationModal.present();
    }

    private loading(status: boolean) {
        let loading = this.loadingCtrl.create();
            loading.present();

        if(status) {
            loading.dismiss();
        }
    }

}
