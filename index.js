const express = require('express')
const app = express();
const fs = require('fs');
const appconfig = require('./appConfig');
const http = require('http')

const routesPath = './app/routes';

// bootstrap routes
fs.readdirSync(routesPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
})
//end of bootstrap routes

let server = http.createServer(app);
server.listen(appconfig.port)
server.on('listening', onListening);
server.on('error', onError);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        //logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error;
    }


    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            //logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            //logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        default:
            //logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
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

    console.log('listening to server on 3000')
}


