const BASE_URL = "/crud"

const RESPONSE_STATUS = {
  failure: false,
  success: true
}

const STATUS_CODE = {
  success: 200,
  bad_request: 400,
  unauthorized_access: 401,
  already_exist: 403,
  not_found: 404,
  conflict_error: 409,
  internal_server_error: 500
}




const USER_TYPE = {
  ADMIN: 1,
  EMPLOYEE: 2
}


//**************************************************************************************************** */

module.exports = {
  BASE_URL,
  RESPONSE_STATUS,
  STATUS_CODE,
  USER_TYPE
}
