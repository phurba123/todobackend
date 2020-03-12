const appconfig = require('../../appConfig');
const listController = require('../controller/listController')

let setRouter = (app)=>
{
    const baseUrl = `${appconfig.apiVersion}/list`;

    //route to create list
    app.post(`${baseUrl}/create`,listController.createList);
}

module.exports={
    setRouter
}