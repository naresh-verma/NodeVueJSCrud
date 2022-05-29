
const Sequelize = require("sequelize");
const sequelizeTransforms = require('sequelize-transforms');
require('dotenv').config()

// Creating sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    });


// Connecting to database
const connectDatabase = async () => {
    try {

        await sequelize.authenticate()
        sequelizeTransforms(sequelize)
        console.log("Database connection is successful")

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}

module.exports = {
    sequelize,
    connectDatabase
}