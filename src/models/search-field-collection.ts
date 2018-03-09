import {SearchField} from "../models/search-field";

export class SearchFieldCollection {

    private collection: SearchField[];

    constructor(collection: SearchField[] = []) {
        this.collection = collection;
    }

    /**
     * @param {string} code
     * @param {boolean} visibility
     * @returns {this}
     */
    setVisible(code: string, visibility: boolean) {
        this.collection.forEach(searchField => {
            if (searchField.getCode() == code) {
                searchField.setIsVisible(visibility);
            }
            return this;
        });

        return this;
    }

    /**
     * @returns {this}
     */
    showAllSearchField() {
        this.collection.forEach(searchField => {
            searchField.setIsVisible(true);
        });

        return this;
    }

    /**
     * @returns {SearchField[]}
     */
    getVisibles() {
        let returnArray: SearchField[] = [];

        this.collection.forEach(searchField => {
            if (searchField.getIsVisible()) {
                returnArray.push(searchField);
            }
        });

        return returnArray;
    }

    /**
     * @returns {SearchField[]}
     */
    getCollection() {
        return this.collection;
    }
}