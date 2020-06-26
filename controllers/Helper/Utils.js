const { nanoid } = require('nanoid');

class Utils {
    constructor() {
        if(!Utils.instance)
            Utils.instance = this;
        return Utils.instance;
    }

    /**
     * returns the base url of the site
     */
    baseUrl() {
        return 'https://shrt.me/'
    }

    /**
     * returns unique id using nanoid
     * @param {INT} size 
     */
    uniqueId(size = null) {
        try {
            if (!size)
                size = 6;
            return nanoid(size);
        } catch (err) {
            return;
        }        
    }
}

const instance = new Utils();
Object.freeze(instance);

module.exports = instance;

