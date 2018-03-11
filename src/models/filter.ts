import {Company} from "./company";

export class Filter
{
    private _ape;
    private _city;
    private _creationYear;
    private _region;
    private _turnover;
    private _effective;
    private _legalForm;
    private _departement;
    private _category;
    private _generalSearch: string;

    get ape() {
        return this._ape;
    }

    set ape(value) {
        this._ape = value;
    }

    get city() {
        return this.city;
    }

    set city(value) {
        this._city = value;
    }

    get creationYear() {
        return this._creationYear;
    }

    set creationYear(value) {
        this._creationYear = value;
    }

    get region() {
        return this._region;
    }

    set region(value) {
        this._region = value;
    }

    get turnover() {
        return this._turnover;
    }

    set turnover(value) {
        this._turnover = value;
    }

    get effective() {
        return this._effective;
    }

    set effective(value) {
        this._effective= value;
    }

    get legalForm() {
        return this._legalForm;
    }

    set legalForm(value) {
        this._legalForm = value;
    }

    get departement() {
        return this._departement;
    }

    set departement(value) {
        this._departement = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get generalSearch(): string {
        return this._generalSearch;
    }

    set generalSearch(value: string) {
        this._generalSearch = value;
    }
}
