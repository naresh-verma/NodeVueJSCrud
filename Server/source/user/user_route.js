const userRoute = require("express").Router()

const user_service = require('./user_service')
const resHandler = require("../utils/response_handler")
const middleware = require("../utils/authentication")
const constants = require("../utils/constants")
const { request } = require("express")
const jwtServices = require("../utils/jwt_services")
const user_dao = require("../user/user_dao")
//**************************************************************************************************** */

userRoute.route("/admin/register").post(
    async (req, res) => {
        try {
            req.body.role = constants.USER_TYPE.ADMIN
            let result = await user_service.registerNewUser(req.body)
            resHandler.sendSuccess(res, result, result.message)

        } catch (err) {
            resHandler.sendError(res, err);
        }
    })

userRoute.route("/admin/login").post(
    async (req, res) => {
        try {
            
            let result = await user_service.adminLogin(req.body)
            resHandler.sendSuccess(res, result, result.message)

        } catch (err) {
            resHandler.sendError(res, err);
        }
    })

    
userRoute.route("/admin/validate").post(
    async (req, res) => {
        try {
            const authToken = req.headers.authorization
            
            let result = true
            let decodedTokenResp = await jwtServices.verifyJwtToken(authToken)

            let adminDetails = await user_dao.getUserDetails({
                id: decodedTokenResp.user_id,
                email: decodedTokenResp.email,
                role: constants.USER_TYPE.ADMIN
            })

            if (!adminDetails) {
                result = false
            }
            
            sendResponse(res, result);

        } catch (err) {
            resHandler.sendError(res, err);
        }
    })

userRoute.route("/admin/employee").post(middleware.authenticateUser,
    async (req, res) => {
        try {
            req.body.role = constants.USER_TYPE.EMPLOYEE
            let result = await user_service.registerNewUser(req.body)
            resHandler.sendSuccess(res, result, result.message)

        } catch (err) {
            resHandler.sendError(res, err);
        }
    })
userRoute.route("/admin/employee").get(middleware.authenticateUser,
    async (req, res) => {
        try {
            let result = await user_service.fetchEmployees(req.query)
            resHandler.sendSuccess(res, result, result.message)

        } catch (err) {
            resHandler.sendError(res, err);
        }
    })

userRoute.route("/admin/employee").put(middleware.authenticateUser,
    async (req, res) => {
        try {
            let result = await user_service.updateEmployeeDetails(req.body)
            resHandler.sendSuccess(res, result, result.message)

        } catch (err) {
            resHandler.sendError(res, err);
        }
    })

userRoute.route("/admin/employee").delete(middleware.authenticateUser,
    async (req, res) => {
        try {
            let result = await user_service.deleteEmployee(req.query)
            resHandler.sendSuccess(res, result, result.message)

        } catch (err) {
            resHandler.sendError(res, err);
        }
    })

userRoute.route("/admin/employee/get").get(middleware.authenticateUser,
    async (req, res) => {
        try {
            let result = await user_service.fetchEmployeesDetails(req.query)
            resHandler.sendSuccess(res, result, result.message)

        } catch (err) {
            resHandler.sendError(res, err);
        }
    })
    
    

//**************************************************************************************************** */

module.exports = userRoute