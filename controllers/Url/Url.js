const utils = require('../Helper/Utils');
const DB = require('../../db/mysql/connection');

class Url {
    constructor() {
        if(!Url.instance)
            Url.instance = this;
        return Url.instance;
    }

    async create(url, slug) {
        try {

            // get the unique id, if slug is not present
            if(!slug)
                slug = utils.uniqueId();

            // return error when slug is not present
            if(!slug)
                throw new Error('slug was not created');
                
            // if url is not present in the payload
            if(!url)
                throw new Error('url is required');

            // write insert code
            let [result] = await DB.query('insert into websites (url, slug) values (?, ?)',[url, slug]);
            result = await this.fetch(slug);
            return result;

        } catch(err) {
            return { error: err.message };
        }
    }

    async fetch(slug) {
        try {

            // return error when slug is not present
            if(!slug)
                throw new Error('slug is required');
                
            // fetch url against the slug
            let [rows] = await DB.query('select url, slug from websites where slug=? limit 1',[slug]);
            if(rows.length > 0) {
                rows = rows[0];
                return {
                    url: rows.url,
                    path: utils.baseUrl()+slug,
                    slug: rows.slug
                }
            }

            // else, invalid slug
            throw new Error('invalid slug');

        } catch(err) {
            return { error: err.message };
        }
    }

    async delete(slug) {
        try {

            // return error when slug is not present
            if(!slug)
                throw new Error('slug is required');
                
            // fetch url against the slug
            await DB.query('delete from websites where slug=?',[slug]);
            return 'item deleted'

        } catch(err) {
            return { error: err.message };
        }
    }
}

const instance = new Url();
Object.freeze(instance);

module.exports = instance;