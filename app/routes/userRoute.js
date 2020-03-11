const appConfig = require('../../appConfig');
const userController = require('../controller/userController')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/user';

    app.post(`${baseUrl}/signup`, userController.signUpUser);

    app.post(`${baseUrl}/signin`, userController.signInUser)

}

module.exports = {
    setRouter: setRouter
}