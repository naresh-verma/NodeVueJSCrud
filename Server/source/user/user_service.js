const userDao = require("./user_dao")
const bcrypt = require('bcrypt')
const constants = require("../utils/constants")
const message = require("../utils/message")
const custom_exceptions = require("../utils/custom_exceptions")
const jwt_services = require("../utils/jwt_services")
//**************************************************************************************************** */

const registerNewUser = async (params) => {
    try {

        let userDetailsResp = await userDao.getUserDetails({
            email: params.email,
            role: params.role
        })


        if (userDetailsResp) {
            if (params.email)
                throw custom_exceptions.alreadyExistError(message.emailAlreadyExit)
        }
        else {
            params.password = await bcrypt.hash(params.password, 10)

            const createdUserResp = await userDao.createUser(params);
            if (createdUserResp) {

                return {
                    message: message.registeredSuccessfully,
                    id: createdUserResp.id,
                    phone: createdUserResp.phone,
                    email: createdUserResp.email,
                    role: createdUserResp.role
                }
            }
            else {
                throw custom_exceptions.validationError(message.unableToPerformOperation)
            }
        }

    }
    catch (error) {
        throw error;
    }
}


const adminLogin = async (params) => {
    try {

        let adminDetails = await userDao.getUserDetails({ email: params.email, role: constants.USER_TYPE.ADMIN })

        if (!adminDetails)
            throw custom_exceptions.notFoundError(message.accountNotFound)


        let pwdCheck = await bcrypt.compare(params.password, adminDetails.password)

        if (!pwdCheck)
            throw custom_exceptions.unAuthorizedAccessError(message.pwdIncorrect)

        let adminUserObj = {
            user_id: adminDetails.id,
            email: adminDetails.email,
            role: adminDetails.role
        }

        adminUserObj.token = await jwt_services.generateToken(adminUserObj)
        return {
            message: message.loginSuccessfull,
            ...adminUserObj
        }
    } catch (error) {
        throw error
    }
}

const fetchEmployees = async (params) => {
    try {
        params.role = constants.USER_TYPE.EMPLOYEE
        let employeesList = await userDao.getUsers(params)

        return {
            message: message.employeesFetched,
            employeesList
        }
    } catch (error) {
        throw error
    }
}

const fetchEmployeesDetails = async (params) => {
    try {
        let employeeDetails = await userDao.getUserDetails({
            id: params.employee_id,
            role: constants.USER_TYPE.EMPLOYEE
        })

        if (!employeeDetails)
            throw custom_exceptions.notFoundError(message.employeeNotFound)

        return {
            message: message.employeesFetched,
            employeeDetails
        }
    } catch (error) {
        throw error
    }
}

const updateEmployeeDetails = async (params) => {
    try {

        let userDetailsResp = await userDao.getUserDetails({
            id: params.employee_id,
            role: constants.USER_TYPE.EMPLOYEE
        })

        if (!userDetailsResp)
            throw custom_exceptions.notFoundError(message.employeeNotFound)

        await userDao.updateUserDetails(params, { id: params.employee_id })

        return {
            message: message.employeeDetailsUpdated,
        }


    } catch (error) {
        throw error
    }
}

const deleteEmployee = async (params) => {
    try {

        let userDetailsResp = await userDao.getUserDetails({
            id: params.employee_id,
            role: constants.USER_TYPE.EMPLOYEE
        })

        if (!userDetailsResp)
            throw custom_exceptions.notFoundError(message.employeeNotFound)

        await userDao.deleteEmployee({ id: params.employee_id })

        return {
            message: message.deleteEmployee
        }


    } catch (error) {
        throw error
    }
}

//**************************************************************************************************** */

module.exports = {
    registerNewUser,
    adminLogin,
    fetchEmployees,
    fetchEmployeesDetails,
    updateEmployeeDetails,
    deleteEmployee
}