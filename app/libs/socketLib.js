
const socketio = require('socket.io')
const tokenLib = require("./tokenLib.js");
const logger = require('./loggerLib');
const emailLib = require('./emailLib')

const events = require('events');
const eventEmitter = new events.EventEmitter();


let setServer = (server) => {

    let io = socketio.listen(server);
    let myIo = io.of('/')//this is sort of socket routing(namespace)

    myIo.on('connection', (socket) => {

        console.log("on connection emitting verify user");

        //provide authToken,userId
        socket.on("verifyUser", (data) => {
            console.log('verify user called');
            tokenLib.verifyClaimWithoutSecret(data.authToken, (err, data) => {
                if (err) {
                    socket.emit(`auth-error-${data.userId}`, 'invalid authToken');
                }
            })
        });

        //listen for updates
        socket.on('notify-updates', (data) => {
            //console.log('friendEmail : ', data.friendEmail);
            // event to send email
            setTimeout(function () {

                eventEmitter.emit('send-email', data);

            }, 2000)
            socket.broadcast.emit(data.friendId, data.message);//
        })

    });
}

//emailing function of event emitter
eventEmitter.on('send-email', (data) => {
    console.log('inside send email data : ', data);

    //Creating object for sending email 
    let sendEmailObj = {
        email: data.friendEmail,
        subject: 'updates from ToDoList ',
        html: `<h5> Hi ${data.friendName}</h5>
                <p>${data.message}</p>               
        `
    }

    setTimeout(() => {
        emailLib.sendEmailToUser(sendEmailObj);
    }, 100);
})

module.exports = {
    setServer: setServer
}
