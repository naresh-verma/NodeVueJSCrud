const express = require("express");
const cors = require("cors");

module.exports = {
    expressConfiguration: async (app) => {

        const options = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'contenttype',
                'Accept',
                'X-Access-Token',
                'Authorization',
                'authorization'
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: "*",
        }

        // setting cors
        app.use(cors(options))

        //set body parser
        app.use(express.json({ limit: '50mb' }));
        app.use(express.urlencoded({ limit: '50mb' }));

    }
}  