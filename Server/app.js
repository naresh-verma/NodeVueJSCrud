const databaseConfig = require("./config/dbConfig");
const expressConfig = require("./config/expressConfig");
const express = require("express");
require('dotenv').config()

const app = express();

/********************************************************************************************************/

class StartServer {

    constructor() {
        this.expressConfig()
        this.dbConnection()
        this.mountRoutes()
        this.startServer()
    }

    async expressConfig() {
        try {
            await expressConfig.expressConfiguration(app)
        } catch (error) {
            throw error
        }
    }

    async dbConnection() {
        try {
            await databaseConfig.connectDatabase()
        } catch (error) {
            throw error
        }
    }

    async mountRoutes() {
        try {
            require("./source/route")(app)
        } catch (error) {
            throw error
        }
    }

    async startServer() {
        try {

            app.listen(process.env.PORT || 8081, () => {
                console.log('Server is listening on port number : ', process.env.PORT);
            }).on('error', (e) => {
                console.log('Error occured: ', e.message)
            });

            app.get('/', (req, res) => {
                res.send("<center><b> Hii!! Welcome to the Crud App :) </b></center>");
            })

        } catch (error) {
            throw error
        }
    }
}

new StartServer()