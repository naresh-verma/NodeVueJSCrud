const resHandler = require("../utils/response_handler");
const userRoute = require("../user/user_route")
const baseUrl = require("../utils/constants").BASE_URL

//**************************************************************************************************** */

module.exports = function (app) {

    app.use(function (req, res, next) {
        if (req.method == 'OPTIONS') {
            return res.end('')
        }
        next();
    })

    app.use(`${baseUrl}`, userRoute);
    app.use(resHandler.handleError);
};