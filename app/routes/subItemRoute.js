const authMiddleware = require('../middleware/authMiddleware');
const subItemController = require('../controller/subItemController')
const appconfig = require('../../appConfig')

let setRouter = (app) => {

    const baseUrl = `${appconfig.apiVersion}/list/item/subItem`;
    //route for adding subItem to item
    //params-->itemId
    //body-->subItemTitle
    app.put(`${baseUrl}/:itemId/addItem`, authMiddleware.isAuthorized, subItemController.addSubItem);

    //edit item title by its id
    //param--itemId
    //body-->itemTitle
    app.put(`${baseUrl}/:itemId/edit/subItemTitle`, authMiddleware.isAuthorized, subItemController.editSubItemTitle);

    //delete item by itemId
    //param--itemId
    //body--listId
    app.post(`${baseUrl}/:itemId/delete/subItem`, authMiddleware.isAuthorized, subItemController.deleteSubItemById)
}

module.exports = {
    setRouter
}