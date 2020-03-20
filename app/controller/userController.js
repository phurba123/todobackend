const validateInput = require('../libs/paramsValidation');
const checkLib = require('../libs/checkLib');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib')
const mongoose = require('mongoose');
const shortid = require('shortid');
const passwordLib = require('../libs/passwordLib');
const timeLib = require('../libs/timeLib');
const tokenLib = require('../libs/tokenLib')


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
            friendId: req.body.senderId
        }

        let option = {
            $push: {
                friendRequestRecieved: {
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
                    apiResponse = response.generate(false, 'friend request sent', 200, result)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateReciever

    validateUserInput(req, res)
        .then(updateReciever)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })
}//end of friend request

module.exports = {
    signUpUser,
    signInUser,
    forgotPassword,
    getAllUsers,
    sendFriendRequest
}