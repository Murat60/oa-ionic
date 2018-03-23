import {Component, OnInit} from '@angular/core';
import { Events, InfiniteScroll, ModalController, NavController, ToastController } from 'ionic-angular';
import {CompanyRepositoryProvider} from "../../providers/company-repository/company-repository";
import {Filter} from "../../models/filter";
import {CompanyMoreInformationsPage} from "../company-more-informations/company-more-informations";
import {Company} from "../../models/company";
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    public companies = [];
    public totalResults;
    public scrolledPage = 0;
    public loadingText = "";
    private loaded: boolean = false;
    connected: Subscription;
    disconnected: Subscription;


    constructor(public navCtrl: NavController,
                private companyRepository: CompanyRepositoryProvider,
                private events: Events,
                public modalCtrl: ModalController,
                private network: Network,
                private toast: ToastController) {

        this.events.subscribe('generalSearchBar', (data) => {
            this.generalSearch(data);
        });

        this.events.subscribe('totalResults', (data) => {
            this.totalResults = data;
        });

        this.events.subscribe('filtersUpdate', (data) => {
            this.companyRepository.loadDatas();
            this.events.subscribe('companies', (dataco) => {
                this.companies = dataco;
            });

        });
    }

    ngOnInit() {

        this.connected = this.network.onConnect().subscribe(data => {
            console.log(data)
            this.displayNetworkUpdate(data.type);
        });

        this.disconnected = this.network.onDisconnect().subscribe(data => {
            console.log(data)
            this.displayNetworkUpdate(data.type, true);
        });

        this.companyRepository.loadDatas();
        this.getCompanies();
    }


    ionViewWillLeave(){
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
    }

    displayNetworkUpdate(connectionState: string, offlineMode: boolean = false){

        this.companyRepository.loadDatas();

        if(offlineMode === true) {
            this.toast.create({
                message: `Aucune connexion n'est disponible`,
            }).present();
        } else {
            this.toast.create({
                message: `Connecté !`,
                duration: 10000
            }).present();
        }
    }


    getCompanies() {
        this.events.subscribe('companies', (data) => {
            this.companies = data;
            this.loadingText = "";
            this.loaded = true;
        });
    }

    generalSearch(data: string) {
        const filter = new Filter();
        filter.generalSearch = data;
        this.companyRepository.setParams(filter);
        this.companyRepository.loadDatas();
        this.getCompanies();
    }

    moreCompanyInformationModal(company: Company) {
        let moreInformationModal = this.modalCtrl.create(
            CompanyMoreInformationsPage, { 'company': company }
        );
        moreInformationModal.present();
    }

    doInfinite(infiniteScroll: InfiniteScroll) {
        if(infiniteScroll._position === "bottom" && this.loaded == true) {
            this.scrolledPage += 1;
            this.loadingText = "Chargement...";
            this.events.publish('scrolledPage', this.scrolledPage);
            this.companyRepository.loadDatas();
            this.getCompanies();
            infiniteScroll.complete();
        }

    }

}
