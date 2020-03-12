const appconfig = require('../../appConfig');
const listController = require('../controller/listController');
const authMiddleware = require('../middleware/authMiddleware')

let setRouter = (app)=>
{
    const baseUrl = `${appconfig.apiVersion}/list`;

    //route to create list
    app.post(`${baseUrl}/create`,authMiddleware.isAuthorized, listController.createList);

    //edit route for list
    //body param--listTitle
    app.put(`${baseUrl}/:listId/edit`,authMiddleware.isAuthorized,listController.editList);

    //route for getting all the list of a user
    //only params is auth
    app.get(`${baseUrl}/view/all`,authMiddleware.isAuthorized,listController.getAllListOfUser)
}

module.exports={
    setRouter
}