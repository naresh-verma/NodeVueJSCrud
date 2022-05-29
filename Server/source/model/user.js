const Sequelize = require("sequelize");
const sequelize = require("../../config/dbConfig").sequelize;
//**************************************************************************************************** */

const user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.INTEGER,
    },
    city: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    },
    dob: {
        type: Sequelize.DATE,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

user.sync({ alter: false });

//**************************************************************************************************** */
module.exports = user;