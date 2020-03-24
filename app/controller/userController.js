const validateInput = require('../libs/paramsValidation');
const checkLib = require('../libs/checkLib');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib')
const mongoose = require('mongoose');
const shortid = require('shortid');
const passwordLib = require('../libs/passwordLib');
const timeLib = require('../libs/timeLib');
const tokenLib = require('../libs/tokenLib');
const emailLib = require('../libs/emailLib')


let UserModel = mongoose.model('userModel');
let authModel = mongoose.model('authModel')

//Signing up user
let signUpUser = (req, res) => {
    console.log('inside signup')
    let apiResponse;
    //validating email
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    apiResponse = response.generate(true, 'email does not met the requirement', 400, null);
                    logger.error('not valid email', 'userController:validateUserInput', 10)
                    reject(apiResponse)
                }
                else if (checkLib.isEmpty(req.body.password)) {
                    apiResponse = response.generate(true, 'password is empty', 400, null)
                    logger.error('password is empty', 'userController:validateUserInput', 10)
                    reject(apiResponse)
                }
                else {
                    logger.info('user validated', 'userController:validateUserInput', 10);
                    resolve(req);
                }
            }
            else {
                logger.error('email field missing during user creation', 'userController:signUpFunction', 10);
                apiResponse = response.generate(true, 'email is missing', 400, null);
                reject(apiResponse);
            }
        });
    }//end of validate user input

    //creating user after input validation
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(retrievedUserDetails)) {
                        //console.log(req.body)
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            countryName: req.body.countryName,
                            mobileNumber: req.body.mobileNumber,
                            email: req.body.email.toLowerCase(),
                            password: passwordLib.hashPassword(req.body.password),
                            createdOn: timeLib.now()
                        })
                        newUser.save((err, newUserDetail) => {
                            if (err) {
                                //console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                //converting mongoose object to plain javascript object
                                let newUserObj = newUserDetail.toObject();

                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            console.log('inside resolve')
            delete resolve.password;
            delete resolve.__v;
            delete resolve._id;
            apiResponse = response.generate(false, 'user created', 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            console.log('inside catch')
            res.send(error)
        })
}
//signup function completed

//logging in user
let signInUser = (req, res) => {

    //using promise for finding user
    let findUser = () => {
        //function for finding a user
        console.log('find user');
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController:loginUser:findUser', 10);
                        apiResponse = response.generate(true, 'failed to find user detail', 500, null);
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(userDetails)) {
                        //userdetails is empty so it means that the user with given email is not 
                        //registered yet
                        logger.info('no user found with given email', 'userController:findUser', 7);
                        apiResponse = response.generate(true, 'no user details found', 404, null);
                        reject(apiResponse)
                    }
                    else {
                        logger.info('user found', 'userController:findUser', 10);
                        resolve(userDetails);
                    }
                })
            }
            else {
                //if email is not present then execute this else
                logger.error('email is missing', 'userController:findUser', 10);
                apiResponse = response.generate(true, 'email is missing', 400, null);
                reject(apiResponse)
            }
        });//end of promise
    }//end of findUser

    let validatePassword = (retrievedUserDetails) => {
        //validating password provided
        console.log('validate password');
        return new Promise((resolve, reject) => {
            if (!req.body.password) {
                apiResponse = response.generate(true, 'password is missing', 400, 10)
                reject(apiResponse)
            }
            else {
                passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                    if (err) {
                        logger.error(err.message, 'userController:validatePassword', 10);
                        apiResponse = response.generate(true, 'login failed', 500, null);
                        reject(apiResponse);
                    }
                    else if (isMatch) {
                        //converting mongoose object to normal javascript object 
                        let retrievedUserDetailsObj = retrievedUserDetails.toObject();
                        delete retrievedUserDetailsObj.password;
                        delete retrievedUserDetailsObj._id;
                        delete retrievedUserDetailsObj.__v;
                        delete retrievedUserDetailsObj.createdOn;
                        resolve(retrievedUserDetailsObj);
                    }
                    else {
                        logger.info('login failed due to invalid password', 5);
                        apiResponse = response.generate(true, 'wrong password login failed', 400, null);
                        reject(apiResponse);
                    }
                })
            }
        })
    }//end of validating password

    let generateToken = (userDetails) => {
        //generating token on validation
        console.log('generate token');
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetails, (error, tokenDetails) => {
                if (error) {
                    console.log(error);
                    apiResponse = response.generate(true, 'failed to generate token', 500, null);
                    reject(apiResponse);
                }
                else {
                    tokenDetails.userDetails = userDetails;
                    resolve(tokenDetails);
                }
            })
        })
    }//end of generating token

    //saving generated token
    let saveToken = (tokenDetails) => {
        console.log('save token');

        return new Promise((resolve, reject) => {
            authModel.findOne({ 'userId': tokenDetails.userDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.error(err.message, 'userController:saveToken', 10);
                    apiResponse = response.generate(true, err.message, 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(retrievedTokenDetails)) {
                    //save new auth
                    let newauthModel = new authModel(
                        {
                            userId: tokenDetails.userDetails.userId,
                            authToken: tokenDetails.token,
                            tokenSecret: tokenDetails.tokenSecret,
                            tokenGenerationTime: timeLib.now()
                        }
                    );

                    newauthModel.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error('error while saving new auth model', 'userController:savetoken', 10);
                            apiResponse = response.generate(true, err.message, 500, null);
                            reject(apiResponse)
                        }
                        else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(responseBody)
                        }
                    })
                }
                else {
                    //already present,so,update it
                    retrievedTokenDetails.authToken = tokenDetails.token;
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret;
                    retrievedTokenDetails.tokenGenerationTime = timeLib.now();

                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error('error while updating token', 'userController:savetoken', 10);
                            apiResponse = response.generate(true, 'error while updating auth token', 500, null);
                            reject(apiResponse)
                        }
                        else {
                            //console.log('new token details after log in'+newTokenDetails.authToken)
                            console.log('newtokendetails : ' + newTokenDetails)
                            let response = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(response)
                        }
                    })
                }
            })
        });//end of promise for saving token
    }//end of savetoken function

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            apiResponse = response.generate(false, 'login successfull', 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })

}//end of login

