const appconfig = require('../../appConfig');
const listController = require('../controller/listController');
const authMiddleware = require('../middleware/authMiddleware');

let setRouter = (app)=>
{
    const baseUrl = `${appconfig.apiVersion}/list`;

    //route to create list
    app.post(`${baseUrl}/create`,authMiddleware.isAuthorized, listController.createList);

    //edit route for list
    //body param--listTitle
    app.put(`${baseUrl}/:listId/editTitle`,authMiddleware.isAuthorized,listController.editListTitle);

    //route for getting all the list of a user
    //only params is auth
    app.get(`${baseUrl}/view/all`,authMiddleware.isAuthorized,listController.getAllListOfUser);

    //route for deleting list
    app.post(`${baseUrl}/:listId/delete`,authMiddleware.isAuthorized, listController.deleteList);

    //route to get single list by listId
    app.get(`${baseUrl}/:listId/view`,authMiddleware.isAuthorized,listController.getListById);

}

module.exports={
    setRouter
}