const express = require('express');
const router = express.Router();
const url = require('./Url');

let statusCode = 200;
let error = {
    badGateway: 502
};

router.post('/', async (req, res) => {

    // initiate the response
    let response = await url.create(req.body.url, req.body.slug);

    // when error is present
    if(response.error) 
        statusCode = error.badGateway;
        
    // prepare the response
    response = {
        data: response,
        code: statusCode
    };

    // return the response
    res.status(statusCode).json(response);

});

router.get('/:slug', async (req, res) => {

    // initiate the response
    let response = await url.fetch(req.params.slug);
    
    // when error is present
    if(response.error) 
        statusCode = error.badGateway;
        
    // prepare the response
    response = {
        data: response,
        code: statusCode
    };

    // return the response
    res.status(statusCode).json(response);

});

router.delete('/:slug', async (req, res) => {

    // initiate the response
    let response = await url.delete(req.params.slug);
    
    // when error is present
    if(response.error) 
        statusCode = error.badGateway;
        
    // prepare the response
    response = {
        data: response,
        code: statusCode
    };

    // return the response
    res.status(statusCode).json(response);

});

module.exports = router;