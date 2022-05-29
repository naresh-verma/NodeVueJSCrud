const custom_exceptions = require('../utils/custom_exceptions')
const constants = require("../utils/constants")
const jwtServices = require("../utils/jwt_services")

const message = require("../utils/message")
const user_dao = require("../user/user_dao")
//**************************************************************************************************** */


const authenticateUser = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization
        if (!authToken)
            throw custom_exceptions.unAuthorizedAccessError(message.authTokenMissing)

        let decodedTokenResp = await jwtServices.verifyJwtToken(authToken)

        let adminDetails = await user_dao.getUserDetails({
            id: decodedTokenResp.user_id,
            email: decodedTokenResp.email,
            role: constants.USER_TYPE.ADMIN
        })

        if (!adminDetails) {
            // localStorage.removeItem('currentUser')
            throw custom_exceptions.unAuthorizedAccessError(message.invalidAuthToken)
        } else {
            next()
        }

    } catch (error) {
        next(error)
    }

}


module.exports = {
    authenticateUser
}