import {Component} from '@angular/core';
import {categories, depet, nj, rpens, tcas, tefens} from "../../data/lists";
import {Events} from "ionic-angular";
import {Filter} from "../../models/filter";

@Component({
    selector: 'filters',
    templateUrl: 'filters.html'
})
export class FiltersComponent {

    selecteApe = [];
    selectedCities = [];
    selectedCreationYears = [];
    selectedCategories = [];

    settedFilters: Filter;

    // input
    ape: string;
    city: string;
    creationYear: string;
    effective: Array<string>;
    turnover: Array<string>;
    legalForm: Array<string>;
    departement: Array<string>;
    category: Array<string>;
    region: Array<string>;

    // liste
    turnoverList: any;
    effectiveList: any;
    legalFormList: any;
    departementList: any;
    categoryList: any;
    regionsList: any;

    constructor(private events: Events) {
        this.turnoverList = tcas.getCollection();
        this.effectiveList = tefens.getCollection();
        this.legalFormList = nj.getCollection();
        this.departementList = depet.getCollection();
        this.categoryList = categories.getCollection();
        this.regionsList = rpens.getCollection();
    }

    searchFilter(value: any = "", selectedList = []) {
        const filter = new Filter();

        if (value) {
            this.removeList(value, selectedList);
        }

        if (this.ape) filter.ape = this.setMultipleValueForInput(this.ape, this.selecteApe);
        this.ape = "";
        if (this.city) filter.city = this.setMultipleValueForInput(this.city, this.selectedCities);
        this.city = "";
        if (this.creationYear) filter.creationYear = this.setMultipleValueForInput(this.creationYear, this.selectedCreationYears);
        this.creationYear = "";
        if (this.category) filter.category = this.category;
        if (this.region) filter.region = this.region;
        if (this.effective) filter.effective = this.effective;
        if (this.legalForm) filter.legalForm = this.legalForm;
        if (this.turnover) filter.turnover = this.turnover;
        if (this.departement) filter.departement = this.departement;
        this.settedFilters = filter;
        this.publishEvents('filters', filter);
    }

    private setMultipleValueForInput(value: string, selectedArray = []) {
        selectedArray.push(value);
        return selectedArray;
    }

    publishEvents(topic: string, data: any) {
        this.events.publish(topic, data);
    }

    removeList(value: any, selectedList = []) {
        const valueIndex = selectedList.indexOf(value);
        selectedList.splice(valueIndex, 1);
    }
}
