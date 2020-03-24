const authMiddleware = require('../middleware/authMiddleware');
const itemController = require('../controller/itemController');
const appconfig = require('../../appConfig')

let setRouter = (app) => {

    const baseUrl = `${appconfig.apiVersion}/list/item`;
    //route for adding item to a list
    //params-->listId
    //body-->itemTitle
    app.put(`${baseUrl}/:listId/addItem`, authMiddleware.isAuthorized, itemController.addItemToList);

    //edit item title by its id
    //param--itemId
    //body-->itemTitle
    app.put(`${baseUrl}/:itemId/editItemTitle`,authMiddleware.isAuthorized,itemController.editItemTitle);

    //delete item by itemId
    //param--itemId
    //body--listId
    app.post(`${baseUrl}/:itemId/deleteItem`,authMiddleware.isAuthorized,itemController.deleteItemById);

    //params--itemId
    //body--isDone(boolean)
    app.put(`${baseUrl}/:itemId/markitem`,authMiddleware.isAuthorized,itemController.markItemAsDoneAndUndone)
}

module.exports={
    setRouter
}
