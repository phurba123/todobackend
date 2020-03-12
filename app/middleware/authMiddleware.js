//auth middleware
const mongoose = require('mongoose')
const logger = require('../libs/loggerLib')
const response = require('../libs/responseLib')
const check = require('../libs/checkLib')
const tokenLib = require('../libs/tokenLib')

const authModel = mongoose.model('authModel')

let isAuthorized = (req, res, next) => {
    if (req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')) {
        authModel.findOne({ 'authToken': req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken') })
            .exec((error, authDetails) => {
                if (error) {
                    logger.error('error in finding authToken', 'authorizationmiddleware', 10);
                    let apiResponse = response.generate(true, 'failed to authorize', 500, null);
                    res.send(apiResponse)
                }
                else if (check.isEmpty(authDetails)) {
                    logger.error('no auth token is present', 'authorization middleware', 5);
                    let apiResponse = response.generate(true, 'invalid or expired auth token', 404, null);
                    res.send(apiResponse)
                }
                else {
                    tokenLib.verifyClaim(authDetails.authToken, authDetails.tokenSecret, (err, decoded) => {
                        if (err) {
                            logger.error('failed to authorize', 'authorization middleware', 10);
                            let apiResponse = response.generate(true, 'failed to authorize', 500, null);
                            res.send(apiResponse);
                        }
                        else {
                            console.log('decoded ', decoded)
                            console.log('decoded data userid is : ' + decoded.data.userId)

                            req.user = { userId: decoded.data.userId }
                            next();
                        }
                    })
                }
            })
    }
    else {
        logger.error('auth token is missing', 'authorization middleware', 5);
        let apiResponse = response.generate(true, 'auth token is missing', 400, null);
        res.send(apiResponse)
    }
}

module.exports = {
    isAuthorized: isAuthorized
}