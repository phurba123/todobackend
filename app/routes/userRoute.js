const appConfig = require('../../appConfig');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/user';
    //signup
    app.post(`${baseUrl}/signup`, userController.signUpUser);

    //login
    app.post(`${baseUrl}/signin`, userController.signInUser);

    //forgot password
    app.post(`${baseUrl}/forgotpassword`,userController.forgotPassword);

    //get all users
    app.get(`${baseUrl}/view/all`,authMiddleware.isAuthorized,userController.getAllUsers);

    //getting userdetails of user by userId
    app.get(`${baseUrl}/:userId/view`,authMiddleware.isAuthorized,userController.getUserDetailById)

    //send friend request
    //body--senderId,receiverId,senderName,receiverName,
    app.put(`${baseUrl}/request/friend`,authMiddleware.isAuthorized,userController.sendFriendRequest)

    //accept friend-request
    //body--senderId,receiverId(me),senderName,receiverName
    app.post(`${baseUrl}/accept/friend/request`, authMiddleware.isAuthorized,userController.acceptFriendRequest);

    app.get(`${baseUrl}/:userId/view/friendrequests`, authMiddleware.isAuthorized, userController.getAllRequestReceived);

}

module.exports = {
    setRouter: setRouter
}