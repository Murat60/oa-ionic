export class SearchField {
    private code: string;
    private name: string;
    private isVisible: boolean;

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
        this.isVisible = true;
    }

    /**
     * @returns {string}
     */
    getCode() {
        return this.code;
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @returns {boolean}
     */
    getIsVisible() {
        return this.isVisible;
    }

    /**
     * @param {boolean} isVisible
     */
    setIsVisible(isVisible: boolean) {
        this.isVisible = isVisible;

        return this;
    }
}