import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Events} from "ionic-angular";
import {Company} from "../../models/company";
import {Filter} from "../../models/filter";

@Injectable()
export class CompanyRepositoryProvider {

    private mapIframeUrl: string = "https://public.opendatasoft.com/explore/embed/dataset/sirene/map/?basemap=mapbox.streets";
    private apiUrl: string = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&lang=fr";
    private apiParams: string;
    private companies: Company[] = [];
    private scrollNumber;

    constructor(private http: Http, private events: Events) {
        this.events.subscribe('filters', (data) => {
            this.searchWithFilters(data);
        });
        this.events.subscribe('scrolledPage', (data) => {
            this.scrollNumber = data;
        });

    }

    loadDatas()
    {
        this.events.publish('startLoading', true);

        this.callApi().subscribe(
            data => {
                this.companies = data['records'].map(company => new Company(company));
                this.events.publish('companies', this.companies);
                this.events.publish('totalResults', data['nhits']);
                this.events.publish('endLoading', true);
            });
    }

    reloadDatas()
    {
        this.loadDatas();
    }

    private callApi()
    {
        return this.http.get(this.getApiUrl())
            .map(this.extractData)
            .do(this.logResponse)
            .catch(this.catchError);
    }

    private catchError(error: Response | any )
    {
        return Observable.throw(error.json() || "Server error");
    }

    private logResponse(res: Response)
    {
        return console.log(res);
    }

    private extractData(res: Response | any)
    {
        return res.json();
    }

    setParams(filter: Filter = new Filter())
    {
        this.resetApiParams();

        if(filter.generalSearch) this.apiParams = filter.generalSearch;

        if(filter.ape) this.apiParams += this.paramStart() + '(apet700:' + this.setMultipleParams(filter.ape);
        if(filter.category)this.apiParams += this.paramStart() + "(categorie:" + this.setMultipleParams(filter.category);
        if(filter.departement) this.apiParams += this.paramStart() + "(depet:" + this.setMultipleParams(filter.departement);
        if(filter.creationYear) this.apiParams += this.paramStart() + "(dapen:" + this.setMultipleParams(filter.creationYear);
        if(filter.turnover) this.apiParams += this.paramStart() +"(tca:" + this.setMultipleParams(filter.turnover);
        if(filter.effective) this.apiParams += this.paramStart() + "(tefen:" + this.setMultipleParams(filter.effective);
        if(filter.legalForm) this.apiParams += this.paramStart() + "(nj:" + this.setMultipleParams(filter.legalForm);
        if(filter.region) this.apiParams += this.paramStart() + "(rpen:" + this.setMultipleParams(filter.region);
    }



    private getApiUrl()
    {
        let url = this.apiUrl;
        url += "&rows=" + this.dataRowsCalculator(this.scrollNumber);
        if(this.apiParams) url += "&q=" + this.apiParams;
        return url;

    }

    public getMapIframeUrl()
    {
        return (this.apiParams !== "undefined") ? this.mapIframeUrl + "&q=" + this.apiParams : this.mapIframeUrl;
    }

    private setMultipleParams(elements: any)
    {

        let params = "";
        for( let element of elements)
        {
            if(element !== "undefined") {
                const orOp = (elements[elements.length-1] === element) ? ")" : "%20OR%20";
                params += element + orOp;
            }
        }

        return params;
    }

    searchWithFilters(filter: Filter = new Filter())
    {
        this.companies = [];
        this.setParams(filter);
        this.loadDatas();
    }
    private resetApiParams()
    {
        this.apiParams = "";
    }

    private paramStart()
    {
        const paramStart = (this.apiParams.substr(this.apiParams.length - 1) === ")") ? "%20AND%20" : "";
        return paramStart;
    }

    private dataRowsCalculator(scrollNum: any)
    {
        let rows = 0;
        rows = (scrollNum > 0) ? 10 * scrollNum : 15;
        return rows;
    }


}
