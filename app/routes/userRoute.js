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

}

module.exports = {
    setRouter: setRouter
}