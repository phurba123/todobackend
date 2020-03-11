const appConfig = require('../../appConfig');
const userController = require('../controller/userController')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/user';

    app.post(`${baseUrl}/signup`, userController.signUpUser)
    app.get(`${baseUrl}/hello`,(req,res)=>res.send('hello world'))
}

module.exports = {
    setRouter: setRouter
}