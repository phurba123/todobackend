const validateInput = require('../libs/paramsValidation');
const checkLib = require('../libs/checkLib');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib')
const mongoose = require('mongoose');
const shortid = require('shortid');
const passwordLib = require('../libs/passwordLib');
const timeLib = require('../libs/timeLib')


let UserModel = mongoose.model('userModel')

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
                apiResponse = response.generate(true, 'one or more parameter is missing', 400, null);
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
            apiResponse = response.generate(true, error.message, 500, null);
            res.send(apiResponse)
        })
}
//signup function completed

module.exports={
    signUpUser:signUpUser
}