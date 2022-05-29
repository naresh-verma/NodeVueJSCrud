require("dotenv").config()

const message = require("./message")
const jwt = require('jsonwebtoken')
const exceptions = require("./custom_exceptions")
//**************************************************************************************************** */

// Jwt token generation
const generateToken = async (params,expirytime='1h') => {
    try {
        let options = {
            algorithm: 'HS384',
            expiresIn: expirytime
        }

        return await jwt.sign(params, process.env.JWT_SECRET_KEY, options);
    } catch (error) {
        console.log("Error Ocured in token creation", error);
        throw error;
    }
};

// Jwt token verification and decoding
const verifyJwtToken = async (token) => {
    try {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        return await jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithms: ['HS384'] });
    } catch (err) {
        console.log("Error Ocured in token verification", err);

        throw exceptions.unAuthorizedAccessError(message.invalidAuthToken);
    }
};

//**************************************************************************************************** */
module.exports = {
    generateToken,
    verifyJwtToken
}