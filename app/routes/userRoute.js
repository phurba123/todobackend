const appConfig = require('../../appConfig');
const userController = require('../controller/userController')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/user';
    //signup
    app.post(`${baseUrl}/signup`, userController.signUpUser);

    //login
    app.post(`${baseUrl}/signin`, userController.signInUser);

    //forgot password
    app.post(`${baseUrl}/forgotpassword`,userController.forgotPassword)

}

module.exports = {
    setRouter: setRouter
}