//function to resolve forgot password
let forgotPassword = (req, res) => {

    //validating email
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.email) {
                if (!validateInput.Email(req.params.email)) {
                    apiResponse = response.generate(true, 'email does not met the requirement', 400, null);
                    logger.error('not valid email', 'userController:recoverForgotPassword:validateUserInput', 10)
                    reject(apiResponse)
                }
                else {
                    logger.info('user validated', 'userController:validateUserInput', 10);
                    resolve(req);
                }
            }
            else {
                logger.error('email field missing', 'userController:recoverForgotPassword', 10);
                apiResponse = response.generate(true, 'Email is missing', 400, null);
                reject(apiResponse);
            }
        });
    }//end of validate user input

    let findUser = () => {
        return new Promise((resolve, reject) => {

            UserModel.findOne({ 'email': req.params.email })
                .select('-__v -_id')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error('failed to find user detail', 'User Controller: getSingleUser', 10)
                        apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(result)) {
                        logger.info('No User Found with given email', 'User Controller:recoverPassword')
                        apiResponse = response.generate(true, 'No User Found with given email', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(result)

                    }
                })
        })
    }

    let generateAndSaveNewPassword = (userDetail) => {

        //generating new password
        let newPassword = passwordLib.generateNewPassword();
        console.log('new password', newPassword);

        //updating userDetail with new hashed password
        userDetail.password = passwordLib.hashPassword(newPassword)

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'email': req.params.email }, userDetail).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error('failed to reset password', 'User Controller:generateAndSavePassword', 10)
                    apiResponse = response.generate(true, 'Failed To reset Password', 500, null)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    logger.info('No email Found', 'User Controller: generateAndSaveNewPassword')
                    apiResponse = response.generate(true, 'No User with email Found', 404, null)
                    reject(apiResponse)
                } else {
                    //Creating object for sending email 
                    let sendEmailObj = {
                        email: req.params.email,
                        subject: 'Reset Password for ToDoList ',
                        html: `<h5> Hi ${userDetail.firstName}</h5>
                                <pre>
-----It seems you have forgot your password of ToDoList------
No worries , You have been provided a new password in replace to your
old password.
    
Your new password is -->${newPassword}<--
    
***** Keep visiting ToDoList****                                
</pre>`
                    }

                    setTimeout(() => {
                        emailLib.sendEmailToUser(sendEmailObj);
                    }, 1500);
                    apiResponse = response.generate(false, 'reset password successfull', 200, result)
                    resolve(apiResponse)
                }
            });
        })
    }//end of generating and saving new password

    validateUserInput(req, res)
        .then(findUser)
        .then(generateAndSaveNewPassword)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((error) => {
            res.send(error)
        })
    //logic of function
}//end of forgot password function

