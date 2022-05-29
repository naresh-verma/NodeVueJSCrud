const Sequelize = require("sequelize");
const SeqOperator = Sequelize.Op;
const User = require("../model/user")

//**************************************************************************************************** */

// This function is used to fetch user details
const getUserDetails = async (criteria, attributes = ["*"]) => {
    try {

        return await User.findOne({
            attributes: attributes,
            where: criteria, raw: true
        })

    } catch (e) {
        console.log(e);

        throw e;
    }
}

// This function is used to create user
const createUser = async (params) => {
    try {

        return (await User.create(params)).get({ plain: true });

    } catch (e) {
        console.log(e);

        throw e;
    }
}

//This function update user details
const updateUserDetails = async (updateObj, criteria) => {
    try {

        delete updateObj.employee_id
        return await User.update(updateObj, { where: criteria, returning: true });
    } catch (e) {
        console.log(e);

        throw e;
    }
}

// This function is used to fetch users
const getUsers = async (criteria, attributes = ["*"]) => {
    try {

        if (criteria && criteria.searchValue) {
            criteria['first_name'] = { [SeqOperator.like]: `%${criteria.searchValue}%` }
            delete criteria.searchValue
        }

        return await User.findAll({
            attributes: attributes,
            where: criteria, raw: true,
            order: [['first_name', 'ASC']]
        })

    } catch (e) {
        console.log(e);

        throw e;
    }
}

const deleteEmployee = async (criteria) => {
    try {
        return await User.destroy({ where: criteria })
    } catch (error) {
        throw error
    }
}
//**************************************************************************************************** */

module.exports = {
    getUserDetails,
    createUser,
    updateUserDetails,
    getUsers,
    deleteEmployee
}