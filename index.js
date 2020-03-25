const express = require('express')
const app = express();
const fs = require('fs');
const appconfig = require('./appConfig');
const http = require('http');
const logger = require('./app/libs/loggerLib');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const appErrorHandler = require('./app/middleware/appErrorHandler');
const requestIpLogger = require('./app/middleware/requestIpLogger');
const socketLib = require('./app/libs/socketLib');
const helmet = require('helmet')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
app.use(appErrorHandler.globalErrorHandler);
app.use(requestIpLogger.logIp)
app.use(helmet());
//Bootstrap models
let modelsPath = ('./app/model');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) require(modelsPath + '/' + file)
});
// end Bootstrap models

// bootstrap routes
const routesPath = './app/routes';
fs.readdirSync(routesPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        console.log('route ',route)
        route.setRouter(app);
    }
})
//end of bootstrap routes

//global notfound handler after bootstrap route
app.use(appErrorHandler.globalNotFoundHandler)

//creating server
let server = http.createServer(app);
server.listen(appconfig.port)
server.on('listening', onListening);
server.on('error', onError);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error;
    }


    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
            throw error;
    }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
    console.log('inside onListening')

    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind);

    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
    mongoose.connect(appconfig.db.uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
}

//socket connection
socketLib.setServer(server);

/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
    logger.error(err, 'mongoose connection on error handler', 10)
}); // end mongoose connection error

mongoose.connection.on('open', function (err) {
    if (err) {
        logger.error(err, 'mongoose connection open handler', 10)
    } else {
        logger.info("database connection open", 'database connection open handler', 10)
    }
}); // enr mongoose connection open handler