//function to get all users
let getAllUsers = (req, res) => {
    UserModel.find()
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error('failed to find all user', 'User Controller: getAllUser', 10)
                apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (checkLib.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}

//getting userdetail by userId
let getUserDetailById = (req, res) => {
    //validate input for userId
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.userId) {
                resolve(req)
            }
            else {
                apiResponse = response.generate(true, 'no userId provided', 400, null)
                reject(apiResponse)
            }
        })
    }//end of validate input

    //getting user detail
    let getDetail = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ 'userId': req.params.userId })
                .select('-_id -__v')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        apiResponse = response.generate(true, 'error while getting user detail', 400, null)
                        logger.error('Error while getting user details', 'usercontroller:getDetail', 10);
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.error('no user present for given userId', 'usercontroller:getDetail', 5);
                        apiResponse = response.generate(true, 'No user details found', 404, null)
                        reject(apiResponse);
                    }
                    else {
                        //user if found
                        logger.info('user details found', 'usercontroller:getDetail', 5);
                        apiResponse = response.generate(false, 'user details found', 200, result);
                        resolve(apiResponse)
                    }
                })
        })
    }//end of getDetail promise

    validateUserInput(req, res)
        .then(getDetail)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })
}

//controller for send friend request
let sendFriendRequest = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.receiverId) {
                resolve(req)
            } else {
                logger.error('Field Missing During Sending request', 'userController: sendFriendRequest', 5)
                apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateReciever = () => {
        let subOption = {
            friendId: req.body.senderId,
            friendName: req.body.senderName
        }

        let option = {
            $push: {
                friendRequestReceived: {
                    $each: [subOption]
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.receiverId }, option).exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'userController:updateReciever', 10)
                    apiResponse = response.generate(true, 'Failed To Update Reciever', 500, null)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    logger.info('Reciever not Found', 'userController: updateReciever')
                    apiResponse = response.generate(true, 'Reciever not Found', 404, null)
                    reject(apiResponse)
                } else {
                    apiResponse = response.generate(false, 'updated receiver', 200, result)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateReciever

    //update user friendRequestSent
    let updateSender = () => {

        let subOption = {
            friendId: req.body.receiverId,
            friendName: req.body.receiverName
        }

        let option = {
            $push: {
                friendRequestSent: { $each: [subOption] }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, option).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'user Controller:updateSender', 10)
                    apiResponse = response.generate(true, 'Failed To Update Sender', 500, null)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    logger.info('Sender not Found', 'user Controller: updateSender')
                    apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    apiResponse = response.generate(false, 'Updated Sender with sent requests', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSender

    validateUserInput(req, res)
        .then(updateReciever)
        .then(updateSender)
        .then((resolve) => {
            apiResponse = response.generate(false, 'friend request sent', 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)
        })
}//end of friend request

//accepting friend request
let acceptFriendRequest = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.receiverId && req.body.senderName && req.body.receiverName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Accepting request', 'usercontroller: acceptFriendRequest', 5)
                apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    //updating sender friend list on accepting friend request
    let updateSenderFriendList = () => {

        let subOption = {
            friendId: req.body.receiverId,
            friendName: req.body.receiverName,
        }

        let option = {
            $push: {
                friends: {
                    $each: [subOption]
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, option).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'user Controller:updateSenderFriendList', 10)
                    apiResponse = response.generate(true, 'Failed To Update Sender Friend List', 500, null)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    logger.info('Sender not Found', 'user Controller: updateSenderFriendList')
                    apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    apiResponse = response.generate(false, 'Updated Sender Friend List', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderFriendList

    //updating receiver friend list on accepting friend request
    let updateRecieverFriendList = () => {

        let subOption = {
            friendId: req.body.senderId,
            friendName: req.body.senderName,
        }

        let option = {
            $push: {
                friends: {
                    $each: [subOption]
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.receiverId }, option).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'user Controller:updateRecieverFriendList', 10)
                    apiResponse = response.generate(true, 'Failed To Update Reciver Friend List', 500, null)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    logger.info('Reciver not Found', 'Friend Controller: updateRecieverFriendList')
                    apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    apiResponse = response.generate(false, 'Updated Reciver Friend List', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverFriendList

    let updateSenderSentRequest = () => {

        let options = {
            $pull: {
                friendRequestSent: {
                    friendId: req.body.receiverId
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'user Controller:updateSenderSentRequest', 10)
                    apiResponse = response.generate(true, 'Failed To Update Sender Sent Request', 500, null)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    logger.info('Sender not Found', 'user Controller: updateSenderSentRequest')
                    apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    apiResponse = response.generate(false, 'Updated Sender Sent Request', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderSentRequest

    let updateReceiverRequestRecieved = () => {

        let options = {
            $pull: {
                friendRequestReceived: {
                    friendId: req.body.senderId
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.receiverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'user Controller:updateRecieverRequestRecieved', 10)
                    apiResponse = response.generate(true, 'Failed To Update Reciever Requests Recieved', 500, null)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    logger.info('Reciver not Found', 'user Controller: updateRecieverRequestRecieved')
                    apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    apiResponse = response.generate(false, 'Updated Recievers Requests Recieved', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverRequestRecieved

    validateUserInput(req, res)
        .then(updateSenderFriendList)
        .then(updateRecieverFriendList)
        .then(updateSenderSentRequest)
        .then(updateReceiverRequestRecieved)
        .then((resolve) => {
            apiResponse = response.generate(false, 'Friend request Accepted', 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)
        })
}//end of accepting friend request

let getAllRequestReceived = (req, res) => {

    UserModel.find({ userId: req.params.userId })
        .select('friendRequestReceived')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'user Controller: getAllRequestReceived', 10)
                apiResponse = response.generate(true, 'Failed To Find Received Requests', 500, null)
                res.send(apiResponse)
            } else if (checkLib.isEmpty(result)) {
                logger.info('no user found for given userId', 'user Controller: getAllRequestRecieved')
                apiResponse = response.generate(true, 'userId invalid or not found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('result : ', result[0])
                apiResponse = response.generate(false, 'All Recieved Requsts Found', 200, result[0])
                res.send(apiResponse)
            }
        })
}

let signout = (req, res) => {
    authModel.findOneAndRemove({ userId: req.user.userId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })
}

module.exports = {
    signUpUser,
    signInUser,
    forgotPassword,
    getAllUsers,
    getUserDetailById,
    sendFriendRequest,
    acceptFriendRequest,
    getAllRequestReceived,
    signout
}