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
    //body-->itemTitle,listId
    app.put(`${baseUrl}/:itemId/editItemTitle`,authMiddleware.isAuthorized,itemController.editItemTitle)
}

module.exports={
    setRouter
}
