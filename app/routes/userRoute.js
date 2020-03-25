const appConfig = require('../../appConfig');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/user';
    //signup
    app.post(`${baseUrl}/signup`, userController.signUpUser);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/user/signup api for Registering User.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastname Last Name of the user. (body params) (required)
     * @apiParam {string} countryName country Name of the user. (body params) (required)
     * @apiParam {string} mobileNumber Mobile Number of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "User Created",
        "status": 200,
        "data": [
            {
                "createdOn": "2020-03-12T16:42:58.000Z",
                "email": "gomail@gmail.com",
                "mobileNumber": "91 7384756357",
                "countryName": "India",
                "firstName": "phurba",
                "lastName": "sherpa",
                "userId": "B1cyuc8OX"
            }
        }
    */

    //login
    app.post(`${baseUrl}/signin`, userController.signInUser);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/user/signin api for login.
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "login successfull",
        "status": 200,
        "data": {
                "authToken": "32kjciOiJIsdkfjkjfkej9eu93u32oir6MTUzODgxNzIzNDUzNCwiZXhwIjskdfj89ds89f",
                "userDetails": {
                    "friendRequestSent": [],
                    "friendRequestRecieved": [],
                    "friends": [],
                    "email": "gomail@gmail.com",
                    "mobileNumber": "91 7840962887",
                    "countryName": "india",
                    "lastName": "sharma",
                    "firstName": "roshan",
                    "userId": "389ejh7"
            }
        }
        }
    */

    //route for signout
    app.post(`${baseUrl}/signout`, authMiddleware.isAuthorized, userController.signout);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/:userId/logout api to logout .
     *
     * @apiParam {string} userId userId of the user. (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null
        }
    */

    //forgot password
    //params-email
    app.post(`${baseUrl}/:email/forgotpassword`, userController.forgotPassword);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/user/:email/forgotpassword api for login.
     * @apiParam {string} email email of the user. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "reset password successfull",
        "status": 200,
        "data": 
        }
        }
    */

    //get all users
    app.get(`${baseUrl}/view/all`, authMiddleware.isAuthorized, userController.getAllUsers);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /api/v1/user/view/all api for Getting all users.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All User Details Found",
            "status": 200,
            "data": [
                {
                    "createdOn": "2020-09-16T13:33:58.000Z",
                    "email": "nomail@gmail.com",
                    "mobileNumber": "91 7840962887",
                    "countryName": "India",
                    "lastName": "sharma",
                    "firstName": "govind",
                    "userId": "dfjsh8sdfyf"
                }
            ]
        }
    */

    //getting userdetails of user by userId
    app.get(`${baseUrl}/:userId/view`, authMiddleware.isAuthorized, userController.getUserDetailById)
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /api/v1/user/:userId/view api for getting user details.
     *
     * @apiParam {string} userId userId of the user. (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User Details Found",
            "status": 200,
            "data": {
                "createdOn": "2021-09-12T26:42:58.000Z",
                "email": "nomail@gmail.com",
                "mobileNumber": "91 7840962887",
                "countryName": "India",
                "lastName": "sharma",
                "firstName": "govind",
                "userId": "B1cyuc8OX"
            }
        }
    */

    //send friend request
    //body--senderId,receiverId,senderName,receiverName,
    app.put(`${baseUrl}/request/friend`, authMiddleware.isAuthorized, userController.sendFriendRequest)
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {put} /api/v1/user/request/friend api for sending friend request.
     *
     * @apiParam {string} senderId userId of the sender. (body params) (required)
     * @apiParam {string} receiverId userId of the receiver. (body params) (required)
     * @apiParam {string} senderName name of the sender. (body params) (required)
     * @apiParam {string} receiverName name of the receiver. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "friend request sent",
            "status": 200,
            "data":
        }
    */

    //accept friend-request
    //body--senderId,receiverId(me),senderName,receiverName
    app.post(`${baseUrl}/accept/friend/request`, authMiddleware.isAuthorized, userController.acceptFriendRequest);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/user/accept/friend/request api for accepting friend request.
     *
     * @apiParam {string} senderId userId of user who sent request. (body params) (required)
     * @apiParam {string} receiverId userId of the request receiver. (body params) (required)
     * @apiParam {string} senderName name of user who sent sender. (body params) (required)
     * @apiParam {string} receiverName name of the request receiver. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "friend request accepted",
            "status": 200,
            "data":null
        }
    */

    app.get(`${baseUrl}/:userId/view/friendrequests`, authMiddleware.isAuthorized, userController.getAllRequestReceived);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /api/v1/user/:userId/view/friendrequests api for getting all friend requests.
     *
     * @apiParam {string} userId userId of the user. (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All receiver request found",
            "status": 200,
            "data":[
                {
                    friendId:"sf7fsf9",
                    friendName:"namegame"
                }
            ]
        }
    */

}

module.exports = {
    setRouter: setRouter
}