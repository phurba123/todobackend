const logger = require('pino')()
const moment = require('moment')

// capture error function for formatting the errors
let captureError = (errorMessage, errorOrigin, errorLevel) => {
    let currentTime = moment()

    let errorResponse = {
        timestamp: currentTime,
        errorMessage: errorMessage,
        errorOrigin: errorOrigin,
        errorLevel: errorLevel
    }

    logger.error(errorResponse)
    return errorResponse
} // end captureError

//captureInfo for formatting the information that needs to be consoled
let captureInfo = (message, origin, importance) => {
    let currentTime = moment()

    let infoMessage = {
        timestamp: currentTime,
        message: message,
        origin: origin,
        level: importance
    }

    logger.info(infoMessage)
    return infoMessage
} // end infoCapture

module.exports = {
    error: captureError,
    info: captureInfo
}