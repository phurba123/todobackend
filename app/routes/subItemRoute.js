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

    //delete subitem
    //param--subitemId
    //body--auth,itemId
    app.post(`${baseUrl}/:subItemId/delete`, authMiddleware.isAuthorized, subItemController.deleteSubItemById);

    //params--itemId
    app.get(`${baseUrl}/:itemId/view`,authMiddleware.isAuthorized,subItemController.getSubItemsofItem)
}

module.exports = {
    setRouter
}