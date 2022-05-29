const RESPONSE_STATUS = require('./constants').RESPONSE_STATUS
const constants = require('./constants');
const exceptions = require('./custom_exceptions')

//**************************************************************************************************** */

// Send the  final reposne of API
function sendResponse(res, response) {

    if (response && (response.status_code))
        return res.send(response.status_code, response);

}

// This method redirect towards sendError method for error handling.
function handleError(err, req, res, next) {

    console.log("Errrrrr")
    sendError(res, err);
}

// Handles the error response
function sendError(res, err) {
    if (!err.errorCode) {
        console.log("error", err)
        err = exceptions.internlServerError(err);

    }

    console.log("Error",err)
    const response = createResponse(RESPONSE_STATUS.failure, err);
    sendResponse(res, response);
}


// Handles the success response
function sendSuccess(res, result = {}, msg = '') {
    const response = createResponse(RESPONSE_STATUS.success, result, msg)
    sendResponse(res, response);
}


// Creates standard response format
function createResponse(status, result, msg = '') {
    let responseObj;
    if (result.message)
        delete result.message

    if (status == RESPONSE_STATUS.success) {
        responseObj = {
            success: RESPONSE_STATUS.success,
            status_code: constants.STATUS_CODE.success,
            message: msg,
            data: result ? result : {},
            time: Date.now()
        }
    } else {
        responseObj = {
            success: RESPONSE_STATUS.failure,
            status_code: result.errorCode,
            message: result.errorMsg,
            err: result.error_details ? result.error_details : {},
            time: Date.now()
        }
    }
    return responseObj;
}

//**************************************************************************************************** */

module.exports = {
    sendResponse,
    handleError,
    sendError,
    sendSuccess
}