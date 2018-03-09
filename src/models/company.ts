export class Company {

    name: string;
    ape: string;
    legalFormatCode: string;
    department: string;
    categorie: string;
    creationYear: string;
    staffNumberCode: string;
    turnoverCode: string;
    regionCode: string;
    street: string;
    zipCode: string;
    city: string;
    coordinates: string;
    siret: string;
    siren: string;

    constructor(data) {
        this.name = data.fields.nomen_long;
        this.ape = data.fields.apet700;
        this.legalFormatCode = data.fields.nj;
        this.department = data.fields.depet;
        this.categorie = data.fields.categorie;
        this.creationYear = data.fields.dapen;
        this.staffNumberCode = data.fields.efencent;
        this.turnoverCode = data.fields.tca;
        this.regionCode = data.fields.rpet;
        this.street = data.fields.l4_normalisee;
        this.zipCode = data.fields.codpos;
        this.city = data.fields.libcom;
        this.coordinates = data.fields.coordonnees;
        this.siret = data.fields.siret;
        this.siren = data.fields.siren;
    }

    toArray() {
        return {
            'name': this.name,
            'ape': this.ape,
            'legalFormatCode': this.legalFormatCode,
            'department': this.department,
            'categorie': this.categorie,
            'creationYear': this.creationYear,
            'staffNumberCode': this.staffNumberCode,
            'turnoverCode': this.turnoverCode,
            'regionCode': this.regionCode,
            'street': this.street,
            'zipCode': this.zipCode,
            'city': this.city,
            'coordinates': this.coordinates,
            'siret': this.siret,
            'siren': this.siren,
            'fullAddress': this.getFullAddress(),
        }
    }

    public getFullAddress() {
        return this.street
            + ' ' + this.zipCode
            + ' ' + this.city;
    }
}