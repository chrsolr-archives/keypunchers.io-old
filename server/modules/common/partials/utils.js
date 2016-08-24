'use strict';

class Utils {
    constructor() {}
    
    static capitalizeAllWords(term) {
        const result = term.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        return result;
    }
}

module.exports = Utils;