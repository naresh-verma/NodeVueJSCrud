const constants = require('./constants')
const message = require('./message')
//**************************************************************************************************** */

module.exports = {

  internlServerError(err) {
    return {
      errorCode: constants.STATUS_CODE.internal_server_error,
      errorMsg: message.somethingWentWrong,
      error_details: {
        message: message.intrnlServorError,
        error: err
      }
    }
  },
  conflictError(errorMsg = '', err = {}) {
    return {
      errorCode: constants.STATUS_CODE.conflict_error,
      errorMsg: message.conflictError,
      error_details: {
        message: errorMsg,
        error: err
      }
    }
  },
  notFoundError(errorMsg = '', err = {}) {
    return {
      errorCode: constants.STATUS_CODE.not_found,
      errorMsg: message.recordNotFound,
      error_details: {
        message: errorMsg,
        error: err
      }
    }
  },
  alreadyExistError(errMsg, err = {}) {
    return {
      errorCode: constants.STATUS_CODE.already_exist,
      errorMsg: message.record_already_exist,
      error_details: {
        message: errMsg,
        error: err
      }
    }
  },
  unAuthorizedAccessError(errorMsg = '', err = {}) {
    return {
      errorCode: constants.STATUS_CODE.unauthorized_access,
      errorMsg: message.unAuthorizedAccess,
      error_details: {
        message: errorMsg,
        error: err
      }
    }
  },
  validationError(errMsg, err = {}) {
    return {
      errorCode: constants.STATUS_CODE.bad_request,
      errorMsg: message.bad_request,
      error_details: {
        message: errMsg,
        error: err
      }
    }
  },

}